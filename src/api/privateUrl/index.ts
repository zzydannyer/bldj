import request from '@/utils/request';

const param = { 'x-image-process': 'image/resize,m_fixed,w_347' };
function GET_URL(imgUrl: string, isMini: boolean) {
  const params = isMini
    ? { url: imgUrl, seconds: 180 }
    : { url: imgUrl, reqParams: JSON.stringify(param) };
  const url = isMini
    ? '/manage/oss/privateUrl'
    : '/manage/oss/privateUrlWithParams';
  return request<ResData<string>>({
    url,
    method: 'GET',
    params
  });
}

export default {
  GET_URL
};
