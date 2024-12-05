import { useSearchResource } from '@/api/resources'
import { Resource, RESOURCE_TYPES } from '@/db/resource'
import { useIsSearchModalVisible } from '@/features/Explorer/lib/useIsSearchModalVisible'
import searchExplorerStyles from '@/features/Explorer/ui/SearchExplorer/SearchExplorer.css'
import { HotKeyTag } from '@/shared'
import {
  FileOutlined,
  FolderFilled,
  LoadingOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import { css } from '@emotion/react'
import { AutoComplete, Button, Input, InputRef, Modal } from 'antd'
import useToken from 'antd/es/theme/useToken'
import { debounce } from 'lodash'
import { useEffect, useMemo, useRef, useState, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const getOptions = (searchOptions: Resource[]) => {
  return searchOptions.map((resource) => {
    const value =
      resource.type === RESOURCE_TYPES.FOLDER ? resource.uuid : resource.parent

    const icon =
      resource.type === RESOURCE_TYPES.FOLDER ? (
        <FolderFilled />
      ) : (
        <FileOutlined />
      )
    return {
      value: [value],
      label: (
        <div css={css({ display: 'flex', gap: '5px' })}>
          {icon}
          {resource.title}
        </div>
      ),
    }
  })
}

export const SearchExplorer: FC = () => {
  const { isSearch, setSearch } = useIsSearchModalVisible()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const baseToken = useToken()[1]
  const styles = searchExplorerStyles(baseToken)

  const [searchText, setSearchText] = useState('')
  const searchRef = useRef<InputRef | null>(null)
  const { data: searchOptions, isFetching } = useSearchResource(
    searchText,
    !!searchText
  )

  const options = useMemo(
    () => (searchOptions ? getOptions(searchOptions) : []),
    [searchOptions]
  )

  const onSelect = (value: unknown) => {
    if (!Array.isArray(value)) throw new Error('wrong value')

    const { input } = searchRef.current!
    input!.value = ''
    input!.disabled = true
    setSearch(false)
    navigate(`/disk/${value[0]}`)
    console.log(value)
  }

  const debouncedSetSearchValue = debounce(setSearchText, 200)
  const handleSearch = (text: string) => {
    debouncedSetSearchValue(text)
  }

  useEffect(() => {
    setTimeout(() => {
      searchRef.current?.focus()
    })
  }, [isSearch])

  return (
    <>
      <Button
        color="default"
        variant="filled"
        iconPosition="start"
        shape="round"
        onClick={() => setSearch(true)}
        css={styles.triggerButton}
      >
        <div css={styles.searchInnerWrapper}>
          <SearchOutlined style={{ fontSize: 18 }} />
          {t('search')}
        </div>
        <HotKeyTag text="Ctrl+K" />
      </Button>
      <Modal
        destroyOnClose
        width={700}
        open={isSearch}
        onCancel={() => setSearch(false)}
        footer={false}
        closeIcon={null}
      >
        <AutoComplete
          style={{ width: '100%' }}
          options={options}
          onSelect={onSelect}
          onSearch={handleSearch}
        >
          <Input
            size="large"
            variant="filled"
            ref={searchRef}
            prefix={isFetching ? <LoadingOutlined spin /> : <SearchOutlined />}
          />
        </AutoComplete>
      </Modal>
    </>
  )
}
