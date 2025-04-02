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
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Badge,
  Divider,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tab,
  TabList,
  Tabs,
  TabPanels,
  TabPanel,
  Image,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Tooltip,
  useColorMode,
} from '@chakra-ui/react';
import {
  AddIcon,
  SearchIcon,
  StarIcon,
  ChevronDownIcon,
  CopyIcon,
  DownloadIcon,
  DeleteIcon,
  EditIcon,
  ExternalLinkIcon,
} from '@chakra-ui/icons';
import { FiPlay } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { getThemeColors } from '@/utils/theme';

// Define types for our workflow data
interface Workflow {
  id: string;
  name: string;
  description: string;
  category: string;
  agentCount: number;
  lastModified: string;
  runCount: number;
  isFavorite: boolean;
  thumbnailUrl: string;
  author?: string;
  isTemplate?: boolean;
}

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

// Mock data for workflow categories
const workflowCategories = [
  { id: 'all', name: '모든 워크플로우' },
  { id: 'youtube', name: '유튜브 콘텐츠' },
  { id: 'blog', name: '블로그 콘텐츠' },
  { id: 'social', name: '소셜 미디어' },
  { id: 'research', name: '주제 리서치' },
];

// Mock data for user's workflows
const userWorkflows: Workflow[] = [
  {
    id: 'wf-101',
    name: '게임 리뷰 시리즈',
    description: '최신 게임을 리뷰하는 유튜브 비디오 시리즈 제작 워크플로우',
    category: 'youtube',
    agentCount: 5,
    lastModified: '2023-10-28',
    runCount: 12,
    isFavorite: true,
    thumbnailUrl: 'https://via.placeholder.com/300x150/6366f1/FFFFFF?text=Game+Review',
  },
  {
    id: 'wf-102',
    name: '요리 튜토리얼 워크플로우',
    description: '인기 있는 요리법을 가르치는 유튜브 튜토리얼 시리즈',
    category: 'youtube',
    agentCount: 4,
    lastModified: '2023-10-25',
    runCount: 8,
    isFavorite: false,
    thumbnailUrl: 'https://via.placeholder.com/300x150/6366f1/FFFFFF?text=Cooking+Tutorial',
  },
  {
    id: 'wf-103',
    name: '여행 블로그 콘텐츠',
    description: '여행 경험을 바탕으로 블로그 콘텐츠 생성',
    category: 'blog',
    agentCount: 3,
    lastModified: '2023-10-22',
    runCount: 5,
    isFavorite: true,
    thumbnailUrl: 'https://via.placeholder.com/300x150/6366f1/FFFFFF?text=Travel+Blog',
  },
  {
    id: 'wf-104',
    name: '주간 트렌드 분석',
    description: '유튜브와 소셜 미디어의 주간 트렌드를 분석하고 리포트 생성',
    category: 'research',
    agentCount: 6,
    lastModified: '2023-10-20',
    runCount: 15,
    isFavorite: false,
    thumbnailUrl: 'https://via.placeholder.com/300x150/6366f1/FFFFFF?text=Trend+Analysis',
  },
];

