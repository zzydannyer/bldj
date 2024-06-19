interface HomeResData {
  topic_pic: TopicPic[];
  home_jc_news: HomeJcNews[];
  home_topic: HomeTopic[];
  home_jt_news: HomeJtNews[];
  home_system: HomeSystem[];
  home_head_news: HomeHeadNews[];
  home_notice: HomeNotice[];
}

interface Basic {
  uid: string;
  title: string;
  releaseDate: string;
  isLink: '0' | '1'; // 0:否 1:是
  link: string;
}
interface TopicPic extends Basic {
  picUrl: string;
  topicType: string;
  topicName: string;
}

interface HomeJcNews extends Basic {}
interface HomeTopic extends Basic {
  picUrl: string;
}
interface HomeJtNews extends Basic {}
interface HomeSystem extends Basic {}

interface HomeHeadNews extends Basic {
  picUrl: string;
}

interface HomeNotice extends Basic {
  channelId: string; //所属栏目id
  orgId: string;
  receiveType: '0' | '1' | '2' | '3' | '9'; //接收单位类型( 0:关闭;1:全部;2:二级单位 3:三级单位 9:部分公司)
  recRoleType: '0' | '1'; //角色接收类型 0 全部 1自定义
  status: '20'; // 状态(0:草稿; [1:审核中,11:集团审核,12:二级机构审核,13:三级机构审核]
  type: '1';
  creatorRealName: ' 系统管理员';
  isActive: '1';
  topicType: null;
  channelName: '工作提示';
  channelOrder: null;
  sourceFrom: null;
  topicName: null;
  isRead: true;
}
