# 데이터베이스 설정 가이드

## 개요

이 프로젝트는 PostgreSQL 데이터베이스와 Prisma ORM을 사용합니다. Docker를 통해 데이터베이스를 쉽게 설정하고 관리할 수 있습니다.

## 설정 방법

### 사전 요구사항

- [Docker](https://www.docker.com/products/docker-desktop) 설치
- [Node.js](https://nodejs.org/) 16 이상 설치

### 초기 설정

1. 환경 변수 설정:
   ```bash
   cp .env.example .env
   ```

2. 데이터베이스 컨테이너 실행 및 초기화:
   ```bash
   npm run db:setup
   ```

3. (선택사항) 초기 데이터 추가:
   ```bash
   npm run db:seed
   ```

### Prisma Studio 실행

데이터베이스를 GUI로 관리하려면:
```bash
npm run db:studio
```

## 데이터 모델

이 프로젝트는 다음과 같은 주요 데이터 모델을 사용합니다:

### User

사용자 계정 정보를 저장합니다.
```prisma
model User {
  id        String    @id @default(uuid())
  email     String    @unique
  password  String
  name      String
  role      Role      @default(USER)
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  profile   Profile?
  posts     Post[]
}
```

### Profile

사용자의 추가 정보를 저장합니다.
```prisma
model Profile {
  id        String   @id @default(uuid())
  bio       String?
  avatar    String?
  phone     String?
  address   String?
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId    String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Post

사용자가 작성한 게시물을 저장합니다.
```prisma
model Post {
  id        String    @id @default(uuid())
  title     String
  content   String
  published Boolean   @default(false)
  author    User      @relation(fields: [authorId], references: [id])
  authorId  String
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  comments  Comment[]
}
```

### Comment

게시물에 대한 댓글을 저장합니다.
```prisma
model Comment {
  id        String   @id @default(uuid())
  content   String
  post      Post     @relation(fields: [postId], references: [id], onDelete: Cascade)
  postId    String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 개발 워크플로우

1. 모델 변경시 Prisma 스키마 업데이트:
   ```bash
   cd apps/api && npx prisma format
   ```

2. 마이그레이션 생성:
   ```bash
   cd apps/api && npx prisma migrate dev --name [migration-name]
   ```

3. 타입 재생성:
   ```bash
   cd apps/api && npx prisma generate
   ```

## 테스트 계정

초기 데이터 시드를 실행하면 다음 계정이 생성됩니다:

- 관리자: admin@example.com / admin123
- 일반 사용자: user@example.com / user123 