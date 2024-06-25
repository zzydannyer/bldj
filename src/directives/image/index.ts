import type { App } from 'vue';
import { isObject } from 'lodash';
import request from '@/utils/request';

function getPrivateUrl(url, seconds) {
  return request({
    url: '/manage/oss/privateUrl',
    method: 'get',
    params: { url, seconds }
  });
}
function getPrivateUrlWithReqParams(url, reqParamObj) {
  return request({
    url: '/manage/oss/privateUrlWithParams',
    method: 'get',
    params: {
      url: url,
      reqParams: JSON.stringify(reqParamObj)
    }
  });
}

const generatePrivateUrl = async function (url, seconds = 180) {
  try {
    const response = await getPrivateUrl(url, seconds);
    return Promise.resolve(response.data);
  } catch (e) {
    return Promise.reject(e);
  }
};

const generatePrivateUrlWithReqParams = async function (url, reqParams) {
  try {
    const response = await getPrivateUrlWithReqParams(url, reqParams);
    return Promise.resolve(response.data);
  } catch (e) {
    return Promise.reject(e);
  }
};

const getImg = (el, binding) => {
  let imgUrl;
  let isObj = isObject(binding.value) && isObject(binding.value.params);
  if (isObj) {
    imgUrl = binding.value.url;
  } else {
    imgUrl = binding.value;
  }
  if (!imgUrl) return;
  isExist(imgUrl)
    .then(() => {
      el.setAttribute('src', imgUrl);
    })
    .catch(async () => {
      try {
        let privateUrl;
        if (isObj) {
          // 如果是object，根据参数生成私有url
          privateUrl = await generatePrivateUrlWithReqParams(
            imgUrl,
            binding.value.params
          );
        } else {
          console.log(777777777);
          privateUrl = await generatePrivateUrl(imgUrl);
        }
        el.setAttribute('src', privateUrl);
      } catch (e) {
        el.setAttribute('src', defaultImg);
      }
    });
};

const isExist = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function () {
      if (this.complete === true) {
        resolve(url);
      }
    };
    img.onerror = function (e) {
      reject(e);
    };
    img.src = url;
  });
};
const imgUrlDirective = {
  mounted(el, binding) {
    getImg(el, binding);
  },
  update(el, binding) {
    getImg(el, binding);
  }
};
export default function usePrivateUrl(app: App) {
  app.directive('src', imgUrlDirective);
}
