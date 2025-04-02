import type { AppProps } from 'next/app';
import { Refine } from '@refinedev/core';
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar';
import routerProvider from '@refinedev/nextjs-router';
import dataProvider from '@refinedev/simple-rest';
import { ChakraProvider } from '@chakra-ui/react';
import { API_ENDPOINTS } from 'shared/constants';
import { Layout } from '@/components/layout';
import { AuthProvider } from '@/contexts/auth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { theme, dashboardTheme } from '@/utils/theme';

// React Query 클라이언트 생성
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
});

// 대시보드 컴포넌트를 동적 임포트
const DashboardLayout = dynamic(() => import('@/pages/dashboard'), { 
  ssr: false,
  loading: () => <div>Loading...</div>
});

type MyAppProps = AppProps & {
  emotionCache?: any;
};

function MyApp({ 
  Component, 
  pageProps,
  router
}: MyAppProps) {
  // 대시보드 관련 페이지 확인
  const isDashboard = router.pathname === '/dashboard';
  const isDashboardRelatedPage = 
    router.pathname.startsWith('/agents') ||
    router.pathname.startsWith('/workflow-runs') ||
    router.pathname.startsWith('/workflows') ||
    router.pathname.startsWith('/settings/workflow') ||
    router.pathname === '/workflow-builder';

  // 페이지 유형에 따라 적절한 테마 선택
  const currentTheme = isDashboard || isDashboardRelatedPage ? dashboardTheme : theme;

  return (
    <ChakraProvider theme={currentTheme}>
      <QueryClientProvider client={queryClient}>
        <RefineKbarProvider>
          <RefineKbar />
          <AuthProvider>
            <Refine
              routerProvider={routerProvider}
              dataProvider={dataProvider(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001')}
              authProvider={undefined} // will be provided by AuthProvider context
              resources={[
                {
                  name: 'users',
                  list: '/users',
                  show: '/users/:id',
                  create: '/users/create',
                  edit: '/users/:id/edit',
                },
              ]}
              options={{
                syncWithLocation: true,
                reactQuery: {
                  devtoolConfig: false,
                },
              }}
            >
              {isDashboard ? (
                <Component {...pageProps} />
              ) : isDashboardRelatedPage ? (
                // 대시보드 관련 페이지는 대시보드 레이아웃 내에서 렌더링
                <DashboardLayout>
                  <Component {...pageProps} />
                </DashboardLayout>
              ) : (
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              )}
            </Refine>
          </AuthProvider>
        </RefineKbarProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp; 