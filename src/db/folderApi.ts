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

export const updateFolder = (uuid: string, body: FolderBody): Folder => {
  const path = uuid !== 'root' ? paths[uuid] : [rootFolder.uuid]
  const parent = body.parent !== 'root' ? body.parent : rootFolder.uuid

  console.log(body, parent)

  if (!path) throw new Error('Path not found')

  const folderIndex = rootDB.findIndex((folder) => folder.uuid === uuid)

  const newFolder: Folder = {
    ...findResource(path),
    type: RESOURCE_TYPES.FOLDER,
    parent,
    title: body.title,
  }

  rootDB.splice(folderIndex, 1, newFolder)

  updateStructures()

  return newFolder
}
