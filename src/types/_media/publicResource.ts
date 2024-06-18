import { BaseEntity } from '@/types';

export class PublicResourceFile extends BaseEntity {
  // * 主键
  id?: number;
  // * 公共资源主表id
  resId?: number;
  // * 文件名称
  name?: string;
  // * 附件oss_id
  ossId?: string;
  // * 1：文档 2：图片 3：视频 4：其他
  fileType = '';

  // * url地址
  url?: string;
  // * 公共资源标题
  resTitle?: string;
  // * 是否主页显示
  isHomeShow = '0';
  // * 排序字段
  orderNumber = 99;
  // * 是否置顶
  isTop = '0';
  mediaList?: any[];

  // 资源类型
  fileTypename?: string;
  // 缩略图路径
  thumbUrl?: string;
  constructor() {
    super();
    //  * 根据自身业务需要的初始化值修改
  }
}

export class PublicResourceFileQuery {
  //公共资源标题
  resTitle?: string;
}
