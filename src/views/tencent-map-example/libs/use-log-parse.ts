import type { GuideCloudReq, GuideCloudRsp } from './guide-cloud-request.model'
import type { LogContent, LogLine, LogLineParsed, LogRequest, LogTableRow } from './log.model'
import { groupBy } from 'lodash-es'
import { shallowRef } from 'vue'

/**
 * 解析日志中的请求日志
 */
function useLogParse() {
  const lines = shallowRef<string[]>([]) // 请求相关原始日志行
  const table = shallowRef<LogTableRow[]>([]) // 日志展示表格

  function parse(txt: string) {
    // 初步解析日志行
    const requestStringLines = txt.split(/[\r\n]/).filter(e => !!e && isReq(e))
    const requestLines: LogLineParsed[] = []
    requestStringLines.forEach((str, index) => {
      const item = parseJson(str) as LogLine
      if (!item.__CONTENT__) return
      const content = parseContent(item.__CONTENT__)
      const reqBody = parseReqBody(content.reqBody)
      const line = { ...item, id: index, __CONTENT__: { ...content, reqBody } }
      requestLines.push(line)
    })
    lines.value = requestStringLines

    // 将日志按请求分组
    const group = groupBy(requestLines, '__CONTENT__.reqBody.reqUUID')
    const rows: LogTableRow[] = []
    Object.keys(group).forEach((reqUUID) => {
      const logs = group[reqUUID]
      const tmp = groupBy(logs, '__CONTENT__.reqBody.structName')
      const requestData = mergeData(tmp.GuideCloudReq) as GuideCloudReq
      const responseData = mergeData(tmp.GuideCloudRsp) as GuideCloudRsp
      const content = tmp.GuideCloudReq[0].__CONTENT__
      const req = content.reqBody
      const startTime = content.time
      const reqName = req.reqName
      const row = { startTime, reqName, reqUUID, request: requestData, response: responseData, raw: logs }
      rows.push(row)
    })
    table.value = rows

    return { lines: requestStringLines, table: rows }
  }

  return {
    parse,
    lines,
    table,
  }
}
export default useLogParse

// 避免 JSON.parse 报错
function parseJson(jsonStr: string) {
  try {
    return JSON.parse(jsonStr)
  } catch (err) {
    console.log(jsonStr)
    console.log(err)
    return {}
  }
}

// __CONTENT__ 字段格式： [时间] [threadId] [日志类型] [代码位置] [请求体]
function parseContent(__CONTENT__: string): LogContent {
  const tmp = __CONTENT__.slice(1).split(/\]\s+\[|\]\s+/)
  const time = tmp[0]
  const threadId = tmp[1]
  const logType = tmp[2]
  const codePos = tmp[3]
  const reqBody = tmp[4]
  return { time, threadId, logType, codePos, reqBody }
}

// 请求体格式：日志UUID#日志分片ID/日志分片总数#请求名#请求UUID#结构体名称#数据
function parseReqBody(txt: string): LogRequest {
  const tmp = txt.split('#')
  const uuid = tmp[0]
  const [_chunkId, _chunkLength] = tmp[1].split('/')
  const chunkId = Number(_chunkId)
  const chunkLength = Number(_chunkLength)
  const reqName = tmp[2]
  const reqUUID = tmp[3]
  const structName = tmp[4] as LogRequest['structName']
  const data = tmp[5]

  return { uuid, chunkId, chunkLength, reqName, reqUUID, structName, data }
}

// 判断是否为请求数据
function isReq(str: string) {
  return ['GuideCloudReq', 'GuideCloudRsp'].some(k => str.includes(k))
}

// 合并多条日志的请求体
function mergeData(logs: LogLineParsed[]) {
  const sorted = logs.length > 1 ? logs.sort((a, b) => +a.__CONTENT__.reqBody.chunkId - +b.__CONTENT__.reqBody.chunkId) : logs
  const dataStr = sorted.reduce((re, e) => re + e.__CONTENT__.reqBody.data, '')
  const data = parseJson(dataStr)
  return data
}
