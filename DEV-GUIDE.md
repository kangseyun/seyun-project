# 개발 환경 가이드

## 개요

이 문서는 AI-최적화 풀스택 프로젝트의 개발 환경을 설정하고 실행하는 방법을 안내합니다.

## 사전 요구사항

- [Docker](https://www.docker.com/products/docker-desktop) - 데이터베이스 컨테이너용
- [Node.js](https://nodejs.org/) 18 이상
- [npm](https://www.npmjs.com/) 9 이상

## 설치 방법

1. 저장소 클론:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. 의존성 설치:
   ```bash
   npm install
   ```

## 개발 환경 실행

### 원클릭 시작 (모든 서비스)

모든 서비스(데이터베이스, 백엔드, 프론트엔드)를 한 번에 시작하려면:

```bash
npm run dev:start
```

이 명령은 다음을 수행합니다:
- PostgreSQL 데이터베이스 컨테이너 시작
- Prisma 마이그레이션 및 클라이언트 생성
- 초기 데이터 로드 옵션 제공
- NestJS 백엔드 개발 서버 시작
- Next.js 프론트엔드 개발 서버 시작

### 개별 서비스 실행

각 서비스를 개별적으로 실행하려면:

1. 데이터베이스 설정 및 초기화:
   ```bash
   npm run db:setup
   ```

2. (선택) 초기 데이터 로드:
   ```bash
   npm run db:seed
   ```

3. 개발 서버 실행:
   ```bash
   npm run dev
   ```

4. Prisma Studio 실행 (데이터베이스 GUI):
   ```bash
   npm run db:studio
   ```

## 접속 정보

개발 서버가 시작되면 다음 URL로 접속할 수 있습니다:

- **프론트엔드**: http://localhost:3000
- **백엔드 API**: http://localhost:3001
- **API 문서 (Swagger)**: http://localhost:3001/api-docs
- **Prisma Studio**: http://localhost:5555

## 테스트 계정

시드 데이터를 로드한 경우 다음 계정으로 로그인할 수 있습니다:

- **관리자**: admin@example.com / admin123
- **일반 사용자**: user@example.com / user123

## 문제 해결

### 데이터베이스 연결 오류

데이터베이스 연결 문제가 발생하면:

```bash
# 데이터베이스 컨테이너 상태 확인
docker ps -a

# 컨테이너 로그 확인
docker logs ai-optimized-postgres

# 데이터베이스 컨테이너 재시작
docker-compose restart postgres
```

### Prisma 오류

Prisma 관련 오류가 발생하면:

```bash
# Prisma 클라이언트 재생성
cd apps/api && npx prisma generate

# 데이터베이스 스키마 검증
cd apps/api && npx prisma validate
```

### 기타 문제

의존성 문제가 발생하면:

```bash
# node_modules 삭제 후 재설치
rm -rf node_modules
rm -rf apps/*/node_modules
rm -rf packages/*/node_modules
npm install
``` 