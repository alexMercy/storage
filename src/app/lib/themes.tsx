import { theme, ThemeConfig } from 'antd'

const themeBase: ThemeConfig = {
  token: {
    colorPrimary: '#85bd3f',
    colorInfo: '#85bd3f',
    borderRadius: 10,
    wireframe: false,
    fontFamily: '"Open Sans", sans-serif',
  },
  components: {
    Layout: {
      headerHeight: 64,
    },
  },
}

export const themes: Record<string, ThemeConfig> = {
  light: {
    token: {
      ...themeBase.token,
      colorTextBase: '#1e1e1e',
    },
    components: {
      Layout: {
        ...themeBase.components?.Layout,
        siderBg: 'rgb(245,245,245)',
        headerBg: 'rgb(245,245,245)',
      },
    },
  },
  dark: {
    token: {
      ...themeBase.token,
    },
    components: {
      Layout: {
        ...themeBase.components?.Layout,
        siderBg: 'rgb(27, 27, 27)',
        headerBg: 'rgb(27, 27, 27)',
      },
    },
    algorithm: theme.darkAlgorithm,
  },
}
