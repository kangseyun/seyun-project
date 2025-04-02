# Cursor 최적화 가이드

## Project-Optimization

이 프로젝트는 Cursor와 AI 에이전트를 극한으로 활용하기 위해 최적화되었습니다.

## Setup-Instructions

1. Cursor 에디터에서 이 프로젝트를 열고 모든 워크스페이스 기능을 활성화합니다.
2. Node.js 환경이 설정되어 있는지 확인합니다.
3. `npm install`을 실행하여 모든 의존성을 설치합니다.

## AI-Optimized-Features

### 1. Cursor Rules 시스템

- `.cursor/rules` 디렉토리에 모듈화된 AI 규칙 구성
- 파일 패턴별 특화된, AI 친화적 규칙 정의
- 모든 코드 패턴과 표준을 AI가 이해하기 쉬운 형식으로 문서화

### 2. 템플릿 시스템

- `.cursor/templates` 디렉토리에 표준화된 코드 템플릿
- `scripts/generate.js`로 템플릿 기반 코드 자동 생성
  ```
  node scripts/generate.js component MyButton --description="재사용 가능한 버튼 컴포넌트"
  node scripts/generate.js controller Product
  ```

### 3. 일관된 코드 스타일

- ESLint 규칙이 AI 가독성과 일관성을 보장
- 네이밍 컨벤션, 주석 스타일, 폴더 구조 표준화
- 타입 안전성 강화로 추론 오류 감소

## Best-Practices

### 효과적인 AI 프롬프팅

`.cursor/rules/ai-prompting.md` 파일에 정의된 패턴을 따릅니다:

1. 목적 명확화: 구현, 버그 수정, 리팩토링 등
2. 컨텍스트 제공: 관련 파일과 패턴 참조
3. 구체적 요구사항: 단계별로 원하는 결과 설명
4. 반복적 접근: 복잡한 작업은 여러 단계로 나누기

### 코드 생성 최적화

1. 공통 패턴은 템플릿으로 추출
2. 자동 생성 스크립트 활용
3. 생성된 코드는 프로젝트 규칙 준수 확인

### 디버깅 최적화

1. AI에 오류 컨텍스트 제공
2. 관련 타입과 인터페이스 언급
3. 단계별 문제 해결 접근 요청

## Troubleshooting

- AI가 프로젝트 구조를 이해하지 못하는 경우:
  - 관련 규칙 파일을 직접 참조하여 컨텍스트 제공
  - 예: "Please reference .cursor/rules/frontend.md for component structure"

- 생성된 코드가 프로젝트 패턴과 맞지 않는 경우:
  - 유사한 기존 코드 예시 제공
  - 구체적인 패턴 준수 요청 