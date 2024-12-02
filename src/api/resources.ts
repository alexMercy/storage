import {
  getFolder as backGetFolder,
  updateFolder as backUpdateBolder,
  createFolder,
  FolderBody,
} from '@/db/folderApi'
import {
  deleteResources as backDeleteResources,
  downloadResources as backDownloadResources,
  getResource as backGetResource,
} from '@/db/resourceApi'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

// #region MOCK RESPONSES

//MOCK WRAPPER
const promiseWrap = <T extends unknown[], R>(
  callback: (...args: T) => R,
  ...args: T
): Promise<R> => {
  return Promise.resolve(callback(...args))
}

const getFolder = (uuid: string) => promiseWrap(backGetFolder, uuid)

const updateFolder = (uuid: string, body: FolderBody) =>
  promiseWrap(backUpdateBolder, uuid, body)

const deleteResource = (uuids: string[]) =>
  promiseWrap(backDeleteResources, uuids)

const getResource = (uuid: string) => promiseWrap(backGetResource, uuid)

const createResource = (body: FolderBody) => promiseWrap(createFolder, body)

const downloadResources = (uuids: string[]) =>
  promiseWrap(backDownloadResources, uuids)

// #endregion

// #region QUERIES
export const useFolder = (uuid: string, enabled = true) =>
  useQuery({
    queryKey: ['resources', uuid, enabled],
    queryFn: () => getFolder(uuid),
    enabled: !!uuid && enabled,
  })

export const useResource = (uuid: string, enabled = true) =>
  useQuery({
    queryKey: ['resource', uuid, enabled],
    queryFn: () => getResource(uuid),
    enabled: !!uuid && enabled,
  })

export const useCreateResource = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (body: FolderBody) => createResource(body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['resources'] })
    },
  })
}

export interface UpdateFolderVariables {
  uuid: string
  body: FolderBody
}

export const useUpdateFolder = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (value: UpdateFolderVariables) =>
      updateFolder(value.uuid, value.body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['resources'] })
    },
  })
}

export const useDeleteResources = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (uuids: string[]) => deleteResource(uuids),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['resources'] })
    },
  })
}

export const useDownloadResources = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (uuids: string[]) => downloadResources(uuids),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['resources'] })
    },
  })
}

// #endregion
