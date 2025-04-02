import React, { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  IconButton,
  Badge,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Progress,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Tooltip,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Code,
  useColorMode,
} from '@chakra-ui/react';
import {
  ChevronDownIcon,
  ChevronRightIcon,
  TimeIcon,
  CheckIcon,
  WarningIcon,
  InfoIcon,
  RepeatIcon,
  CloseIcon,
  ViewIcon,
} from '@chakra-ui/icons';
import { FiPlay, FiPause } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { getThemeColors } from '@/utils/theme';

// Workflow run status types
type RunStatus = 'running' | 'completed' | 'failed' | 'paused';

// 테마 속성 인터페이스
interface ThemeProps {
  bgColor: string;
  cardBgColor: string;
  accentColor: string;
  successColor: string;
  warningColor: string;
  errorColor: string;
  textColor: string;
  subTextColor: string;
  borderColor: string;
  colorMode: 'light' | 'dark';
}

// Mock workflow run data
interface WorkflowRun {
  id: string;
  name: string;
  status: RunStatus;
  progress: number;
  startTime: string;
  endTime?: string;
  duration: string;
  agentCount: number;
  logs: {
    timestamp: string;
    level: 'info' | 'warning' | 'error';
    message: string;
  }[];
  results?: {
    outputType: string;
    value: string;
  }[];
}

// Mock data for workflow runs
const mockWorkflowRuns: WorkflowRun[] = [
  {
    id: 'wf-001',
    name: '게임 리뷰 콘텐츠 생성',
    status: 'running',
    progress: 65,
    startTime: '2023-10-28T14:30:00',
    duration: '12분 30초',
    agentCount: 4,
    logs: [
      { timestamp: '2023-10-28T14:30:00', level: 'info', message: '워크플로우 시작됨' },
      { timestamp: '2023-10-28T14:31:15', level: 'info', message: '인기 주제 탐색 에이전트 실행 완료' },
      { timestamp: '2023-10-28T14:33:20', level: 'info', message: '수익성 분석 에이전트 실행 완료' },
      { timestamp: '2023-10-28T14:38:45', level: 'info', message: '스크립트 작성 에이전트 실행 중...' },
    ]
  },
  {
    id: 'wf-002',
    name: '요리 튜토리얼 시리즈',
    status: 'completed',
    progress: 100,
    startTime: '2023-10-28T10:15:00',
    endTime: '2023-10-28T11:05:20',
    duration: '50분 20초',
    agentCount: 5,
    logs: [
      { timestamp: '2023-10-28T10:15:00', level: 'info', message: '워크플로우 시작됨' },
      { timestamp: '2023-10-28T10:20:30', level: 'info', message: '인기 주제 탐색 에이전트 실행 완료' },
      { timestamp: '2023-10-28T10:25:45', level: 'info', message: '수익성 분석 에이전트 실행 완료' },
      { timestamp: '2023-10-28T10:35:10', level: 'warning', message: '스크립트 작성 에이전트 경고: 중복 내용 감지' },
      { timestamp: '2023-10-28T10:50:30', level: 'info', message: '썸네일 생성 에이전트 실행 완료' },
      { timestamp: '2023-10-28T11:05:20', level: 'info', message: '워크플로우 완료' },
    ],
    results: [
      { outputType: '스크립트', value: '한식 김치찌개 만들기 튜토리얼.docx' },
      { outputType: '썸네일', value: 'kimchi-stew-thumbnail.jpg' },
      { outputType: '설명', value: '맛있는 김치찌개 만드는 법을 알려드립니다. 재료 준비부터 끓이는 과정까지 자세히 설명합니다.' }
    ]
  },
  {
    id: 'wf-003',
    name: '여행 브이로그 콘텐츠',
    status: 'failed',
    progress: 45,
    startTime: '2023-10-27T16:20:00',
    endTime: '2023-10-27T16:35:12',
    duration: '15분 12초',
    agentCount: 3,
    logs: [
      { timestamp: '2023-10-27T16:20:00', level: 'info', message: '워크플로우 시작됨' },
      { timestamp: '2023-10-27T16:25:30', level: 'info', message: '인기 주제 탐색 에이전트 실행 완료' },
      { timestamp: '2023-10-27T16:30:45', level: 'warning', message: '수익성 분석 에이전트 경고: 데이터 부족' },
      { timestamp: '2023-10-27T16:35:12', level: 'error', message: '스크립트 작성 에이전트 오류: API 할당량 초과' },
    ]
  },
  {
    id: 'wf-004',
    name: '테크 리뷰 시리즈',
    status: 'paused',
    progress: 35,
    startTime: '2023-10-27T13:10:00',
    duration: '8분 45초',
    agentCount: 4,
    logs: [
      { timestamp: '2023-10-27T13:10:00', level: 'info', message: '워크플로우 시작됨' },
      { timestamp: '2023-10-27T13:15:30', level: 'info', message: '인기 주제 탐색 에이전트 실행 완료' },
      { timestamp: '2023-10-27T13:18:45', level: 'info', message: '워크플로우 일시 중지됨' },
    ]
  },
  {
    id: 'wf-005',
    name: '음악 리뷰 콘텐츠',
    status: 'completed',
    progress: 100,
    startTime: '2023-10-26T09:30:00',
    endTime: '2023-10-26T10:15:45',
    duration: '45분 45초',
    agentCount: 5,
    logs: [
      { timestamp: '2023-10-26T09:30:00', level: 'info', message: '워크플로우 시작됨' },
      { timestamp: '2023-10-26T09:35:30', level: 'info', message: '인기 주제 탐색 에이전트 실행 완료' },
      { timestamp: '2023-10-26T09:42:15', level: 'info', message: '수익성 분석 에이전트 실행 완료' },
      { timestamp: '2023-10-26T09:55:20', level: 'info', message: '스크립트 작성 에이전트 실행 완료' },
      { timestamp: '2023-10-26T10:10:30', level: 'info', message: '썸네일 생성 에이전트 실행 완료' },
      { timestamp: '2023-10-26T10:15:45', level: 'info', message: '워크플로우 완료' },
    ],
    results: [
      { outputType: '스크립트', value: '2023 케이팝 트렌드 분석.docx' },
      { outputType: '썸네일', value: 'kpop-trends-2023-thumbnail.jpg' },
      { outputType: '설명', value: '2023년 케이팝 음악 산업의 주요 트렌드와 인기 아티스트들을 분석합니다.' }
    ]
  }
];

