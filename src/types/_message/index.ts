import { BaseEntity } from '@/types';

export class Message extends BaseEntity {
  // * $column.columnComment
  id?: number;
  // * 用户id
  userId?: number;
  // * 是否已读
  isRead: string = '';
  // * 消息推送内容
  description?: string;
  // * 1:重点项目 2: 日程任务 3:宣传考核 4:素材资源
  type: string = '';
  // * $column.columnComment
  isActive?: string;

  constructor() {
    super();
    //  * 根据自身业务需要的初始化值修改
  }
}

export class MessageQuery {
  // * 用户id
  userId?: number;
  // * 是否已读
  isRead?: string = '';
  // * 消息推送内容
  description?: string;
  // * 1：消息，2：待办
  type?: string = '';
}

export class MessageViewVo {
  id: number;
  userId: number;
  username: string;
  messageModule: string;
  messageType: string;
  businessId: number;
  componentUrl: string;
  componentType: string;
  params: any;
  dialogField: any;
  constructor() {
    this.params = {};
    this.dialogField = {};
  }
}

export class MessageRow {
  id: number;

  type: string;

  module: string;

  businessId: string;

  title: string;

  datetime: string;

  avatar: string;

  action: boolean;

  completed: boolean;
}
