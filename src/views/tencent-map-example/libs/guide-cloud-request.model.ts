export interface GuideCloudReq {
  channel: string // 渠道号
  cutPathLen: number // 0表示全量,非0表示局部实际匹配的长度,单位米
  deviceId: string // 设备唯一id
  heterogeneousHdDataVersion: string // 异源匹配目标HD数据版本
  homologousDataVersion: string // 同源匹配目标数据版本
  matchReqType: number // 0-异源匹配, 1-同源匹配
  mmReq: {
    cutPathLen: number // 0表示全量,非0表示局部实际匹配的长度,单位公里,云端直接透传请求设置的值
    path: { // 最多支持三条路径
      coors: Point[] // 当前导航路线的所有坐标点
      length: number // 路线长度，单位米
      links: { // 绑定结果的各个link信息
        length: number // 道路长度，单位米
        linkType: number // 道路类型 0-普通道路 1-航道 2-隧道 3-桥梁 4-高架桥
        roadClass: number // Link道路等级 * 0 高速公路 * 1 国道 * 2 省道 * 3 县道 * 4 乡公路 * 5 县乡村内部道路 * 6 主要大街、城市快速道 * 7 主要道路 * 8 次要道路 * 9 普通道路 * 10 非导航道路
        roadType: number // Link道路类型 1 主路 2 路口内部道路 3 JCT道路 4 环岛 5 服务区 6 匝道 7 辅路 8 匝道与JCT 9 出口 10 入口 11 A类右转专用道 12 B类右转专用道 13 A类左转专用道 14 B类左转专用道 15 普通道路 16 左右转专用道 56 服务区与匝道 53 服务区与JCT 58 服务区与匝道以及JCT
        roadName: string // 道路名
        coor_idx: number // 当前link在路线中形点起始位置
        coor_num: number // 当前link在路线中形点数量
        is_both_direction: boolean // 当前link是否双方向, 如果双方向, lane_num无效
        lane_num: number // 当前link的车道数
        is_emergency_lane: boolean // 当前link的车道数是否包含应急车道
        has_multi_out: number // 当前link段是否有岔路 0:未知,1:是,2:否
        has_parallel_link: number // 当前link段是否有平行路 0:未知,1:是,2:否
        has_traffic_light: number // link沿行车方向终点是否有交通灯 0:未知,1:是,2:否
        is_toll: number // 是否收费道路 0:未知,1:是,2:否
        is_at_service: number // 是否在服务区 0:未知,1:是,2:否
        get_inner_road: number // 是否小区内部路 0:未知,1:是,2:否
        is_parking_road: number // 是否停车厂内部路 0:未知,1:是,2:否
        road_slop_info: number // 坡度信息 0:未知,1:上坡,2:平坡,3:下坡
        reserved_info: Record<string, string> // 预留字段
      }[]
      pathId: string // 输入的 path id
    }[]
    type: 'SD' | 'HDAir' // 0-SD/1-HDAir
  }
  mmTaskId: string // 任务请求 id
  protocolVersion: string // protocol version
  queryType: number // 0-all 1-mm异源匹配
  sdkVersion: string // sdk version
  serverCutPath: boolean // 是否服务截断 path
  serverParseGuide: boolean // 是否服务解析guide
  supportAsyncMode: boolean // sdk是否支持异步化
  yawType: number // 偏航类型:0-未偏航,1-自驾偏航,2-座舱偏航
}

