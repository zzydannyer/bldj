import request from '@/utils/request';

import {
  MediaMainQuery,
  MediaMain,
  MediaPublic,
  CropVideoParams,
  MediaActivitiesQuery,
  MediaActivitiesScoreQuery,
  MediaActivities,
  MediaActivitiesScore,
  MediaActivitiesScoreDetail,
  MediaActivitiesRankings
} from '@/types/_media';
import { PaginationProps } from '@/types/list';
import { MediaAudit } from '@/types/_media';
import { UserCollect } from '@/types/_media/collect';
import { Message, MessageQuery } from '@/types/_message';

// 查询媒体信息列表
export function listMedia(
  query: MediaMainQuery,
  page: PaginationProps
): Promise<Resp<MediaMain[]>> {
  return request('get', '/multimedia/media/list', {
    params: { ...page, ...query }
  });
}

// 查询媒体信息详细
export function getMedia(id: Numeric): Promise<Resp<MediaMain>> {
  return request('get', '/multimedia/media/' + id);
}

/**
 * @description 新增媒体信息
 * @param data
 * @returns
 */
export function addMedia(data: MediaMain): Promise<Resp<void>> {
  return request('post', '/multimedia/media', { data: data });
}

// * 修改媒体信息
export function updateMedia(data: MediaMain): Promise<Resp<void>> {
  return request('put', '/multimedia/media', { data: data });
}

// * 删除媒体信息
export function delMedia(id: number | number[]): Promise<Resp<void>> {
  return request('delete', '/multimedia/media/' + id);
}
// * 提交媒体信息
export function submitMedia(id: number): Promise<Resp<void>> {
  return request('put', '/multimedia/media/submit/' + id);
}

export function directSubmitMedia(media: MediaMain): Promise<Resp<void>> {
  return request('put', '/multimedia/media/directSubmit', { data: media });
}
// * 获取资源类型
export function treeResourceCategory(): Promise<Resp<any[]>> {
  return request('get', '/multimedia/media/category/tree');
}

// * 获取待审列表
export function listAuditing(
  query: MediaMainQuery,
  page: PaginationProps
): Promise<Resp<any[]>> {
  return request('get', '/multimedia/media/auditing/list', {
    params: { ...page, ...query }
  });
}

// * 获取已审列表
export function listAudited(
  query: MediaMainQuery,
  page: PaginationProps
): Promise<Resp<any[]>> {
  return request('get', '/multimedia/media/audited/list', {
    params: { ...page, ...query }
  });
}

// * 通过审核
export function passAudit(
  main: MediaMain,
  checkedIds: string
): Promise<Resp<void>> {
  return request('put', '/multimedia/media/audit/pass', {
    params: {
      checkedIds: checkedIds
    },
    data: main
  });
}

// * 拒绝审核
export function backAudit(mainId: number, remark: string): Promise<Resp<void>> {
  return request('put', '/multimedia/media/audit/back/' + mainId, {
    params: {
      remark: remark
    }
  });
}
// 点击已读
export function readOne(id: number): Promise<Resp<void>> {
  return request('put', `/message/readOne/` + id);
}
// * 视频裁剪
/* export function cropVideo(detailId: number, list: any): Promise<Resp<void>> {
  return request('put', '/multimedia/media/audit/video/crop/' + detailId, {
    data: list,
    timeout: 1000 * 60 * 1000,
  })
} */

// * 视频裁剪
export function cropVideo(
  detailId: Numeric,
  list: CropVideoParams[]
): Promise<Resp<{ url: string; ossId: number }>> {
  return request('put', '/multimedia/media/audit/video/crop/' + detailId, {
    data: list,
    timeout: 1000 * 60 * 1000
  });
}

export function listMediaPublic(
  query: MediaMainQuery,
  page: PaginationProps
): Promise<Resp<MediaPublic[]>> {
  return request('get', '/multimedia/media/public/list', {
    params: { ...page, ...query }
  });
}

