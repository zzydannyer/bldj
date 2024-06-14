import dayjs from 'dayjs'
import { PickerOption } from 'vant'

export const parse = (time?: number | string | Date, cFormat?: string) =>
  time ? dayjs(time).format(cFormat || 'YYYY年MM月DD日') : time

export const joinDate = (target: any[], key: string, separator = '') =>
  target.map((i) => i[key]).join(separator)

export const dateFormatter = (
  type: string,
  option: PickerOption
): PickerOption => {
  if (type === 'year') option.text += '年'
  if (type === 'month') option.text += '月'
  if (type === 'day') option.text += '日'
  return option
}

export const _today = dayjs().toDate()
export const _5_years_ago = dayjs().subtract(5, 'year').toDate()
export const _10_years_future = dayjs().add(10, 'year').toDate()
export const formatDate = (time?: string) =>
  time ? dayjs(time).locale('zh-cn').format('YYYY年MM月DD日') : time

export const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  const formattedHours = hours < 10 ? '0' + hours : hours
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes
  const formattedSeconds =
    remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds

  return formattedHours + ':' + formattedMinutes + ':' + formattedSeconds
}
