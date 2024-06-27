import {
  homeContentList,
  type HomeHeadNews,
  type HomeNews,
  type HomeNotice
} from '@/api/home';
import { closeToast, showLoadingToast } from 'vant';
import { Reactive } from 'vue';

interface HomeData {
  swiperList: HomeHeadNews[];
  homeNotice: HomeNotice[];
  homeNews: HomeNews[];
  loading: boolean;
}

function sortNews(a: HomeNews, b: HomeNews) {
  return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
}

export default function (): [Reactive<HomeData>, () => Promise<void>] {
  const data = reactive<HomeData>({
    swiperList: [],
    homeNotice: [],
    homeNews: [],
    loading: false
  });

  async function fetchData() {
    try {
      data.loading = true;
      showLoadingToast({
        message: '加载中...',
        forbidClick: true
      });
      const {
        data: { home_head_news, home_notice, home_jt_news, home_jc_news }
      } = await homeContentList();
      // 轮播数据
      data.swiperList = home_head_news;
      // 通知公告
      data.homeNotice = home_notice;
      // 最新新闻
      const jt_news: HomeNews[] = home_jt_news.map((item) => ({
        ...item,
        type: '1'
      }));
      const jc_news: HomeNews[] = home_jc_news.map((item) => ({
        ...item,
        type: '2'
      }));
      data.homeNews = jt_news.concat(jc_news).sort(sortNews);
    } catch (e) {
      console.error(e);
    } finally {
      data.loading = false;
      closeToast();
    }
  }

  return [data, fetchData];
}
