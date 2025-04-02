import { extendTheme, ThemeConfig } from '@chakra-ui/react';

// 테마 설정
const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

// 공통 색상 정의
const colors = {
  brand: {
    50: '#e6f7ff',
    100: '#bae7ff',
    500: '#1890ff',
    600: '#0c7cd5',
    700: '#0053a3',
  },
  primary: '#1890ff',
  accent: '#6366f1',
  success: {
    light: '#10b981',
    dark: '#10e88a',
  },
  warning: {
    light: '#f59e0b',
    dark: '#ffb946',
  },
  error: {
    light: '#ef4444',
    dark: '#ff5e5e',
  },
  dark: {
    bg: '#0a0e17',
    cardBg: '#141b2d',
    accent: '#5a67f2',
    text: '#f8fafc',
    subText: '#9ea7c3',
    border: '#252e3f',
  },
  light: {
    bg: '#f8fafc',
    cardBg: '#ffffff',
    accent: '#5a67f2',
    text: '#1e293b',
    subText: '#64748b',
    border: '#e2e8f0',
  },
  workflow: {
    bgColor: '#121826',
    secondaryBgColor: '#1c2536',
    borderColor: '#2d3748',
    textColor: '#e2e8f0',
    accentColor: '#6366f1',
    agentCardBg: '#1d2535',
  },
};

// 글꼴 정의
const fonts = {
  heading: '"Pretendard", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  body: '"Pretendard", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

// 글로벌 스타일
const styles = {
  global: (props: any) => ({
    body: {
      bg: props.colorMode === 'dark' ? 'dark.bg' : 'gray.50',
      margin: 0,
      padding: 0,
      minHeight: '100vh',
      fontFamily: fonts.body,
    },
  }),
};

// 컴포넌트별 스타일 재정의
const components = {
  Button: {
    baseStyle: {
      fontWeight: '500',
      borderRadius: '6px',
      _focus: {
        boxShadow: `0 0 0 2px ${colors.accent}30`,
      },
    },
    variants: {
      outline: (props: any) => ({
        color: props.colorMode === 'dark' ? 'white' : 'gray.700',
        borderColor: props.colorMode === 'dark' ? '#4f5d7e' : '#cbd5e1',
        _hover: {
          bg: props.colorMode === 'dark' ? '#ffffff10' : '#00000010',
        },
      }),
      solid: {
        _hover: {
          opacity: 0.9,
        },
      },
    },
  },
  Badge: {
    baseStyle: {
      fontWeight: '500',
      fontSize: '11px',
    },
  },
  Text: {
    baseStyle: {
      fontSize: '14px',
    },
  },
  IconButton: {
    baseStyle: {
      borderRadius: '8px',
    },
  },
};

// 기본 테마
export const theme = extendTheme({
  config,
  colors,
  fonts,
  styles,
  components,
});

// 대시보드 전용 테마
export const dashboardTheme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  colors,
  fonts,
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'dark.bg' : 'light.bg',
        margin: 0,
        padding: 0,
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        fontFamily: fonts.body,
        fontSize: '14px',
      },
    }),
  },
  components,
});

// 워크플로우 전용 테마
export const workflowTheme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  colors,
  fonts,
  styles: {
    global: {
      body: {
        bg: colors.workflow.bgColor,
        color: colors.workflow.textColor,
        margin: 0,
        padding: 0,
        minHeight: '100vh',
        fontFamily: fonts.body,
      },
    },
  },
  components,
});

// 테마 유틸리티 함수
export const getThemeColors = (colorMode: 'light' | 'dark') => {
  return {
    bgColor: colorMode === 'dark' ? colors.dark.bg : colors.light.bg,
    cardBgColor: colorMode === 'dark' ? colors.dark.cardBg : colors.light.cardBg,
    accentColor: colors.accent,
    successColor: colorMode === 'dark' ? colors.success.dark : colors.success.light,
    warningColor: colorMode === 'dark' ? colors.warning.dark : colors.warning.light,
    errorColor: colorMode === 'dark' ? colors.error.dark : colors.error.light,
    textColor: colorMode === 'dark' ? colors.dark.text : colors.light.text,
    subTextColor: colorMode === 'dark' ? colors.dark.subText : colors.light.subText,
    borderColor: colorMode === 'dark' ? colors.dark.border : colors.light.border,
  };
}; 