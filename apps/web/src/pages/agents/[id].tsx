import React, { useState } from 'react';
import { useRouter } from 'next/router';
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
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Switch,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Code,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Progress,
  Card,
  CardBody,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  useColorMode,
} from '@chakra-ui/react';
import {
  ArrowBackIcon,
  EditIcon,
  StarIcon,
  ChevronLeftIcon,
  DeleteIcon,
  TimeIcon,
  RepeatIcon,
  SettingsIcon,
  InfoIcon,
  ViewIcon,
} from '@chakra-ui/icons';
import { FiDatabase, FiPlay, FiYoutube, FiFileText, FiImage, FiTag, FiTrendingUp, FiDollarSign, FiUsers, FiSearch, FiTarget } from 'react-icons/fi';
import { getThemeColors } from '@/utils/theme';

// Mock agent data
const agentData = {
  trending: {
    id: 'trending-topics',
    name: '인기 주제 탐색',
    description: '유튜브와 다양한 플랫폼의 트렌드를 분석하여 인기 있는 주제 제안',
    longDescription: '이 에이전트는 유튜브, 틱톡, 인스타그램 및 기타 소셜 미디어 플랫폼의 현재 트렌드를 분석하여 콘텐츠 제작자에게 인기 있는 주제를 제안합니다. 최근 7일, 30일, 90일 동안의 트렌드 데이터를 분석하여 상승 중인 주제를 식별합니다.',
    category: 'content-discovery',
    icon: FiTrendingUp,
    createdAt: '2023-08-15',
    lastUsed: '2023-10-28',
    usageCount: 42,
    favorite: true,
    inputFields: ['주제 카테고리', '트렌드 기간', '지역 설정'],
    outputFields: ['인기 주제 목록', '트렌드 점수', '예상 시청자층'],
    apiSettings: {
      youtubeAPIKey: 'YOUR_YOUTUBE_API_KEY',
      useTwitterAPI: true,
      useTikTokAPI: true,
    },
    recentLogs: [
      { timestamp: '2023-10-28T15:23:45', message: '게임 카테고리 트렌드 분석 완료' },
      { timestamp: '2023-10-27T09:12:30', message: '음식 카테고리 트렌드 분석 완료' },
      { timestamp: '2023-10-26T16:45:22', message: '여행 카테고리 트렌드 분석 완료' }
    ],
    versionHistory: [
      { version: '1.2.0', date: '2023-09-15', changes: '틱톡 API 통합 추가' },
      { version: '1.1.0', date: '2023-08-30', changes: '지역별 필터링 기능 추가' },
      { version: '1.0.0', date: '2023-08-15', changes: '최초 릴리즈' }
    ]
  },
  profit: {
    id: 'profit-analysis',
    name: '수익성 분석',
    description: '주제별 예상 조회수, 수익 및 경쟁 강도를 분석',
    longDescription: '이 에이전트는 선택한 주제에 대한 예상 조회수, 광고 수익, 그리고 경쟁 강도를 분석합니다. YouTube 수익화 정책과 현재 광고 시장 상황을 고려하여 주제의 수익 잠재력을 평가합니다.',
    category: 'content-discovery',
    icon: FiDollarSign,
    createdAt: '2023-08-16',
    lastUsed: '2023-10-25',
    usageCount: 31,
    favorite: false,
    inputFields: ['주제 키워드', '콘텐츠 길이', '채널 카테고리'],
    outputFields: ['예상 조회수', '예상 수익', '경쟁 강도'],
    apiSettings: {
      youtubeAPIKey: 'YOUR_YOUTUBE_API_KEY',
      socialBladeAPI: true,
      useHistoricalData: true
    },
    recentLogs: [
      { timestamp: '2023-10-25T14:10:20', message: '게임 리뷰 수익성 분석 완료' },
      { timestamp: '2023-10-24T11:32:15', message: '요리 튜토리얼 수익성 분석 완료' },
      { timestamp: '2023-10-23T16:45:22', message: '여행 브이로그 수익성 분석 완료' }
    ],
    versionHistory: [
      { version: '1.1.5', date: '2023-09-20', changes: '국가별 수익 데이터 추가' },
      { version: '1.1.0', date: '2023-09-01', changes: '경쟁 강도 분석 알고리즘 개선' },
      { version: '1.0.0', date: '2023-08-16', changes: '최초 릴리즈' }
    ]
  }
};

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

