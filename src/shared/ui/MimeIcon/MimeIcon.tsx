import {
  MimeAppTypesEnum,
  MimeGroupsEnum,
  mimeIconTree,
} from '@/shared/lib/mimeIconList'
import { isValidElement, type FC } from 'react'

interface MimeIconProps {
  mimetype: string
}

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
  if (isValidElement(node)) return node
  if (!(isMimeApplicationType(type) && group === MimeGroupsEnum.APPLICATION))
    return mimeIconTree[MimeGroupsEnum.DEFAULT]
  return mimeIconTree[MimeGroupsEnum.APPLICATION][type]
}

const splitMime = (mime: string) => {
  const splittedMime = mime.split('/')

  return { group: splittedMime[0], type: splittedMime[1] }
}

export const MimeIcon: FC<MimeIconProps> = ({ mimetype }) => {
  const icon = getIcon(splitMime(mimetype))

  return <>{icon}</>
}
