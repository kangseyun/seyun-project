#!/bin/bash

# DB-SETUP-SCRIPT
# 데이터베이스 컨테이너 실행, 마이그레이션 적용 및 초기 데이터 생성

set -e

# 색상 정의
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 함수 정의
print_step() {
  echo -e "${GREEN}==>${NC} $1"
}

print_info() {
  echo -e "${YELLOW}INFO:${NC} $1"
}

print_error() {
  echo -e "${RED}ERROR:${NC} $1"
}

# Docker Compose 실행 확인
if ! command -v docker-compose &> /dev/null; then
  print_error "Docker Compose를 찾을 수 없습니다. 설치 여부를 확인하세요."
  exit 1
fi

# 환경 변수 파일 확인
if [ ! -f .env ]; then
  print_info ".env 파일이 없습니다. .env.example에서 복사합니다."
  cp .env.example .env
fi

# PostgreSQL 컨테이너 실행
print_step "PostgreSQL 컨테이너 시작 중..."
docker-compose up -d postgres

# 컨테이너가 준비될 때까지 기다림
print_step "데이터베이스 준비 대기 중..."
sleep 5

# Prisma 마이그레이션 실행
print_step "Prisma 마이그레이션 실행 중..."
cd apps/api && npx prisma migrate dev --name initial

# Prisma 클라이언트 생성
print_step "Prisma 클라이언트 생성 중..."
cd apps/api && npx prisma generate

# 초기 데이터 시드 (옵션)
if [ "$1" == "--seed" ]; then
  print_step "초기 데이터 시드 중..."
  cd apps/api && npx prisma db seed
fi

print_step "데이터베이스 설정이 완료되었습니다!"
print_info "다음 명령어로 개발 서버를 실행하세요: npm run dev" 