// * 获取最新的公开媒体列表 - 集团审核通过
export function listMediaPublicLast(): Promise<Resp<MediaPublic[]>> {
  return request('get', '/multimedia/media/public/last');
}
// * 获取媒体信息 - 集团审核通过
export function getMediaPubilc(detailId: string): Promise<Resp<MediaPublic>> {
  return request('get', '/multimedia/media/public/' + detailId);
}
// * 获取审核列表
export function listAudit(mainId: Numeric): Promise<Resp<MediaAudit[]>> {
  return request('get', `/multimedia/media/audit/${mainId}/list `);
}
//媒体资料审核列表
export function AudiTing(
  query: MediaMainQuery,
  page: PaginationProps
): Promise<Resp<MediaPublic[]>> {
  return request('get', '/multimedia/media/auditing/list', {
    params: { ...page, ...query }
  });
}
//个人收藏列表
export function userCollect(
  query: MediaMainQuery,
  page: PaginationProps
): Promise<Resp<MediaPublic[]>> {
  return request('get', '/usercollect/list', {
    params: { ...page, ...query }
  });
}
// 新增【个人】个人收藏
export function addUserCollect(data: string): Promise<Resp<void>> {
  return request('post', `/usercollect/${data}`);
}
// 删除【个人】个人收藏
export function delUserCollect(id: number | number[]): Promise<Resp<void>> {
  return request('delete', `/usercollect/` + id);
}
// 查询【个人】个人收藏详细
export function getUserCollect(id: string): Promise<Resp<UserCollect>> {
  return request('get', `/usercollect/` + id);
}
// 查询消息推送主体列表
export function listMessageManage(
  query: MessageQuery,
  page?: PaginationProps
): Promise<Resp<Message[]>> {
  return request('get', `/message/list`, {
    params: { ...page, ...query }
  });
}

// * 呈报到集团
export function submitGroup(mainId: any): Promise<Resp<void>> {
  return request('post', `/multimedia/media/audit/submitGroup/${mainId}`);
}

// * 在集团审核退回的时候退回
export function backInBackAudit(
  mainId: string,
  backReason: string
): Promise<Resp<void>> {
  return request('post', `/multimedia/media/audit/backInBack/${mainId}`, {
    params: {
      backReason: backReason
    }
  });
}

// * 文件检验是否重复
export function fileCheck(
  md5: string,
  fileSize: string | number
): Promise<Resp<any>> {
  return request('post', `/multimedia/media/upload/check`, {
    data: {
      md5: md5,
      fileSize: fileSize
    }
  });
}

// 征集活动
export function listActivitiesByMainId(id: string): Promise<Resp<any[]>> {
  return request('get', `/multimedia/media/${id}/activities`);
}
// 查询媒体征集活动列表
export function listActiveMediaActivities(
  query?: MediaActivitiesQuery
): Promise<Resp<MediaActivities[]>> {
  return request('get', `/multimedia/mediaActivities/list/active`, {
    params: query
  });
}
// 查询待评分的记录
export function listMediaActivitiesScoreWithPending(
  query: MediaActivitiesScoreQuery,
  page?: PaginationProps
): Promise<Resp<MediaActivitiesScore[]>> {
  return request('get', `/multimedia/mediaActivitiesScore/pending`, {
    params: { ...page, ...query }
  });
}

// 查询已评分的记录
export function listMediaActivitiesScoreWithCompleted(
  query: MediaActivitiesScoreQuery,
  page?: PaginationProps
): Promise<Resp<MediaActivitiesScore[]>> {
  return request('get', `/multimedia/mediaActivitiesScore/completed`, {
    params: { ...page, ...query }
  });
}
// 查询媒体征集分数详细
export function getMediaActivitiesScoreDetail(
  activitiesId: string,
  detailId: string
): Promise<Resp<MediaActivitiesScoreDetail>> {
  return request(
    'get',
    `/multimedia/mediaActivitiesScore/activities/${activitiesId}/detail/${detailId}`
  );
}
// 新增媒体征集分数
export function scoreMediaDetail(
  data: MediaActivitiesScore[]
): Promise<Resp<void>> {
  return request('post', `/multimedia/mediaActivitiesScore/score`, {
    data: data
  });
}
export function listPublicMediaActivitiesScore(
  query: MediaActivitiesScoreQuery,
  page?: PaginationProps
): Promise<Resp<MediaActivitiesScore[]>> {
  return request('get', `/multimedia/mediaActivitiesScore/public`, {
    params: { ...page, ...query }
  });
}
// 查询媒体征集分数详细
export function getPublicMediaActivitiesScoreDetail(
  activitiesId: string,
  detailId: string
): Promise<Resp<MediaActivitiesScoreDetail>> {
  return request(
    'get',
    `/multimedia/mediaActivitiesScore/activities/public/${activitiesId}/detail/${detailId}`
  );
}
// 获取评分排名列表
export function listMediaActivitiesRanking(
  query: MediaActivitiesQuery,
  page?: PaginationProps
): Promise<Resp<MediaActivitiesRankings[]>> {
  return request('get', `/multimedia/mediaActivitiesScore/ranking/list`, {
    params: { ...page, ...query }
  });
}