export interface GuideCloudRsp {
  asyncMode: boolean // 是否是异步模式
  cutPathLen: number // 0表示全量,非0表示局部实际匹配的长度,单位米
  cutPathReservedInfo: Record<string, string> // 预留第二次请求时metedata带上的信息
  errcode: number // 0正常，非0失败，失败时msg提供失败原因
  guideCode: number// 0正常，非0失败，诱导错误码
  mmCode: number // 0正常，非0失败，异源匹配错误码
  mmRsp: {
    cutPathLen: number // 0表示全量,非0表示局部实际匹配的长度,返回时云端直接透传
    errcode: number // 0正常，非0失败，失败时msg提供失败原因
    msg: string // 具体错误信息见注意事项
    result: {
      bindPoints: { // 每个输入点对应的绑路结果
        status: number // 绑定状态：0 表示成功，非0表示匹配失败，以下字段无意义
        raw_link_id: number // raw link id
        dir: number // 方向： 0 顺方向，1 逆方向
        timestamp: number // 对应输入点的时间戳
        point: Point // 该点对应到 raw link 上绑定点的经纬度
        offset: number // 绑定点在link上的偏移量，取值在[0-100]之间
        distance: number // 点到绑定link的距离, 单位为厘米
        coor_start_index: number // 吸附点所在形点 seg位置
      }[]
      dataVersion: string // 数据版本
      linkGroups: { // 绑路结果，数组中每个值为一组连续link，当绑路结果不连续时，可能会有多个
        bindpointIdx: number // 当前 linkgroup 绑定的输入点序列位置；如果为-1，表示两个输入点中间存在断开，当前linkgroup没有对应的输入点
        bindpointNum: number // 当前 linkgroup 绑定的输入点数量；
        endLoc: Point // linkgroup 终点位置
        length: number // linkgroup 长度，单位厘米，计算方式见下
        linkinfo: {
          dir: number // 方向：0 顺方向， 1 逆方向
          laneNumber: number // 按照通行方向给出当前link的车道数,不否包含应急车道
          length: number // raw link 长度, 单位厘米
          points: [Point, Point] // raw link 的形点串
          rawLinkId: string // raw link id
          tpid: { // raw link id 对应的 tpid
            status: 'EXISTED' | 'NOT_EXIST' | 'BAD_ID' // 0-已存在 1-不存在 2-数据异常
            tile_id: number
            id: number
          }
          lane_group: { // raw link id 对应的lane group
            lanegroupid: {
              tile_id: number
              id: number
            }[]
          }
        }[] // 绑定结果的各个link信息
        startLoc: Point // linkgroup 起始位置
        status: number // 状态：0 表示匹配成功的区间；1 表示未匹配的区间；2 表示匹配失败的区间
      }[]
      pathErrcode: number // 匹配错误码
      pathErrmsg: string // 匹配错误信息
      pathId: string // 输入对应的 path id;
    }[]
  }
  mmTaskId: string // 任务请求 id
  msg: string
  navGuideRsp: {
    routeIds: string[]
    routes: string[]
  }[]
  routeGuideRes: { // guide信息
    errcode: number // 0正常，非0失败
    msg: string // 消息
    result: { // 诱导结果
      routeErrcode: number // 0正常，非0失败
      routeId: string[] // route id
      routeMsg: string // 失败时msg提供失败原因
      routes: { // 路线
        oneRouteErrcode: number // 0正常，非0失败
        oneRouteMsg: string // 失败时msg提供失败原因
        rgCondGuideAreaResult: { // 引导面左边线变化信息
          area_id: number // 引导面id
          active_times: string[] // 时间条件
          rg_left_interval_result: BoundaryInterval[] // 引导面左边线变化信息
          rg_right_interval_result: BoundaryInterval[] // 引导面右边线变化信息
        }[]
        rgIntersectionResult: { // 导航转向信息
          accessoryInfo: number // 辅助动作
          enterPos: RoutePos // 进入机动点路口位置
          interRawLinkIds: number[] // 模型对应link串
          interType: number // 机动点类型,转向模型
          leavePos: RoutePos // 离开机动点路口位置
          rawLinkId: number // raw link id
        }[]
        rgLaneInfoResult: { // 推荐车道信息
          activeTime: string // 车道生效时间
          additionalLaneInfo: { // 潮汐、可变、公交车道会使用
            arrow: number[] // 车道线信息一个char代表一种类型
            flag: number[] // 是否高亮 0.不高亮, 1高亮
            property: number[]
            active_time: string // 车道生效时间
          }[]
          arrow: number[] // 车道箭头类型信息
          flag: number[] // 车道线高亮车道信息
          laneInfoRawLinkIds: number[] // 车信对应link串
          pos: RoutePos // 坐标点
          property: number[] // 车道线车道属性信息
          rawLinkId: number // raw link id
          recommend: number[] // 推荐车道标识
        }[]
        rgRedLightResult: { // 红绿灯信息
          rawLinkId: number // raw link id
          pos: RoutePos // 坐标点
        }[]
        rgTipsResult: { // Tips
          rawLinkId: number // raw link id
          tsection: number // tsection
          pos: RoutePos // 坐标点
        }[]
        route_points: Point[] // 抽稀后的道路导航路线形状点
      }[]
    }[]
  }[]
  serverCutPath: boolean // 是否服务截断 path
  serverMappingGuide: boolean // 是否服务映射guide
  serverParseGuide: boolean // 是否服务解析guide
}

export interface Point {
  lng: number // 经度，放大 10^7 倍
  lat: number // 纬度，放大 10^7 倍
}

export interface RoutePos {
  pos: Point // 坐标点
  coor_start: number // 点在路线点串的起始索引
  offset_length: number // 点相对 coor_start 对应形状点的偏离距离，单位米
  link_offset: number // 所在link的起点的offset，单位米
}

interface BoundaryInterval {
  raw_link_id: number // raw link id
  dir: number // 方向：0 顺方向， 1 逆方向
  change_lane_type: number // 0:没有变道线, 1:缩进, 2:扩展
  in_lane_seqs: number[] // 变化点前可行驶车道序号，从左到右，从1开始
  out_lane_seqs: number[] // 变化点后可行驶车道序号，从左到右，从1开始
  sd_pos: RoutePos // 变化点投影到 sd link 坐标点
  in_total_lane_types: { lane_types: number }[] // 变化点前所有车道类型
  out_total_lane_types: { lane_types: number }[] // 变化点后所有车道类
  in_lane_data_type: number // 变化点前车道数据类型,0-高精数据,1-SD数据
  out_lane_data_type: number // 变化点后车道数据类型,0-高精数据,1-SD数据
}
