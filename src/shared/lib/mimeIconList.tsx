import {
  CustomerServiceOutlined,
  FileExcelOutlined,
  FileImageOutlined,
  FilePdfOutlined,
  FilePptOutlined,
  FileTextOutlined,
  FileWordOutlined,
  FileZipOutlined,
  VideoCameraOutlined,
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
  [MimeGroupsEnum.DEFAULT]: <FileTextOutlined />,
  [MimeGroupsEnum.VIDEO]: <VideoCameraOutlined />,
  [MimeGroupsEnum.AUDIO]: <CustomerServiceOutlined />,
  [MimeGroupsEnum.IMAGE]: <FileImageOutlined />,
  [MimeGroupsEnum.TEXT]: <FileTextOutlined />,
  [MimeGroupsEnum.APPLICATION]: {
    [MimeAppTypesEnum.DOC]: <FileWordOutlined />,
    [MimeAppTypesEnum.DOCX]: <FileWordOutlined />,
    [MimeAppTypesEnum.XLS]: <FileExcelOutlined />,
    [MimeAppTypesEnum.XLSX]: <FileExcelOutlined />,
    [MimeAppTypesEnum.PPT]: <FilePptOutlined />,
    [MimeAppTypesEnum.PPTX]: <FilePptOutlined />,
    [MimeAppTypesEnum.PDF]: <FilePdfOutlined />,
    [MimeAppTypesEnum.ZIP]: <FileZipOutlined />,
  },
}
