import { BaseEntity } from '@/types';

export class UserCollect extends BaseEntity {
  id?: number;
  mediaType?: number;
  author?: string;
  shootingTime?: string;
  projectName?: string;
  shootingArea?: string;
  materialBrief?: string;
  collectTime?: string;
  ossId?: number;
  url?: string;
  thumbUrl?: any;
  constructor() {
    super();
    //  * 根据自身业务需要的初始化值修改
  }
}

export class UserCollectQuery {
  // * 收藏时间
  collectTimeBegin?: string;
  collectTimeFinal?: string;
  collectTimeChoose?: string[];
  projectName?: string;
}
