import { useIsSearchModalVisible } from '@/features/Explorer/lib/useIsSearchModalVisible'
import searchExplorerStyles from '@/features/Explorer/ui/SearchExplorer/SearchExplorer.css'
import { SearchOutlined } from '@ant-design/icons'
import { AutoComplete, Button, Input, InputRef, Modal, Tag } from 'antd'
import useToken from 'antd/es/theme/useToken'
import { useEffect, useRef, type FC } from 'react'
import { useTranslation } from 'react-i18next'

interface SearchExplorerProps {}

export const SearchExplorer: FC<SearchExplorerProps> = () => {
  const { isSearch, setSearch } = useIsSearchModalVisible()
  const { t } = useTranslation()
  const baseToken = useToken()[1]
  const styles = searchExplorerStyles(baseToken)
  const searchRef = useRef<InputRef | null>(null)

  const options = [
    {
      value: '1',
      label: 'one',
    },
  ]

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
        <Tag bordered={false} css={styles.tag}>
          Ctrl+K
        </Tag>
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
          // onSelect={onSelect}
          // onSearch={handleSearch}
        >
          <Input
            ref={searchRef}
            placeholder="input here"
            prefix={<SearchOutlined />}
          />
        </AutoComplete>
      </Modal>
    </>
  )
}
