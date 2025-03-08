import { groupBy } from 'lodash-es'

function useLogParse() {
  async function load(url: string) {
    const res = await fetch(url)
    const txt = await res.text()
    return txt
  }

  function parse(txt: string) {
    const lines = txt.split(/[\r\n]/).filter(e => !!e)
    const requestLines = lines.filter(e => isReq(e))
    const requests: any[] = []
    requestLines.forEach((str) => {
      const item = parseJson(str)
      if (!item.__CONTENT__) return
      item.__CONTENT__ = parseContent(item.__CONTENT__)
      item.raw = str
      requests.push(item)
    })
    const group = groupBy(requests, '__CONTENT__.reqBody.reqUUID')
    const rows: any[] = []
    Object.keys(group).forEach((reqUUID) => {
      const logs = group[reqUUID]
      const tmp = groupBy(logs, '__CONTENT__.reqBody.structName')
      const request = normalize(tmp.GuideCloudReq)
      const response = normalize(tmp.GuideCloudRsp)
      const row = { request, response, raw: logs }
      rows.push(row)
    })
    return rows
  }

  return {
    load,
    parse,
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
function parseContent(__CONTENT__: string) {
  const tmp = __CONTENT__.slice(1).split(/\]\s+\[|\]\s+/)
  const time = tmp[0]
  const threadId = tmp[1]
  const logType = tmp[2]
  const codePos = tmp[3]
  const reqBody = parseReqBody(tmp[4])
  return { time, threadId, logType, codePos, reqBody }
}

// 请求体格式：日志UUID#日志分片ID/日志分片总数#请求名#请求UUID#结构体名称#数据
function parseReqBody(txt: string) {
  const tmp = txt.split('#')
  const uuid = tmp[0]
  const [chunkId, chunkLength] = tmp[1].split('/')
  const reqName = tmp[2]
  const reqUUID = tmp[3]
  const structName = tmp[4]
  const data = tmp[5]

  return { uuid, chunkId, chunkLength, reqName, reqUUID, structName, data }
}

// 判断是否为请求数据
function isReq(str: string) {
  return ['GuideCloudReq', 'GuideCloudRsp'].some(k => str.includes(k))
}

// 规范化请求/响应的数据
function normalize(logs: any[]) {
  const data = mergeData(logs)
  const startTime = logs[0].__CONTENT__.time
  return { startTime, data }
}

// 合并多条日志的请求体
function mergeData(logs: any[]) {
  const sorted = logs.length > 1 ? logs.sort((a, b) => +a.__CONTENT__.reqBody.chunkId - +b.__CONTENT__.reqBody.chunkId) : logs
  const dataStr = sorted.reduce((re, e) => re + e.__CONTENT__.reqBody.data, '')
  const data = parseJson(dataStr)
  return data
}