// Mock data for template workflows
const templateWorkflows: Workflow[] = [
  {
    id: 'template-101',
    name: '유튜브 비디오 제작 파이프라인',
    description: '주제 리서치부터 스크립트, 썸네일까지 완전한 유튜브 비디오 제작 워크플로우',
    category: 'youtube',
    agentCount: 7,
    lastModified: '2023-10-15',
    runCount: 248,
    isFavorite: false,
    thumbnailUrl: 'https://via.placeholder.com/300x150/6366f1/FFFFFF?text=YouTube+Pipeline',
    author: '공식 템플릿',
    isTemplate: true,
  },
  {
    id: 'template-102',
    name: '블로그 콘텐츠 생성기',
    description: '키워드 연구부터 최적화된 블로그 포스트 생성까지',
    category: 'blog',
    agentCount: 5,
    lastModified: '2023-10-10',
    runCount: 192,
    isFavorite: false,
    thumbnailUrl: 'https://via.placeholder.com/300x150/6366f1/FFFFFF?text=Blog+Generator',
    author: '공식 템플릿',
    isTemplate: true,
  },
  {
    id: 'template-103',
    name: '소셜 미디어 콘텐츠 캘린더',
    description: '여러 플랫폼을 위한 소셜 미디어 게시물 일정 계획 및 생성',
    category: 'social',
    agentCount: 4,
    lastModified: '2023-10-05',
    runCount: 175,
    isFavorite: false,
    thumbnailUrl: 'https://via.placeholder.com/300x150/6366f1/FFFFFF?text=Social+Calendar',
    author: '공식 템플릿',
    isTemplate: true,
  },
  {
    id: 'template-104',
    name: '틈새 시장 발굴기',
    description: '유튜브와 소셜 미디어에서 성장 가능성이 높은 틈새 시장 발굴',
    category: 'research',
    agentCount: 6,
    lastModified: '2023-09-28',
    runCount: 136,
    isFavorite: false,
    thumbnailUrl: 'https://via.placeholder.com/300x150/6366f1/FFFFFF?text=Niche+Finder',
    author: '공식 템플릿',
    isTemplate: true,
  },
];

interface WorkflowsPageProps {
  themeProps?: ThemeProps;
}

