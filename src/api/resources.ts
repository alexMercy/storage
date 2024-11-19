import { createFolder, getItems } from '@/api/resource'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const getRes = (uuid: string) => Promise.resolve(getItems(uuid))

const createRes = (value: { title: string; parent: string }) =>
  Promise.resolve(createFolder(value.title, value.parent))

export const useResources = (uuid: string) =>
  useQuery({
    queryKey: ['resources', uuid],
    queryFn: () => getRes(uuid),
    enabled: !!uuid,
  })

export const useCreateResource = () => {
  const qc = useQueryClient()
  useMutation({
    mutationFn: (value: { title: string; parent: string }) => createRes(value),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['resources'] })
    },
  })
}
