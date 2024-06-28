import axios from 'axios';
import { saveAs } from 'file-saver';
import { parse } from 'qs';
import request from '@/utils/request';
import { ErrorCode } from '@/constants';
import { transParams } from '@/utils';
import { showLoadingToast, closeToast, showFailToast } from 'vant';

async function printErrMsg(data: any) {
  const resText = await data.text();
  const { code, msg }: any = parse(resText);
  const errMsg = (ErrorCode[code] as string) || msg || ErrorCode[-1];
  showFailToast(errMsg);
}

export default async function (url: string, filename: string) {
  try {
    showLoadingToast({
      message: '下载中...'
    });

    const { data }: { data: BlobPart } = await axios.get(url, {
      responseType: 'blob'
    });
  } catch (e) {
    console.error(e);
    showFailToast('下载文件出现错误，请联系管理员！');
  } finally {
    closeToast();
  }
}
