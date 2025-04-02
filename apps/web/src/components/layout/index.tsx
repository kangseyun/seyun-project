import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Button,
  IconButton,
  HStack,
  Container,
  useColorMode,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useIsAuthenticated } from '@refinedev/core';
import { theme } from '@/utils/theme';

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const { data: isAuthenticated } = useIsAuthenticated();
  const { colorMode } = useColorMode();

  // 테마 색상
  const headerBg = theme.colors.brand[500];
  const headerColor = 'white';

  return (
    <Box>
      <Box as="header" bg={headerBg} color={headerColor} py={2} boxShadow="md">
        <Container maxW="container.xl">
          <Flex align="center" justify="space-between">
            <HStack spacing={4}>
              <IconButton
                aria-label="메뉴"
                icon={<HamburgerIcon />}
                variant="ghost"
                color={headerColor}
                _hover={{ bg: theme.colors.brand[600] }}
                size="md"
              />
              <Heading 
                size="md" 
                cursor="pointer" 
                onClick={() => router.push('/')}
              >
                AI 최적화 풀스택 앱
              </Heading>
            </HStack>
            {isAuthenticated ? (
              <Button 
                variant="ghost" 
                _hover={{ bg: theme.colors.brand[600] }}
                onClick={() => router.push('/logout')}
              >
                로그아웃
              </Button>
            ) : (
              <Button 
                variant="ghost" 
                _hover={{ bg: theme.colors.brand[600] }}
                onClick={() => router.push('/login')}
              >
                로그인
              </Button>
            )}
          </Flex>
        </Container>
      </Box>
      <Box as="main" p={5}>
        <Container maxW="container.xl">
          {children}
        </Container>
      </Box>
    </Box>
  );
}; 