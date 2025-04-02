/**
 * PRISMA-SEED
 * 개발 환경을 위한 초기 데이터 생성 스크립트
 */
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 기존 데이터 삭제 (개발 환경에서만 사용)
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.user.deleteMany();

  console.log('Creating admin user...');
  
  // 관리자 계정 생성
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      name: '관리자',
      password: adminPassword,
      role: 'ADMIN',
      profile: {
        create: {
          bio: '시스템 관리자입니다.',
          avatar: 'https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff',
        },
      },
    },
  });

  console.log('Creating regular user...');
  
  // 일반 사용자 계정 생성
  const userPassword = await bcrypt.hash('user123', 10);
  const user = await prisma.user.create({
    data: {
      email: 'user@example.com',
      name: '테스트 사용자',
      password: userPassword,
      role: 'USER',
      profile: {
        create: {
          bio: '테스트 사용자입니다.',
          avatar: 'https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff',
        },
      },
    },
  });

  console.log('Creating sample posts...');
  
  // 샘플 게시물 생성
  const post1 = await prisma.post.create({
    data: {
      title: '첫 번째 게시물',
      content: '안녕하세요! 이것은 첫 번째 게시물입니다.',
      published: true,
      authorId: admin.id,
    },
  });

  const post2 = await prisma.post.create({
    data: {
      title: '두 번째 게시물',
      content: '안녕하세요! 이것은 두 번째 게시물입니다.',
      published: true,
      authorId: user.id,
    },
  });

  console.log('Creating sample comments...');
  
  // 샘플 댓글 생성
  await prisma.comment.create({
    data: {
      content: '멋진 게시물입니다!',
      postId: post1.id,
    },
  });

  await prisma.comment.create({
    data: {
      content: '좋은 내용이네요!',
      postId: post2.id,
    },
  });

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 