import { defineStore } from 'pinia';
import { RouteRecordName } from 'vue-router';

export default defineStore('scrollTop', () => {
  const scrollTopOptions = reactive<{ [key: RouteRecordName]: number }>({});

  const getScrollTop = (routeName: RouteRecordName) => {
    return scrollTopOptions[routeName];
  };

  const setScrollTop = (routeName: RouteRecordName, scrollTop: number) => {
    scrollTopOptions[routeName] = scrollTop;
  };
  return { scrollTopOptions, getScrollTop, setScrollTop };
});
