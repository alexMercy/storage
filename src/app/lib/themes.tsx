import { theme } from 'antd'

export const themes: Record<string, any> = {
  light: {
    token: {
      colorPrimary: '#85bd3f',
      colorInfo: '#85bd3f',
      colorTextBase: '#1e1e1e',
      borderRadius: 16,
      wireframe: false,
      colorPrimaryBg: '#f6fde1',
    },
    components: {
      Button: {
        colorFillTertiary: 'rgba(140,255,0,0.1)',
      },
      Divider: {
        lineWidth: 5,
      },
      Menu: {
        itemHoverBg: 'rgb(248,252,237)',
      },
      Cascader: {
        controlItemBgHover: 'rgb(248,252,237)',
      },
    },
  },
  dark: {
    algorithm: theme.darkAlgorithm,
  },
}
