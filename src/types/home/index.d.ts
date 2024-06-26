export interface HomeResData {
  topic_pic: TopicPic[];
  home_jc_news: HomeNews[];
  home_topic: HomeTopic[];
  home_jt_news: HomeNews[];
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
export interface TopicPic extends Basic {
  picUrl: string;
  topicType: string;
  topicName: string;
}

export interface HomeNews extends Basic {
  type: '1' | '2';
}
export interface HomeTopic extends Basic {
  picUrl: string;
}
export interface HomeSystem extends Basic {}

export interface HomeHeadNews extends Basic {
  picUrl: string;
}

export interface HomeNotice extends Basic {
  // 没用的不记录
}
