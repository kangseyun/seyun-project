import React from "react";
import { useRegister } from "@refinedev/core";
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
 * 사용자 회원가입 페이지 컴포넌트
 */
export default function Register() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const router = useRouter();
  const { mutate: register } = useRegister();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register(
      { email, password, name },
      {
        onSuccess: () => {
          // 회원가입 성공 시 로그인 페이지로 리다이렉트
          router.push("/login");
        },
        onError: (error: any) => {
          // 에러 처리는 나중에 구현
          console.error("회원가입 실패:", error);
        },
      }
    );
  };

  return (
    <Container maxW="md" py={10}>
      <Flex direction="column" align="center">
        <Card w="100%" shadow="md" borderRadius="lg">
          <CardHeader pb={0}>
            <Heading size="lg" textAlign="center">회원가입</Heading>
          </CardHeader>
          <CardBody>
            <Box as="form" onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <FormControl isRequired>
                  <FormLabel htmlFor="name">이름</FormLabel>
                  <Input
                    id="name"
                    placeholder="이름을 입력하세요"
                    autoComplete="name"
                    value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                  />
                </FormControl>
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
                    autoComplete="new-password"
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
                  회원가입
                </Button>
                <Flex justify="flex-end">
                  <Text
                    fontSize="sm" 
                    color="gray.500"
                    cursor="pointer"
                    onClick={() => router.push("/login")}
                  >
                    이미 계정이 있으신가요? 로그인
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