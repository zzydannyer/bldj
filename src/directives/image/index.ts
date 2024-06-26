import type { App, DirectiveBinding } from 'vue';
import { isObject } from 'lodash';
import UrlServer from '@/api/privateUrl';
import Utils from '@/utils';

// const generatePrivateUrl = async function (url, seconds = 180) {
//   try {
//     const response = await getPrivateUrl(url, seconds);
//     return Promise.resolve(response.data);
//   } catch (e) {
//     return Promise.reject(e);
//   }
// };

// const generatePrivateUrlWithReqParams = async function (url, reqParams) {
//   try {
//     const response = await getPrivateUrlWithReqParams(url, reqParams);
//     return Promise.resolve(response.data);
//   } catch (e) {
//     return Promise.reject(e);
//   }
// };

function setUrl(el: HTMLElement, url: string) {
  if (el.tagName.toLowerCase() === 'img') {
    // 如果el是img标签，直接设置src属性
    el.setAttribute('src', url);
  } else {
    // 否则向下查找img标签设置src属性
    const img = el.querySelector('img');
    if (img) {
      img.setAttribute('src', url);
    }
  }
}

async function getImage(el: HTMLElement, binding: DirectiveBinding) {
  const imgUrl = binding.value;
  const isMini = binding.arg === 'mini';
  if (!imgUrl || !Utils.isLink(imgUrl)) return;

  try {
    const { data: privateUrl } = await UrlServer.GET_URL(imgUrl, isMini);
    setUrl(el, privateUrl);
  } catch (e: unknown) {
    console.error(e);
  }
}

const imgUrlDirective = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    getImage(el, binding);
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    getImage(el, binding);
  }
};
export default function usePrivateUrl(app: App) {
  app.directive('src', imgUrlDirective);
}
