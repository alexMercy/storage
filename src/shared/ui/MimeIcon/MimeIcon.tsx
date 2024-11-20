import {
  MimeAppTypesEnum,
  MimeGroupsEnum,
  mimeIconTree,
} from '@/shared/lib/mimeIconList'
import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon'
import { theme } from 'antd'
import { useMemo, type FC } from 'react'

const getIcon = ({ group, type }: Record<string, string>) => {
  const isMimeGroup = (group: string): group is MimeGroupsEnum => {
    return Object.values(MimeGroupsEnum).includes(group as MimeGroupsEnum)
  }

  const isMimeApplicationType = (type: string): type is MimeGroupsEnum => {
    return Object.values(MimeAppTypesEnum).includes(type as MimeAppTypesEnum)
  }

  if (!isMimeGroup(group)) {
    return mimeIconTree[MimeGroupsEnum.DEFAULT]
  }
  const node = mimeIconTree[group]

  //Check if object - React component (not FC, or ReactNode, that isValidElement not working)
  if (node['$$typeof']) return node
  if (!(isMimeApplicationType(type) && group === MimeGroupsEnum.APPLICATION))
    return mimeIconTree[MimeGroupsEnum.DEFAULT]
  return mimeIconTree[MimeGroupsEnum.APPLICATION][type]
}

const splitMime = (mime: string) => {
  const splittedMime = mime.split('/')

  return { group: splittedMime[0], type: splittedMime[1] }
}
interface MimeIconProps extends AntdIconProps {
  mimetype: string
}

export const MimeIcon: FC<MimeIconProps> = ({ mimetype, ...iconProps }) => {
  const { token } = theme.useToken()
  const mime = splitMime(mimetype)
  const Icon = getIcon(mime)

  const iconColor: Record<MimeGroupsEnum, string> = useMemo(
    () => ({
      [MimeGroupsEnum.DEFAULT]: token.colorPrimary,
      [MimeGroupsEnum.APPLICATION]: token.colorPrimary,
      [MimeGroupsEnum.AUDIO]: token.colorError,
      [MimeGroupsEnum.IMAGE]: token.colorError,
      [MimeGroupsEnum.VIDEO]: token.colorError,
      [MimeGroupsEnum.TEXT]: token.colorWarning,
    }),
    []
  )

  return (
    <Icon
      {...iconProps}
      twoToneColor={
        iconProps.twoToneColor ||
        iconColor[mime.group as MimeGroupsEnum] ||
        iconColor.default
      }
    />
  )
}
