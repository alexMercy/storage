import {
  CustomerServiceTwoTone,
  FileExcelTwoTone,
  FileImageTwoTone,
  FilePdfTwoTone,
  FilePptTwoTone,
  FileTextTwoTone,
  FileWordTwoTone,
  FileZipTwoTone,
  VideoCameraTwoTone,
} from '@ant-design/icons'

export enum MimeGroupsEnum {
  DEFAULT = 'default',
  APPLICATION = 'application',
  AUDIO = 'audio',
  VIDEO = 'video',
  IMAGE = 'image',
  TEXT = 'text',
  // FONT = 'font',
  // EXAMPLE = 'example',
  // MESSAGE = 'message',
  // MODEL = 'model',
  // MULTIPART = 'multipart',
}

export enum MimeAppTypesEnum {
  DEFAULT = 'default',
  DOC = 'msword',
  DOCX = 'vnd.openxmlformats-officedocument.wordprocessingml.document',
  XLS = 'vnd.ms-excel',
  XLSX = 'vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  PPT = 'vnd.ms-powerpoint',
  PPTX = 'vnd.openxmlformats-officedocument.presentationml.presentation',
  PDF = 'pdf',
  ZIP = 'zip',
}

export const mimeIconTree: Record<MimeGroupsEnum, any> = {
  [MimeGroupsEnum.DEFAULT]: FileTextTwoTone,
  [MimeGroupsEnum.VIDEO]: VideoCameraTwoTone,
  [MimeGroupsEnum.AUDIO]: CustomerServiceTwoTone,
  [MimeGroupsEnum.IMAGE]: FileImageTwoTone,
  [MimeGroupsEnum.TEXT]: FileTextTwoTone,
  [MimeGroupsEnum.APPLICATION]: {
    [MimeAppTypesEnum.DOC]: FileWordTwoTone,
    [MimeAppTypesEnum.DOCX]: FileWordTwoTone,
    [MimeAppTypesEnum.XLS]: FileExcelTwoTone,
    [MimeAppTypesEnum.XLSX]: FileExcelTwoTone,
    [MimeAppTypesEnum.PPT]: FilePptTwoTone,
    [MimeAppTypesEnum.PPTX]: FilePptTwoTone,
    [MimeAppTypesEnum.PDF]: FilePdfTwoTone,
    [MimeAppTypesEnum.ZIP]: FileZipTwoTone,
  },
}
