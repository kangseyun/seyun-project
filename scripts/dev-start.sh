#!/bin/bash

# DEV-START-SCRIPT
# 개발 환경의 모든 서비스(DB, 백엔드, 프론트엔드)를 한번에 시작하는 스크립트

set -e

# 색상 정의
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 함수 정의
print_header() {
  echo -e "\n${BLUE}===== $1 =====${NC}\n"
}

print_step() {
  echo -e "${GREEN}==>${NC} $1"
}

print_info() {
  echo -e "${YELLOW}INFO:${NC} $1"
}

print_error() {
  echo -e "${RED}ERROR:${NC} $1"
}

# 환경 변수 파일 확인
if [ ! -f .env ]; then
  print_info ".env 파일이 없습니다. .env.example에서 복사합니다."
  cp .env.example .env
fi

# 1. PostgreSQL 데이터베이스 시작
print_header "데이터베이스 시작"
if ! docker ps | grep -q ai-optimized-postgres; then
  print_step "PostgreSQL 컨테이너 시작 중..."
  docker-compose up -d postgres
  
  # 컨테이너가 준비될 때까지 기다림
  print_step "데이터베이스 준비 대기 중..."
  sleep 5
else
  print_info "PostgreSQL 컨테이너가 이미 실행 중입니다."
fi

# 2. Prisma 마이그레이션 확인
print_header "데이터베이스 마이그레이션 확인"
cd apps/api

if [ ! -d "prisma/migrations" ] || [ -z "$(ls -A prisma/migrations 2>/dev/null)" ]; then
  print_step "초기 마이그레이션 실행 중..."
  npx prisma migrate dev --name initial
else
  print_step "마이그레이션 적용 중..."
  npx prisma migrate dev
fi

# 3. Prisma 클라이언트 생성
print_step "Prisma 클라이언트 생성 중..."
npx prisma generate

# 4. 시드 데이터 확인
read -p "초기 데이터를 로드하시겠습니까? (y/n): " load_seed
if [[ $load_seed == "y" || $load_seed == "Y" ]]; then
  print_step "초기 데이터 로드 중..."
  npx prisma db seed
fi

# 5. 개발 서버 실행 (백그라운드로 실행)
cd ../..
print_header "개발 서버 시작"
print_info "개발 서버가 시작되면 다음 URL로 접속할 수 있습니다:"
print_info "- 프론트엔드: http://localhost:3000"
print_info "- 백엔드 API: http://localhost:3001"
print_info "- Swagger API 문서: http://localhost:3001/api-docs"
print_info "- Prisma Studio: http://localhost:5555 (별도 실행 필요: npm run db:studio)"

print_step "개발 서버 시작 중..."
npm run dev

# 스크립트 종료 시 처리
trap ctrl_c INT
function ctrl_c() {
  print_header "개발 서버 종료"
  print_info "개발 서버를 종료합니다."
  exit 0
} 