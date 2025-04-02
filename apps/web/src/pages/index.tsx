import { Heading, Text, Box, Container, Button, VStack, HStack, Flex } from '@chakra-ui/react';
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
      <Container maxW="container.lg">
        <Flex
          direction="column"
          align="center"
          justify="center"
          minH="calc(100vh - 64px)"
          textAlign="center"
        >
          <VStack spacing={4}>
            <Heading as="h1" size="xl" mb={2}>
              AI 최적화 풀스택 애플리케이션
            </Heading>
            <Heading as="h2" size="md" color="gray.600" mb={2}>
              Next.js + Refine + NestJS + Prisma
            </Heading>
            <Text color="gray.600" maxW="600px" mb={8}>
              이 애플리케이션은 AI 친화적인 구조로 설계되었습니다. 타입스크립트 기반의 엔드-투-엔드 타입 안전성을 보장하며,
              Refine 프레임워크를 통해 관리자 패널 기능을 제공합니다.
            </Text>
            <HStack spacing={4}>
              <Button 
                colorScheme="blue" 
                size="lg" 
                onClick={() => router.push('/users')}
              >
                사용자 관리
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => router.push('/login')}
              >
                로그인
              </Button>
            </HStack>
          </VStack>
        </Flex>
      </Container>
    </>
  )
} 