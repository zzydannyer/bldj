import dayjs from 'dayjs';
import { PickerOption } from 'vant';

export const _today = dayjs().toDate();
export const _5_years_ago = dayjs().subtract(5, 'year').toDate();
export const _10_years_future = dayjs().add(10, 'year').toDate();
export function formatDate(time?: string) {
  time ? dayjs(time).locale('zh-cn').format('YYYY年MM月DD日') : time;
}
export function parse(time?: number | string | Date, cFormat?: string) {
  return time ? dayjs(time).format(cFormat || 'YYYY年MM月DD日') : time;
}

export function joinDate(target: any[], key: string, separator = '') {
  return target.map((i) => i[key]).join(separator);
}

export function dateFormatter(type: string, option: PickerOption): PickerOption {
  if (type === 'year') option.text += '年';
  if (type === 'month') option.text += '月';
  if (type === 'day') option.text += '日';
  return option;
}
export function formatTime(seconds?: number): string {
  if (!seconds) return '00:00:00';
  function pad(num: number): string {
    return String(num).padStart(2, '0');
  }
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${pad(hours)}:${pad(minutes)}:${pad(remainingSeconds)}`;
}
