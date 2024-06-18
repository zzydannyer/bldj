import { BaseEntity } from '@/types';

export class PropagandaFile extends BaseEntity {
  // * 主键
  id?: number;
  // * 主表id
  mainId?: number;
  // * 文件名
  fileName?: string;
  // * 附件id
  ossId?: string;
  // 附件类型
  fileType?: number;
  // * 附件顺序
  fileOrder?: number;
  // * 1：有效 0：删除
  isActive?: string;
  // 资源链接
  url?: string;

  constructor() {
    super();
    //  * 根据自身业务需要的初始化值修改
  }
}

export class PropagandaFileQuery {
  // * 主表id
  mainId?: number;
  // * 文件名
  fileName?: string;
  // * 附件id
  ossId?: string;
  // * 附件顺序
  fileOrder?: number;
}
