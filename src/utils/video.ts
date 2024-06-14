// 获取任意帧图片
export const setVideoImg = (
  url: string,
  currentTime: number = 0.1,
  el?: Element,
  itemClassName: string = 'item-class'
): Promise<any> => {
  return new Promise((resolve, reject) => {
    // 创建视频
    const video = document.createElement('video')
    video.controls = false
    video.crossOrigin = 'anonymous'

    // 播放地址
    const source = document.createElement('source')
    source.src = url
    source.type = 'video/mp4'
    video.appendChild(source)

    // 这很重要
    video.currentTime = currentTime
      ? currentTime > 0
        ? currentTime
        : 0.1
      : 0.1
    // 当前帧的数据已加载
    video.addEventListener('loadeddata', () => {
      // 画布
      const canvas = document.createElement('canvas')
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const ctx = canvas.getContext('2d')!
      // 创建画布
      ctx.drawImage(video, 0.5, 0.5, canvas.width, canvas.height)
      // 转码添加
      // 图片
      const img = document.createElement('img')
      img.className = itemClassName
      img.src = canvas.toDataURL('image/png')

      if (el) {
        // 给特定vue节点添加
        el.appendChild(img)
      }
      resolve(img.src)
    })
  })
}
