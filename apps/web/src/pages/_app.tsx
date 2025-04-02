import type { AppProps } from 'next/app';
import { Refine } from '@refinedev/core';
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar';
import routerProvider from '@refinedev/nextjs-router';
import dataProvider from '@refinedev/simple-rest';
import { CssBaseline, GlobalStyles } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { API_ENDPOINTS } from 'shared/constants';
import { createEmotionCache } from '@/utils/createEmotionCache';
import { theme } from '@/utils/theme';
import { Layout } from '@/components/layout';
import { AuthProvider } from '@/contexts/auth';

// Client-side cache for emotion, shared between page renders
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp({ 
  Component, 
  pageProps, 
  emotionCache = clientSideEmotionCache 
}: MyAppProps) {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <RefineKbarProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: 'auto' } }} />
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
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </Refine>
          </AuthProvider>
        </RefineKbarProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp; 