const WorkflowsPage = ({ themeProps }: WorkflowsPageProps) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);
  const [sortBy, setSortBy] = useState<'name' | 'modified' | 'runs'>('modified');
  const [activeTab, setActiveTab] = useState<'my' | 'templates'>('my');
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
  const cardBg = cardBgColor;
  const secondaryBgColor = colorMode === 'dark' ? '#1c2536' : '#f0f5fa';

  // Combined and filtered workflows
  const filteredWorkflows = (activeTab === 'my' ? userWorkflows : templateWorkflows)
    .filter(workflow => {
      // Search filter
      const matchesSearch = workflow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        workflow.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Category filter
      const matchesCategory = selectedCategory === 'all' || workflow.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'runs') {
        return b.runCount - a.runCount;
      } else { // modified
        return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime();
      }
    });

  // Handle workflow selection
  const handleSelectWorkflow = (workflow: Workflow) => {
    setSelectedWorkflow(workflow);
    onOpen();
  };

  // Handle workflow actions
  const handleEditWorkflow = (id: string) => {
    router.push(`/workflow-builder?id=${id}`);
  };

  const handleDuplicateWorkflow = (workflow: Workflow) => {
    // Logic would be here to duplicate the workflow
    console.log('Duplicate workflow:', workflow.id);
    onClose();
  };

  const handleRunWorkflow = (id: string) => {
    router.push(`/workflow-runs?start=${id}`);
  };

  const toggleFavorite = (workflowId: string) => {
    // In a real app, this would update the state properly
    console.log('Toggle favorite for workflow:', workflowId);
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
        <Heading size="md">워크플로우 갤러리</Heading>
        <Button
          leftIcon={<AddIcon />}
          colorScheme="purple"
          onClick={() => router.push('/workflow-builder')}
        >
          새 워크플로우
        </Button>
      </Flex>

      {/* Main Tabs */}
      <Tabs colorScheme="purple" onChange={(index) => setActiveTab(index === 0 ? 'my' : 'templates')}>
        <TabList px={6} pt={4}>
          <Tab>내 워크플로우 ({userWorkflows.length})</Tab>
          <Tab>템플릿 갤러리 ({templateWorkflows.length})</Tab>
        </TabList>

        <TabPanels>
          {/* Both tabs have similar content with different data sources */}
          {['my', 'templates'].map((tab) => (
            <TabPanel key={tab} px={6} py={4}>
              {/* Filters */}
              <Flex 
                mb={6} 
                direction={{ base: 'column', md: 'row' }} 
                align={{ base: 'stretch', md: 'center' }}
                gap={4}
              >
                <InputGroup maxW={{ base: '100%', md: '320px' }}>
                  <InputLeftElement pointerEvents="none">
                    <SearchIcon color="gray.400" />
                  </InputLeftElement>
                  <Input
                    placeholder="워크플로우 검색..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    bg={secondaryBgColor}
                    borderColor={borderColor}
                    _focus={{ borderColor: accentColor }}
                  />
                </InputGroup>

                <HStack spacing={4} flex="1" justify="flex-start" wrap="wrap">
                  <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />} variant="outline" size="md">
                      카테고리: {workflowCategories.find(c => c.id === selectedCategory)?.name}
                    </MenuButton>
                    <MenuList bg={secondaryBgColor} borderColor={borderColor}>
                      {workflowCategories.map(category => (
                        <MenuItem 
                          key={category.id}
                          onClick={() => setSelectedCategory(category.id)}
                          bg={selectedCategory === category.id ? cardBg : 'transparent'}
                        >
                          {category.name}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </Menu>

                  <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />} variant="outline" size="md">
                      정렬: {sortBy === 'name' ? '이름순' : sortBy === 'runs' ? '실행순' : '최신순'}
                    </MenuButton>
                    <MenuList bg={secondaryBgColor} borderColor={borderColor}>
                      <MenuItem 
                        onClick={() => setSortBy('name')}
                        bg={sortBy === 'name' ? cardBg : 'transparent'}
                      >
                        이름순
                      </MenuItem>
                      <MenuItem 
                        onClick={() => setSortBy('modified')}
                        bg={sortBy === 'modified' ? cardBg : 'transparent'}
                      >
                        최신순
                      </MenuItem>
                      <MenuItem 
                        onClick={() => setSortBy('runs')}
                        bg={sortBy === 'runs' ? cardBg : 'transparent'}
                      >
                        실행순
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </HStack>
              </Flex>

              {/* Workflow Grid */}
              {filteredWorkflows.length > 0 ? (
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                  {filteredWorkflows.map(workflow => (
                    <Box
                      key={workflow.id}
                      bg={cardBg}
                      borderRadius="md"
                      overflow="hidden"
                      borderWidth="1px"
                      borderColor={borderColor}
                      transition="all 0.2s"
                      _hover={{ 
                        transform: 'translateY(-4px)',
                        shadow: 'lg',
                        borderColor: accentColor
                      }}
                    >
                      <Box position="relative">
                        <Image 
                          src={workflow.thumbnailUrl} 
                          alt={workflow.name}
                          height="150px"
                          width="100%"
                          objectFit="cover"
                          fallbackSrc="https://via.placeholder.com/300x150/6366f1/FFFFFF?text=Workflow"
                        />
                        <IconButton
                          aria-label={workflow.isFavorite ? "Remove from favorites" : "Add to favorites"}
                          icon={<StarIcon />}
                          size="sm"
                          position="absolute"
                          top={2}
                          right={2}
                          color={workflow.isFavorite ? "yellow.400" : "white"}
                          bg={workflow.isFavorite ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.3)"}
                          _hover={{ bg: "rgba(0,0,0,0.5)" }}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(workflow.id);
                          }}
                        />
                        {workflow.isTemplate && (
                          <Badge
                            position="absolute"
                            top={2}
                            left={2}
                            colorScheme="purple"
                            px={2}
                            py={1}
                            borderRadius="md"
                          >
                            템플릿
                          </Badge>
                        )}
                      </Box>
                      
                      <Box p={4}>
                        <Heading size="md" mb={2} noOfLines={1}>{workflow.name}</Heading>
                        <Text fontSize="sm" color="gray.400" mb={4} noOfLines={2}>
                          {workflow.description}
                        </Text>

                        <Flex justify="space-between" align="center" mb={3}>
                          <Badge colorScheme="blue" px={2} py={1}>
                            {workflowCategories.find(c => c.id === workflow.category)?.name || workflow.category}
                          </Badge>
                          <HStack spacing={2}>
                            <Text fontSize="xs" color="gray.500">에이전트 {workflow.agentCount}개</Text>
                            <Text fontSize="xs" color="gray.500">실행 {workflow.runCount}회</Text>
                          </HStack>
                        </Flex>

                        <Divider borderColor={borderColor} my={3} />

                        <Flex justify="space-between" align="center">
                          <Text fontSize="xs" color="gray.500">
                            {workflow.author ? `${workflow.author}` : "수정일"}: {workflow.lastModified}
                          </Text>
                          <HStack>
                            <Tooltip label="자세히 보기">
                              <IconButton
                                aria-label="View details"
                                icon={<ExternalLinkIcon />}
                                size="sm"
                                variant="ghost"
                                onClick={() => handleSelectWorkflow(workflow)}
                              />
                            </Tooltip>
                            <Tooltip label="워크플로우 실행">
                              <IconButton
                                aria-label="Run workflow"
                                icon={<FiPlay />}
                                size="sm"
                                colorScheme="green"
                                variant="ghost"
                                onClick={() => handleRunWorkflow(workflow.id)}
                              />
                            </Tooltip>
                          </HStack>
                        </Flex>
                      </Box>
                    </Box>
                  ))}
                </SimpleGrid>
              ) : (
                <Flex
                  direction="column"
                  justify="center"
                  align="center"
                  h="200px"
                  border="2px dashed"
                  borderColor={borderColor}
                  borderRadius="md"
                  mt={4}
                >
                  <Text mb={4} color="gray.500">조건에 맞는 워크플로우가 없습니다</Text>
                  <Button
                    leftIcon={<AddIcon />}
                    colorScheme="purple"
                    onClick={() => router.push('/workflow-builder')}
                  >
                    새 워크플로우 만들기
                  </Button>
                </Flex>
              )}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>

      {/* Workflow Details Modal */}
      {selectedWorkflow && (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
          <ModalOverlay />
          <ModalContent bg={secondaryBgColor} color={textColor}>
            <ModalHeader>{selectedWorkflow.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Image 
                src={selectedWorkflow.thumbnailUrl} 
                alt={selectedWorkflow.name}
                height="200px"
                width="100%"
                objectFit="cover"
                borderRadius="md"
                mb={4}
                fallbackSrc="https://via.placeholder.com/300x150/6366f1/FFFFFF?text=Workflow"
              />
              
              <VStack align="stretch" spacing={4}>
                <Box>
                  <Text fontWeight="bold" mb={1}>설명</Text>
                  <Text>{selectedWorkflow.description}</Text>
                </Box>
                
                <Flex justify="space-between">
                  <Box>
                    <Text fontWeight="bold" mb={1}>카테고리</Text>
                    <Badge colorScheme="blue" px={2} py={1}>
                      {workflowCategories.find(c => c.id === selectedWorkflow.category)?.name || selectedWorkflow.category}
                    </Badge>
                  </Box>
                  
                  <Box>
                    <Text fontWeight="bold" mb={1}>에이전트 수</Text>
                    <Text>{selectedWorkflow.agentCount}개</Text>
                  </Box>
                  
                  <Box>
                    <Text fontWeight="bold" mb={1}>실행 횟수</Text>
                    <Text>{selectedWorkflow.runCount}회</Text>
                  </Box>
                </Flex>
                
                <Box>
                  <Text fontWeight="bold" mb={1}>최종 수정일</Text>
                  <Text>{selectedWorkflow.lastModified}</Text>
                </Box>
                
                {selectedWorkflow.author && (
                  <Box>
                    <Text fontWeight="bold" mb={1}>작성자</Text>
                    <Text>{selectedWorkflow.author}</Text>
                  </Box>
                )}
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button 
                leftIcon={<EditIcon />} 
                mr={2} 
                onClick={() => handleEditWorkflow(selectedWorkflow.id)}
              >
                {selectedWorkflow.isTemplate ? '템플릿 기반 제작' : '편집'}
              </Button>
              <Button 
                leftIcon={<CopyIcon />} 
                mr={2} 
                onClick={() => handleDuplicateWorkflow(selectedWorkflow)}
                variant="outline"
              >
                복제
              </Button>
              <Button 
                leftIcon={<FiPlay />} 
                colorScheme="green"
                onClick={() => handleRunWorkflow(selectedWorkflow.id)}
              >
                실행
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default WorkflowsPage; 