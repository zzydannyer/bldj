import { BaseEntity } from '@/types';
import dayjs from 'dayjs';

export class PropagandaClue extends BaseEntity {
  // * 主键
  id?: number;
  // * 有效位
  isActive?: string;
  // * 新闻线索关联项目id
  projectId: number;
  // * 项目名称
  projectName: string;
  // * 上报人的公司code
  orgCode: string;
  // * 开始时间
  startTime: Date;
  // * 截止时间
  endTime: Date;
  // * 线索内容
  clueContent: string;
  // * 联系人id 逗号分隔
  linkUserId: string;
  // 联系人姓名串
  linkUser: any[];
  // * 联系人姓名
  linkUserName: string;
  // 新闻线索状态 0 草稿 1 提交 2 通过
  clueStatus: string;
  constructor() {
    super();
    this.startTime = new Date().getTime();
    this.endTime = new Date().getTime();
    //  * 根据自身业务需要的初始化值修改
  }
}

export class PropagandaClueQuery {
  // * 新闻线索关联项目id
  projectId?: number;
  // * 项目名称
  projectName?: string;
  // * 上报人的公司code
  orgCode?: string;
  // * 开始时间
  startTime?: Date;
  // * 截止时间
  endTime?: Date;
  // * 线索内容
  clueContent?: string;
  // * 联系人id
  linkUserId?: string;
  // * 联系人姓名
  linkUserName?: string;
  // * 联系人所属公司code
  linkUserOrgCode?: number;
  clueTimeRange: [];
}

export class PropagandaMainAndClueBo extends BaseEntity {
  // * 新闻线索关联项目id
  projectId: number;
  // * 上报人的公司code
  orgCode: string;
  // * 报道时间
  reportTime: Date;
  // * 集团-赋分依据主表id
  groupScoreMainId: number;
  // * 集团-赋分依据明细表id -- 字符串[a,b,c]
  groupScoreDetailId: any[];
  constructor() {
    super();
    //  * 根据自身业务需要的初始化值修改
  }
}

export class PropagandaMainAndClueVo {
  // * 标记是否为重点新闻线索
  importantClue: boolean;
  // * 标记当前新闻线索百分比类别 0-省部级-10% 1-中央媒体-20%
  clueType: string;
}
