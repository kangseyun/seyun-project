import { Typography, Box, Container, Button } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>AI 최적화 풀스택 애플리케이션</title>
        <meta name="description" content="AI 최적화 풀스택 애플리케이션" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 'calc(100vh - 64px)',
            gap: 4,
            textAlign: 'center',
          }}
        >
          <Typography variant="h3" component="h1" gutterBottom>
            AI 최적화 풀스택 애플리케이션
          </Typography>
          <Typography variant="h5" component="h2" color="text.secondary" gutterBottom>
            Next.js + Refine + NestJS + Prisma
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mb: 4 }}>
            이 애플리케이션은 AI 친화적인 구조로 설계되었습니다. 타입스크립트 기반의 엔드-투-엔드 타입 안전성을 보장하며,
            Refine 프레임워크를 통해 관리자 패널 기능을 제공합니다.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              variant="contained" 
              size="large" 
              onClick={() => router.push('/users')}
            >
              사용자 관리
            </Button>
            <Button 
              variant="outlined" 
              size="large" 
              onClick={() => router.push('/login')}
            >
              로그인
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  )
} 