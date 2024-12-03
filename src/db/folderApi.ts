import {
  findResource,
  Folder,
  FolderResources,
  getChildResources,
  getParentPath,
  paths,
  RESOURCE_TYPES,
  rootDB,
  rootFolder,
  updateStructures,
} from '@/db/resource'
import { v4 } from 'uuid'

export const getFolder = (uuid: string): FolderResources => {
  const path = uuid !== 'root' ? paths[uuid] : [rootFolder.uuid]

  if (!path) throw new Error('UUID not found')

  const folder = findResource(path)
  const parentPath = getParentPath(path)

  return {
    parentPath,
    title: folder.title,
    resources: getChildResources(path) ?? [],
  }
}

export type FolderBody = Omit<Folder, 'uuid' | 'type'>

export const createFolder: (body: FolderBody) => Folder = ({
  title,
  parent: parentProp,
}) => {
  const parent = parentProp !== 'root' ? parentProp : rootFolder.uuid

  const path = parentProp !== 'root' ? paths[parentProp] : [rootFolder.uuid]

  console.log({ title, parentProp }, parent)

  if (!path) throw new Error('Parent not found')

  const folder: Folder = {
    parent,
    uuid: v4(),
    type: RESOURCE_TYPES.FOLDER,
    title,
  }
  rootDB.push(folder)
  updateStructures()
  return folder
}

export const updateFolder = (uuid: string, body: FolderBody) => {
  let resource = undefined
  let index = -1

  for (let i = 0; i < rootDB.length; i++) {
    if (rootDB[i].uuid !== uuid) continue
    resource = rootDB[i]
    index = i
    break
  }

  if (index === -1 || !resource) throw new Error('Resource not found')

  const newFolder = {
    ...resource,
    ...body,
  }

  rootDB.splice(index, 1, newFolder)

  updateStructures()

  return newFolder
}
