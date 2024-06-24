export interface HomeResData {
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
  // 没用的不记录
}
