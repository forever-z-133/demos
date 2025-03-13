import type { GuideCloudReq, GuideCloudRsp } from './guide-cloud-request.model'

// 单条日志主体结构
export interface LogLine {
  __CONTENT__: string
  __FILENAME__: string
  __HOSTNAME__: string
  __INDEX_STATUS__: string
  __PKGID__: string
  __PKG_LOGID__: number
  __RAWLOG__: string
  __SOURCE__: string
  __TAG__: Record<string, string>
  __TIMESTAMP__: string
}

// 日志中 __CONTENT__ 字段的结构
export interface LogContent {
  codePos: string
  logType: string
  reqBody: string
  threadId: string
  time: string
}

// 日志中 __CONTENT__.reqBody 字段的结构
export interface LogRequest {
  chunkId: number
  chunkLength: number
  data: string
  reqName: string
  reqUUID: string
  structName: 'GuideCloudRep' | 'GuideCloudRsp'
  uuid: string
}

// 单条日志解析后的结构
export type LogLineParsed = Omit<LogLine, '__CONTENT__'> & {
  id: number
  __CONTENT__: Omit<LogContent, 'reqBody'> & {
    reqBody: LogRequest
  }
}

// 日志展示表格的行结构
export interface LogTableRow {
  startTime: string
  reqUUID: string
  reqName: string
  request: GuideCloudReq
  response: GuideCloudRsp
  raw: LogLineParsed[]
}
