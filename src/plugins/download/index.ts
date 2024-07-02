import axios from 'axios';
import { saveAs } from 'file-saver';
import { parse } from 'qs';
import { isUndefined } from 'lodash';
import request from '@/utils/request';
import Utils from '@/utils';
import { showLoadingToast, closeToast, showFailToast } from 'vant';

async function printErrMsg(data: any) {
  const resText = await data.text();
  const { code, msg }: any = parse(resText);
  showFailToast(msg);
}

const baseURL = import.meta.env.VITE_APP_BASE_API;
export default async function (ossKey: string, filename: string) {
  try {
    showLoadingToast('正在下载，请稍候');
    var url = '';
    let params = {};
    if (isUndefined(filename)) {
      url = baseURL + '/manage/oss/download/' + ossKey;
    } else {
      url = baseURL + '/manage/oss/download';
      params = {
        filename: filename,
        url: ossKey
      };
    }

    // axios({
    //   method: 'get',
    //   url: url,
    //   responseType: 'blob',
    //   params: params,
    //   headers: { 'Authorization': 'Bearer ' + getToken() }
    // }).then(async (res) => {
    //   const isLogin = await blobValidate(res.data);
    //   if (isLogin) {
    //     const blob = new Blob([res.data], { type: 'application/octet-stream' })
    //     this.saveAs(blob, decodeURI(res.headers['download-filename']))
    //   } else {
    //     this.printErrMsg(res.data);
    //   }
  } catch (e) {
    console.error(e);
    showFailToast('下载文件出现错误!');
  } finally {
    closeToast();
  }
}
