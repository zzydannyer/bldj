export const fileTypes: any = {
  file: [
    'text/plain',
    'application/pdf',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ],
  image: ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp', 'image/jpg', 'image/heic'],
  video: ['video/mp4', 'video/wmv', 'video/avi', 'video/mov', 'video/mpeg', 'video/mkv']
};

export const acceptTypes: any = {
  file: fileTypes.file.join(','),
  image: fileTypes.image.join(','),
  video: fileTypes.video.join(',')
};
