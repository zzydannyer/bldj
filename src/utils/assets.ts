const icons = import.meta.glob('@/assets/icons/*', {
  eager: true,
  import: 'default',
})

const images = import.meta.glob('@/assets/images/*', {
  eager: true,
  import: 'default',
})

const suffixes = ['jpg', 'png', 'svg']
/**
 * @description 获取assets/icons
 * @param iconName
 */
export const useIcon = (iconName: string): any => {
  for (const suffix of suffixes) {
    const path = `/src/assets/icons/${iconName}.${suffix}`
    const icon = icons[path]
    if (icon) return icon
  }
  return undefined
}

/**
 * @description 获取assets/images
 * @param imageName
 */
export const useImage = (imageName: string): any => {
  for (const suffix of suffixes) {
    const path = `/src/assets/images/${imageName}.${suffix}`
    const icon = images[path]
    if (icon) return icon
  }
  return undefined
}
