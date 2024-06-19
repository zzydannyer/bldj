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
  isLink: string; // 0:否 1:是
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

interface HomeNotice extends Basic{
    searchValue: null,
    uid: 'b1ea4f5b9d71432292b01191d43390d3',
    creatorUid: '82bab99a420f4fb3b8feaf5959d6b770',
    createTime: '2023-12-05 14:16:52',
    updaterUid: '82bab99a420f4fb3b8feaf5959d6b770',
    updateTime: '2023-12-05 14:16:52',
    params: {},
    homePlate: null,
    channelId: '6ffa10437a604e5abd45a6727f8801d6',
    orgId: '00010001',
    title: '近期意识形态工作提示',
    releaseDate: '2023-12-05 14:16:19',
    description: null,
    homeLevel: 0,
    picUrl: null,
    isLink: '0',
    link: null,
    receiveType: '1',
    recRoleType: '0',
    status: '20',
    type: '1',
    creatorRealName: ' 系统管理员',
    isActive: '1',
    topicType: null,
    channelName: '工作提示',
    channelOrder: null,
    sourceFrom: null,
    topicName: null,
    isRead: true
  }