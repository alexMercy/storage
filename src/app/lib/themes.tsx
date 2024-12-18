import { theme, ThemeConfig } from 'antd'

const primary = '#85bd3f'

const themeBase: ThemeConfig = {
  token: {
    colorPrimary: primary,
    colorInfo: primary,

    borderRadius: 10,
    wireframe: false,
    fontFamily: '"Open Sans", sans-serif',
    fontWeightStrong: 700,
  },
  components: {
    Layout: {
      headerHeight: 64,
    },
    Divider: {
      lineWidth: 2,
      colorSplit: 'rgb(56 56 56 / 23%)',
    },
  },
}

export const themes: Record<string, ThemeConfig> = {
  light: {
    token: {
      ...themeBase.token,
      colorPrimaryBg: '#e5fda8',
      colorTextBase: '#1e1e1e',
    },
    components: {
      Layout: {
        ...themeBase.components?.Layout,
        siderBg: 'rgb(245,245,245)',
        headerBg: 'rgb(245,245,245)',
      },
      Divider: {
        ...themeBase.components?.Divider,
      },
      Button: {
        primaryColor: 'white',
      },
    },
  },
  dark: {
    token: {
      ...themeBase.token,
      colorPrimaryBg: '#1b2215',
    },
    components: {
      Layout: {
        ...themeBase.components?.Layout,
        siderBg: 'rgb(27, 27, 27)',
        headerBg: 'rgb(27, 27, 27)',
      },
      Divider: {
        ...themeBase.components?.Divider,
      },
      Button: {
        primaryColor: 'black',
      },
    },
    algorithm: theme.darkAlgorithm,
  },
}
