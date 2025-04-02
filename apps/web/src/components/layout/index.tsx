import React from 'react';
import { Box, AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { useRouter } from 'next/router';
import MenuIcon from '@mui/icons-material/Menu';
import { useIsAuthenticated } from '@refinedev/core';

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const { data: isAuthenticated } = useIsAuthenticated();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => router.push('/')}>
            AI 최적화 풀스택 앱
          </Typography>
          {isAuthenticated ? (
            <Button color="inherit" onClick={() => router.push('/logout')}>로그아웃</Button>
          ) : (
            <Button color="inherit" onClick={() => router.push('/login')}>로그인</Button>
          )}
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ p: 3 }}>
        {children}
      </Box>
    </Box>
  );
}; 