interface WorkflowRunsPageProps {
  themeProps?: ThemeProps;
}

const WorkflowRunsPage = ({ themeProps }: WorkflowRunsPageProps) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedRun, setSelectedRun] = useState<WorkflowRun | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'running' | 'completed' | 'failed'>('all');
  const { colorMode } = useColorMode();
  
  // 테마 속성 설정
  const {
    bgColor,
    cardBgColor,
    accentColor,
    successColor,
    warningColor,
    errorColor,
    textColor,
    subTextColor,
    borderColor
  } = themeProps || getThemeColors(colorMode as 'light' | 'dark');
  
  // 상태 색상
  const tableHeaderBg = cardBgColor;
  const agentCardBg = cardBgColor;
  const secondaryBgColor = colorMode === 'dark' ? '#1c2536' : '#f0f5fa';
  
  // Filter runs based on active tab
  const filteredRuns = mockWorkflowRuns.filter((run) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'running') return run.status === 'running' || run.status === 'paused';
    if (activeTab === 'completed') return run.status === 'completed';
    if (activeTab === 'failed') return run.status === 'failed';
    return true;
  });

  // Handle viewing details of a workflow run
  const viewRunDetails = (run: WorkflowRun) => {
    setSelectedRun(run);
    onOpen();
  };

  // Get status color
  const getStatusColor = (status: RunStatus) => {
    switch (status) {
      case 'running': return 'blue';
      case 'completed': return 'green';
      case 'failed': return 'red';
      case 'paused': return 'yellow';
      default: return 'gray';
    }
  };

  // Get status icon
  const getStatusIcon = (status: RunStatus) => {
    switch (status) {
      case 'running': return <FiPlay />;
      case 'completed': return <CheckIcon />;
      case 'failed': return <WarningIcon />;
      case 'paused': return <FiPause />;
      default: return <InfoIcon />;
    }
  };

  // Get log level color
  const getLogLevelColor = (level: 'info' | 'warning' | 'error') => {
    switch (level) {
      case 'info': return 'blue';
      case 'warning': return 'yellow';
      case 'error': return 'red';
      default: return 'gray';
    }
  };

  return (
    <Box
      bg={bgColor}
      minH="100vh"
      color={textColor}
    >
      {/* Top Toolbar */}
      <Flex
        px={6}
        py={3}
        bg={secondaryBgColor}
        borderBottom="1px"
        borderColor={borderColor}
        justify="space-between"
        align="center"
      >
        <Heading size="md">워크플로우 실행</Heading>
        <Button
          leftIcon={<RepeatIcon />}
          colorScheme="purple"
          onClick={() => router.push('/workflow-builder')}
        >
          새 워크플로우
        </Button>
      </Flex>

      {/* Tabs */}
      <Tabs colorScheme="purple" onChange={(index) => {
        const tabs: ('all' | 'running' | 'completed' | 'failed')[] = ['all', 'running', 'completed', 'failed'];
        setActiveTab(tabs[index]);
      }}>
        <TabList px={6} pt={4}>
          <Tab>모든 실행</Tab>
          <Tab>실행 중 ({mockWorkflowRuns.filter(run => run.status === 'running' || run.status === 'paused').length})</Tab>
          <Tab>완료됨 ({mockWorkflowRuns.filter(run => run.status === 'completed').length})</Tab>
          <Tab>실패함 ({mockWorkflowRuns.filter(run => run.status === 'failed').length})</Tab>
        </TabList>

        <TabPanels>
          {/* All Tabs have the same content, but filtered differently */}
          {['all', 'running', 'completed', 'failed'].map((tab) => (
            <TabPanel key={tab} px={6} py={4}>
              <Box
                bg={secondaryBgColor}
                borderRadius="md"
                overflow="hidden"
                borderWidth="1px"
                borderColor={borderColor}
              >
                <Table variant="simple">
                  <Thead bg={tableHeaderBg}>
                    <Tr>
                      <Th color="gray.400" borderColor={borderColor}>상태</Th>
                      <Th color="gray.400" borderColor={borderColor}>워크플로우 이름</Th>
                      <Th color="gray.400" borderColor={borderColor}>진행률</Th>
                      <Th color="gray.400" borderColor={borderColor}>시작 시간</Th>
                      <Th color="gray.400" borderColor={borderColor}>소요 시간</Th>
                      <Th color="gray.400" borderColor={borderColor}>에이전트</Th>
                      <Th color="gray.400" borderColor={borderColor}>작업</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {filteredRuns.map((run) => (
                      <Tr 
                        key={run.id} 
                        _hover={{ bg: 'rgba(255,255,255,0.05)' }}
                        cursor="pointer"
                        onClick={() => viewRunDetails(run)}
                      >
                        <Td borderColor={borderColor}>
                          <Badge colorScheme={getStatusColor(run.status)}>
                            <Flex align="center">
                              <Box mr={1}>{getStatusIcon(run.status)}</Box>
                              {run.status === 'running' ? '실행 중' : 
                               run.status === 'completed' ? '완료됨' : 
                               run.status === 'failed' ? '실패함' : '일시 중지'}
                            </Flex>
                          </Badge>
                        </Td>
                        <Td borderColor={borderColor} fontWeight="medium">{run.name}</Td>
                        <Td borderColor={borderColor} width="200px">
                          <Flex align="center">
                            <Progress 
                              value={run.progress} 
                              size="sm" 
                              width="150px" 
                              colorScheme={getStatusColor(run.status)}
                              borderRadius="full"
                              mr={2}
                            />
                            <Text fontSize="xs">{run.progress}%</Text>
                          </Flex>
                        </Td>
                        <Td borderColor={borderColor} fontSize="sm">{new Date(run.startTime).toLocaleString()}</Td>
                        <Td borderColor={borderColor} fontSize="sm">{run.duration}</Td>
                        <Td borderColor={borderColor} fontSize="sm">{run.agentCount}개</Td>
                        <Td borderColor={borderColor}>
                          <HStack spacing={1}>
                            <Tooltip label="자세히 보기">
                              <IconButton 
                                aria-label="View details" 
                                icon={<ViewIcon />} 
                                size="sm"
                                variant="ghost"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  viewRunDetails(run);
                                }}
                              />
                            </Tooltip>
                            {run.status === 'running' && (
                              <Tooltip label="일시 중지">
                                <IconButton 
                                  aria-label="Pause workflow" 
                                  icon={<FiPause />} 
                                  size="sm"
                                  variant="ghost"
                                  onClick={(e) => e.stopPropagation()}
                                />
                              </Tooltip>
                            )}
                            {run.status === 'paused' && (
                              <Tooltip label="재개">
                                <IconButton 
                                  aria-label="Resume workflow" 
                                  icon={<FiPlay />} 
                                  size="sm"
                                  variant="ghost"
                                  onClick={(e) => e.stopPropagation()}
                                />
                              </Tooltip>
                            )}
                            {(run.status === 'failed' || run.status === 'completed') && (
                              <Tooltip label="다시 실행">
                                <IconButton 
                                  aria-label="Re-run workflow" 
                                  icon={<RepeatIcon />} 
                                  size="sm"
                                  variant="ghost"
                                  onClick={(e) => e.stopPropagation()}
                                />
                              </Tooltip>
                            )}
                          </HStack>
                        </Td>
                      </Tr>
                    ))}
                    {filteredRuns.length === 0 && (
                      <Tr>
                        <Td colSpan={7} textAlign="center" py={8} borderColor={borderColor}>
                          <Text color="gray.500">표시할 워크플로우 실행이 없습니다.</Text>
                        </Td>
                      </Tr>
                    )}
                  </Tbody>
                </Table>
              </Box>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>

      {/* Workflow Run Details Modal */}
      {selectedRun && (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent bg={secondaryBgColor} color={textColor}>
            <ModalHeader>
              <Flex align="center">
                <Badge colorScheme={getStatusColor(selectedRun.status)} mr={2}>
                  <Flex align="center">
                    <Box mr={1}>{getStatusIcon(selectedRun.status)}</Box>
                    {selectedRun.status === 'running' ? '실행 중' : 
                     selectedRun.status === 'completed' ? '완료됨' : 
                     selectedRun.status === 'failed' ? '실패함' : '일시 중지'}
                  </Flex>
                </Badge>
                {selectedRun.name}
              </Flex>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Tabs colorScheme="purple" variant="soft-rounded" size="sm">
                <TabList>
                  <Tab>상세 정보</Tab>
                  <Tab>로그</Tab>
                  {selectedRun.results && <Tab>결과</Tab>}
                </TabList>
                <TabPanels mt={4}>
                  {/* Details Panel */}
                  <TabPanel>
                    <VStack spacing={4} align="stretch">
                      <Box>
                        <Text fontWeight="bold" mb={1}>진행률</Text>
                        <Progress 
                          value={selectedRun.progress} 
                          size="sm" 
                          colorScheme={getStatusColor(selectedRun.status)}
                          borderRadius="full"
                        />
                        <Text fontSize="sm" mt={1} textAlign="right">{selectedRun.progress}%</Text>
                      </Box>
                      
                      <Box>
                        <Text fontWeight="bold" mb={1}>시간 정보</Text>
                        <HStack fontSize="sm">
                          <Text color="gray.400">시작:</Text>
                          <Text>{new Date(selectedRun.startTime).toLocaleString()}</Text>
                        </HStack>
                        {selectedRun.endTime && (
                          <HStack fontSize="sm">
                            <Text color="gray.400">종료:</Text>
                            <Text>{new Date(selectedRun.endTime).toLocaleString()}</Text>
                          </HStack>
                        )}
                        <HStack fontSize="sm">
                          <Text color="gray.400">소요 시간:</Text>
                          <Text>{selectedRun.duration}</Text>
                        </HStack>
                      </Box>
                      
                      <Box>
                        <Text fontWeight="bold" mb={1}>에이전트 정보</Text>
                        <Text fontSize="sm">사용된 에이전트: {selectedRun.agentCount}개</Text>
                      </Box>
                      
                      <Box>
                        <Text fontWeight="bold" mb={1}>워크플로우 ID</Text>
                        <Code p={2} borderRadius="md" bg={agentCardBg}>
                          {selectedRun.id}
                        </Code>
                      </Box>
                    </VStack>
                  </TabPanel>
                  
                  {/* Logs Panel */}
                  <TabPanel>
                    <VStack spacing={3} align="stretch">
                      {selectedRun.logs.map((log, index) => (
                        <Box key={index} p={2} bg={agentCardBg} borderRadius="md" fontSize="sm">
                          <Flex mb={1}>
                            <Badge colorScheme={getLogLevelColor(log.level)} mr={2}>
                              {log.level === 'info' ? '정보' : 
                               log.level === 'warning' ? '경고' : '오류'}
                            </Badge>
                            <Text color="gray.400">{new Date(log.timestamp).toLocaleString()}</Text>
                          </Flex>
                          <Text>{log.message}</Text>
                        </Box>
                      ))}
                    </VStack>
                  </TabPanel>
                  
                  {/* Results Panel */}
                  {selectedRun.results && (
                    <TabPanel>
                      <VStack spacing={4} align="stretch">
                        {selectedRun.results.map((result, index) => (
                          <Box key={index} p={3} bg={agentCardBg} borderRadius="md">
                            <Text fontWeight="bold" mb={1}>{result.outputType}</Text>
                            <Text>{result.value}</Text>
                          </Box>
                        ))}
                      </VStack>
                    </TabPanel>
                  )}
                </TabPanels>
              </Tabs>
            </ModalBody>
            <ModalFooter>
              {selectedRun.status === 'running' && (
                <Button leftIcon={<FiPause />} mr={3} colorScheme="yellow">
                  일시 중지
                </Button>
              )}
              {selectedRun.status === 'paused' && (
                <Button leftIcon={<FiPlay />} mr={3} colorScheme="blue">
                  재개
                </Button>
              )}
              {(selectedRun.status === 'failed' || selectedRun.status === 'completed') && (
                <Button leftIcon={<RepeatIcon />} mr={3} colorScheme="blue">
                  다시 실행
                </Button>
              )}
              {selectedRun.status !== 'completed' && (
                <Button leftIcon={<CloseIcon />} colorScheme="red" variant="ghost">
                  중단
                </Button>
              )}
              <Button ml={3} onClick={onClose}>닫기</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default WorkflowRunsPage; 