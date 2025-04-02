#!/usr/bin/env node
/**
 * AI-DEV-SYSTEM
 * AI-driven autonomous development workflow
 * 
 * Usage:
 * node scripts/ai-dev.js feature "사용자 프로필 기능 개발"
 * node scripts/ai-dev.js fix "로그인 오류 수정"
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Task templates for AI-driven development
const TASK_TEMPLATES = {
  feature: {
    steps: [
      {
        description: '요구사항 분석 및 구성요소 식별',
        prompt: (featureName) => `분석:
1. "${featureName}" 기능을 구현하기 위해 필요한 구성요소를 식별합니다.
2. 프론트엔드와 백엔드 모두에서 필요한 변경사항을 나열합니다.
3. 기존 코드베이스에서 참조할 수 있는 유사한 패턴을 식별합니다.
4. 필요한 데이터 모델과 API 엔드포인트를 설계합니다.
5. 작업을 세분화된 단계로 나눕니다.`
      },
      {
        description: '백엔드 API 엔드포인트 구현',
        prompt: (featureName) => `백엔드:
1. "${featureName}"에 필요한 Prisma 모델 확장/생성
2. NestJS 컨트롤러와 서비스 구현
3. 앞서 설계한 API 엔드포인트 구현
4. 인증 및 권한 부여 로직 통합
5. 에러 처리 및 유효성 검사 추가`
      },
      {
        description: '프론트엔드 구현',
        prompt: (featureName) => `프론트엔드:
1. "${featureName}"에 필요한 Refine 리소스 구성
2. 필요한 React 컴포넌트 구현
3. API와의 연동 구현
4. UI/UX 디자인 적용
5. 에러 처리 및 로딩 상태 관리`
      },
      {
        description: '테스트 및 통합',
        prompt: (featureName) => `테스트:
1. "${featureName}"에 대한 단위 테스트 작성
2. 통합 테스트 작성
3. 엣지 케이스 및 오류 시나리오 테스트
4. 성능 및 보안 검토`
      }
    ]
  },
  fix: {
    steps: [
      {
        description: '오류 분석 및 진단',
        prompt: (bugDescription) => `진단:
1. "${bugDescription}" 문제의 증상을 정확히 분석합니다.
2. 오류 메시지와 스택 트레이스를 검토합니다.
3. 문제가 발생하는 정확한 조건을 식별합니다.
4. 관련 코드 영역을 검사합니다.
5. 가능한 원인을 나열합니다.`
      },
      {
        description: '해결책 개발',
        prompt: (bugDescription) => `해결:
1. "${bugDescription}" 문제에 대한 해결책 개발
2. 필요한 코드 변경 사항 식별
3. 부작용 없이 변경할 수 있는 최소한의 접근 방식 채택
4. 변경 사항이 다른 부분에 미치는 영향 분석`
      },
      {
        description: '수정 구현 및 테스트',
        prompt: (bugDescription) => `구현:
1. "${bugDescription}" 수정 사항 구현
2. 수정된 코드 테스트
3. 회귀 테스트 실행
4. 수정이 문제를 효과적으로, 완전히 해결했는지 확인`
      }
    ]
  },
  refactor: {
    steps: [
      {
        description: '리팩토링 범위 및 목표 정의',
        prompt: (refactorDescription) => `범위:
1. "${refactorDescription}" 리팩토링의 정확한 범위와 목표 정의
2. 현재 코드의 문제점 및 개선점 식별
3. 리팩토링 후 기대되는 결과 정의
4. 변경해서는 안 되는 동작 명시`
      },
      {
        description: '리팩토링 계획 수립',
        prompt: (refactorDescription) => `계획:
1. "${refactorDescription}" 리팩토링을 위한 단계별 계획 수립
2. 코드 구조 변경 계획
3. 적용할 디자인 패턴 식별
4. 테스트 전략 수립`
      },
      {
        description: '리팩토링 구현',
        prompt: (refactorDescription) => `구현:
1. "${refactorDescription}" 리팩토링 구현
2. 각 변경 사항 테스트
3. 코드 품질 및 성능 측정
4. 문서 업데이트`
      }
    ]
  }
};

// Creating AI development workspace
function createAIWorkspace(taskType, description) {
  const timestamp = new Date().toISOString().replace(/[:T\-]/g, '').split('.')[0];
  const workspaceName = `${taskType}-${timestamp}`;
  const workspacePath = path.resolve('.cursor', 'ai-workspace', workspaceName);
  
  // Create workspace directory
  if (!fs.existsSync(workspacePath)) {
    fs.mkdirSync(workspacePath, { recursive: true });
  }
  
  // Create task description file
  fs.writeFileSync(
    path.join(workspacePath, 'task.md'),
    `# ${taskType.toUpperCase()}: ${description}\n\n작업 시작 시간: ${new Date().toISOString()}\n`
  );
  
  // Create step files
  const template = TASK_TEMPLATES[taskType];
  template.steps.forEach((step, index) => {
    const stepFile = path.join(workspacePath, `step-${index + 1}.md`);
    fs.writeFileSync(
      stepFile,
      `# 단계 ${index + 1}: ${step.description}\n\n${step.prompt(description)}\n\n## 에이전트 분석 및 계획\n\n(이 부분은 AI 에이전트가 작성합니다)\n\n## 구현 세부 사항\n\n(이 부분은 AI 에이전트가 작성합니다)\n\n## 완료 체크리스트\n\n- [ ] 작업 완료\n- [ ] 코드 검토\n- [ ] 테스트 수행\n`
    );
  });
  
  // Create outcome file
  fs.writeFileSync(
    path.join(workspacePath, 'outcome.md'),
    `# 결과: ${description}\n\n## 구현된 기능/수정 사항\n\n(이 부분은 AI 에이전트가 작성합니다)\n\n## 테스트 결과\n\n(이 부분은 AI 에이전트가 작성합니다)\n\n## 주의사항 및 제한사항\n\n(이 부분은 AI 에이전트가 작성합니다)\n`
  );
  
  return { workspacePath, steps: template.steps.length };
}

// Guide AI through development process
function guideDevelopment(workspacePath, totalSteps) {
  console.log('\n==================================');
  console.log(' AI 기반 자율 개발 프로세스 시작');
  console.log('==================================\n');
  
  console.log(`작업 공간: ${workspacePath}`);
  console.log(`총 ${totalSteps}단계의 프로세스가 준비되었습니다.\n`);
  
  // Instructions for the user
  console.log('각 단계별 진행 방법:');
  console.log('1. 해당 단계의 Markdown 파일을 Cursor에서 엽니다');
  console.log('2. AI에게 다음 프롬프트를 입력합니다:');
  console.log('   "이 단계를 완료하기 위한 분석과 계획을 작성해주세요."');
  console.log('3. AI의 계획을 검토한 후, 구현을 요청합니다:');
  console.log('   "계획에 따라 코드를 구현해주세요."');
  console.log('4. 각 단계가 완료되면 체크리스트를 업데이트합니다');
  console.log('5. 모든 단계가 완료되면 outcome.md 파일을 업데이트합니다\n');
  
  console.log('첫 번째 단계를 시작하려면 Cursor에서 다음 파일을 여세요:');
  console.log(`${path.join(workspacePath, 'step-1.md')}\n`);
  
  rl.question('작업을 마치면 이 스크립트를 종료하려면 아무 키나 누르세요...', () => {
    rl.close();
  });
}

// Generate AI autonomous test cases
function generateTestCases(featureName, workspacePath) {
  const testCasesPath = path.join(workspacePath, 'test-cases.md');
  
  fs.writeFileSync(
    testCasesPath,
    `# "${featureName}" 테스트 케이스

## 단위 테스트

다음 시나리오에 대한 단위 테스트를 작성하세요:

1. 기본 기능 테스트
2. 경계 조건 테스트
3. 오류 처리 테스트
4. 엣지 케이스 테스트

## 통합 테스트

다음 시나리오에 대한 통합 테스트를 작성하세요:

1. 컴포넌트 간 상호작용
2. API 엔드포인트 테스트
3. 데이터 흐름 테스트

## 사용자 시나리오 테스트

다음 사용자 시나리오에 대한 테스트를 작성하세요:

1. 일반적인 사용자 경로
2. 오류 복구 경로
3. 에지 케이스 시나리오

## 성능 테스트

1. 로딩 시간 측정
2. 리소스 사용량 측정
3. 병목 현상 식별`
  );
  
  console.log(`테스트 케이스 파일이 생성되었습니다: ${testCasesPath}`);
}

// Main execution
function main() {
  const [,, taskType, description] = process.argv;
  
  if (!taskType || !description) {
    console.error('사용법: node scripts/ai-dev.js <task-type> "<description>"');
    console.error('지원되는 task-type: feature, fix, refactor');
    process.exit(1);
  }
  
  if (!TASK_TEMPLATES[taskType]) {
    console.error(`지원되지 않는 작업 타입: ${taskType}`);
    console.error(`지원되는 작업 타입: ${Object.keys(TASK_TEMPLATES).join(', ')}`);
    process.exit(1);
  }
  
  const { workspacePath, steps } = createAIWorkspace(taskType, description);
  
  // Generate test cases for feature development
  if (taskType === 'feature') {
    generateTestCases(description, workspacePath);
  }
  
  guideDevelopment(workspacePath, steps);
}

main(); 