interface AgentDetailProps {
  themeProps?: ThemeProps;
}

const AgentDetail = ({ themeProps }: AgentDetailProps) => {
  const router = useRouter();
  const { id } = router.query;
  const { isOpen, onOpen, onClose } = useDisclosure();
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
  const secondaryBgColor = colorMode === 'dark' ? '#1c2536' : '#f0f5fa';
  const formBgColor = cardBgColor;
  
  // Get agent data based on ID (simplified for this example)
  const agent = id === 'trending-topics' ? agentData.trending : 
               id === 'profit-analysis' ? agentData.profit : null;
  
  if (!agent) {
    return (
      <Box bg={bgColor} minH="100vh" color={textColor} p={8}>
        <VStack spacing={4} align="center" justify="center" h="60vh">
          <Heading size="lg">에이전트를 찾을 수 없습니다</Heading>
          <Button leftIcon={<ArrowBackIcon />} onClick={() => router.push('/agents')}>
            에이전트 목록으로 돌아가기
          </Button>
        </VStack>
      </Box>
    );
  }

  const AgentIcon = agent.icon;

  return (
    <Box bg={bgColor} minH="100vh" color={textColor}>
      {/* Top Bar */}
      <Flex
        px={6}
        py={3}
        bg={secondaryBgColor}
        borderBottom="1px"
        borderColor={borderColor}
        justify="space-between"
        align="center"
      >
        <HStack>
          <IconButton
            aria-label="Back to agents"
            icon={<ArrowBackIcon />}
            variant="ghost"
            onClick={() => router.push('/agents')}
          />
          <Heading size="md">에이전트 상세</Heading>
        </HStack>
        <HStack>
          <Button leftIcon={<EditIcon />} variant="outline">
            편집
          </Button>
          <Button colorScheme="purple">
            워크플로우에 추가
          </Button>
        </HStack>
      </Flex>

      {/* Agent Header */}
      <Box px={8} py={6} borderBottom="1px" borderColor={borderColor}>
        <Flex align="center" mb={4}>
          <Box
            bg={accentColor}
            p={3}
            borderRadius="md"
            color="white"
            mr={4}
          >
            <Box as={AgentIcon} boxSize="24px" />
          </Box>
          <Box flex="1">
            <HStack mb={1}>
              <Heading size="lg">{agent.name}</Heading>
              <IconButton
                aria-label={agent.favorite ? "Remove from favorites" : "Add to favorites"}
                icon={<StarIcon />}
                size="sm"
                variant="ghost"
                color={agent.favorite ? "yellow.400" : "gray.400"}
              />
            </HStack>
            <HStack>
              <Badge colorScheme="purple">
                {agent.category === 'content-discovery' ? '콘텐츠 발굴' : '콘텐츠 생성'}
              </Badge>
              <Text fontSize="sm" color="gray.400">
                생성일: {agent.createdAt} | 마지막 사용: {agent.lastUsed}
              </Text>
            </HStack>
          </Box>
        </Flex>
        <Text>{agent.longDescription}</Text>
      </Box>

      {/* Agent Content */}
      <Box p={8}>
        <Tabs variant="enclosed" colorScheme="purple">
          <TabList>
            <Tab>구성</Tab>
            <Tab>사용 통계</Tab>
            <Tab>로그</Tab>
            <Tab>버전 기록</Tab>
          </TabList>
          
          <TabPanels>
            {/* Configuration Panel */}
            <TabPanel>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
                <Box>
                  <Heading size="md" mb={4}>기본 구성</Heading>
                  <VStack spacing={4} align="stretch">
                    <FormControl>
                      <FormLabel>에이전트 이름</FormLabel>
                      <Input 
                        defaultValue={agent.name} 
                        bg={formBgColor}
                        borderColor={borderColor}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>설명</FormLabel>
                      <Textarea 
                        defaultValue={agent.description}
                        bg={formBgColor}
                        borderColor={borderColor}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>카테고리</FormLabel>
                      <Select 
                        defaultValue={agent.category}
                        bg={formBgColor}
                        borderColor={borderColor}
                      >
                        <option value="content-discovery">콘텐츠 발굴</option>
                        <option value="content-creation">콘텐츠 생성</option>
                        <option value="content-translation">다국어 변환</option>
                        <option value="content-publishing">발행 관리</option>
                      </Select>
                    </FormControl>
                  </VStack>
                </Box>
                
                <Box>
                  <Heading size="md" mb={4}>API 구성</Heading>
                  <VStack spacing={4} align="stretch">
                    {Object.entries(agent.apiSettings).map(([key, value]) => (
                      <FormControl key={key}>
                        <FormLabel>{key}</FormLabel>
                        {typeof value === 'boolean' ? (
                          <Switch isChecked={value} colorScheme="purple" />
                        ) : (
                          <Input 
                            defaultValue={value as string} 
                            bg={formBgColor}
                            borderColor={borderColor}
                          />
                        )}
                      </FormControl>
                    ))}
                  </VStack>
                </Box>
              </SimpleGrid>
              
              <Divider my={6} borderColor={borderColor} />
              
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
                <Box>
                  <Heading size="md" mb={4}>입력 필드</Heading>
                  <VStack spacing={4} align="stretch" bg={formBgColor} p={4} borderRadius="md">
                    {agent.inputFields.map((field, index) => (
                      <HStack key={index} justify="space-between">
                        <Text>{field}</Text>
                        <Badge colorScheme="blue">입력</Badge>
                      </HStack>
                    ))}
                  </VStack>
                </Box>
                
                <Box>
                  <Heading size="md" mb={4}>출력 필드</Heading>
                  <VStack spacing={4} align="stretch" bg={formBgColor} p={4} borderRadius="md">
                    {agent.outputFields.map((field, index) => (
                      <HStack key={index} justify="space-between">
                        <Text>{field}</Text>
                        <Badge colorScheme="green">출력</Badge>
                      </HStack>
                    ))}
                  </VStack>
                </Box>
              </SimpleGrid>
            </TabPanel>
            
            {/* Usage Statistics Panel */}
            <TabPanel>
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                <Stat bg={formBgColor} p={4} borderRadius="md">
                  <StatLabel>총 사용 횟수</StatLabel>
                  <StatNumber>{agent.usageCount}</StatNumber>
                  <StatHelpText>최근 30일</StatHelpText>
                </Stat>
                <Stat bg={formBgColor} p={4} borderRadius="md">
                  <StatLabel>워크플로우 사용</StatLabel>
                  <StatNumber>18</StatNumber>
                  <StatHelpText>5개 워크플로우에서 사용 중</StatHelpText>
                </Stat>
                <Stat bg={formBgColor} p={4} borderRadius="md">
                  <StatLabel>평균 실행 시간</StatLabel>
                  <StatNumber>2.4초</StatNumber>
                  <StatHelpText>최근 10회 실행</StatHelpText>
                </Stat>
              </SimpleGrid>
              
              <Box mt={8} p={4} bg={formBgColor} borderRadius="md">
                <Heading size="md" mb={4}>사용 내역</Heading>
                <Text color="gray.400">아직 사용 내역 데이터가 충분하지 않습니다.</Text>
              </Box>
            </TabPanel>
            
            {/* Logs Panel */}
            <TabPanel>
              <VStack spacing={4} align="stretch">
                <Heading size="md" mb={2}>실행 로그</Heading>
                {agent.recentLogs.map((log, index) => (
                  <Box key={index} p={3} bg={formBgColor} borderRadius="md">
                    <Flex justify="space-between" mb={2}>
                      <Badge colorScheme="green">성공</Badge>
                      <Text fontSize="sm" color="gray.400">
                        {new Date(log.timestamp).toLocaleString()}
                      </Text>
                    </Flex>
                    <Text>{log.message}</Text>
                  </Box>
                ))}
              </VStack>
            </TabPanel>
            
            {/* Version History Panel */}
            <TabPanel>
              <VStack spacing={4} align="stretch">
                <Heading size="md" mb={2}>버전 기록</Heading>
                {agent.versionHistory.map((version, index) => (
                  <Box key={index} p={4} bg={formBgColor} borderRadius="md">
                    <HStack justify="space-between" mb={2}>
                      <Heading size="sm">v{version.version}</Heading>
                      <Text fontSize="sm" color="gray.400">{version.date}</Text>
                    </HStack>
                    <Text>{version.changes}</Text>
                  </Box>
                ))}
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default AgentDetail; 