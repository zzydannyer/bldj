import SparkMD5 from 'spark-md5'

// 计算文件的md5
export function fileMd5(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    const spark = new SparkMD5.ArrayBuffer()

    // 当文件读取完成时，计算 MD5 值并返回
    fileReader.onload = (event: ProgressEvent<FileReader>) => {
      if (event.target?.result) {
        spark.append(event.target.result as ArrayBuffer)
        const md5 = spark.end()
        resolve(md5)
      } else {
        reject(new Error('File read failed'))
      }
    }

    // 如果文件读取失败，返回错误信息
    fileReader.onerror = () => {
      reject(new Error('File read failed'))
    }

    // 读取文件内容
    fileReader.readAsArrayBuffer(file)
  })
}
