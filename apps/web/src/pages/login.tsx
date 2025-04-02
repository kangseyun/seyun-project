import React from "react";
import { useLogin } from "@refinedev/core";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Text,
  Container,
  Flex,
  Stack,
  Card,
  CardBody,
  CardHeader,
} from "@chakra-ui/react";

/**
 * 사용자 로그인 페이지 컴포넌트
 * Refine의 useLogin 훅을 사용하여 인증 처리
 */
export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();
  const { mutate: login } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(
      { email, password },
      {
        onSuccess: () => {
          // 로그인 성공 시 대시보드로 리다이렉트
          router.push("/dashboard");
        },
        onError: (error) => {
          // 에러 처리는 나중에 구현
          console.error("로그인 실패:", error);
        },
      }
    );
  };

  return (
    <Container maxW="md" py={10}>
      <Flex direction="column" align="center">
        <Card w="100%" shadow="md" borderRadius="lg">
          <CardHeader pb={0}>
            <Heading size="lg" textAlign="center">로그인</Heading>
          </CardHeader>
          <CardBody>
            <Box as="form" onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <FormControl isRequired>
                  <FormLabel htmlFor="email">이메일 주소</FormLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="이메일을 입력하세요"
                    autoComplete="email"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel htmlFor="password">비밀번호</FormLabel>
                  <Input
                    id="password"
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  />
                </FormControl>
                <Button
                  type="submit"
                  colorScheme="blue"
                  size="md"
                  w="100%"
                  mt={4}
                >
                  로그인
                </Button>
                <Flex justify="flex-end">
                  <Text
                    fontSize="sm" 
                    color="gray.500"
                    cursor="pointer"
                    onClick={() => router.push("/register")}
                  >
                    계정이 없으신가요? 회원가입
                  </Text>
                </Flex>
              </Stack>
            </Box>
          </CardBody>
        </Card>
      </Flex>
    </Container>
  );
} 