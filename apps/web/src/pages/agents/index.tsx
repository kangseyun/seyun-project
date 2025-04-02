import React, { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  HStack,
  IconButton,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Badge,
  Divider,
  Tag,
  TagLabel,
  TagCloseButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Select,
  useColorMode,
} from '@chakra-ui/react';
import {
  AddIcon,
  DeleteIcon,
  EditIcon,
  SearchIcon,
  StarIcon,
  SettingsIcon,
  ChevronDownIcon,
} from '@chakra-ui/icons';
import { FiDatabase, FiPlay, FiYoutube, FiFileText, FiImage, FiTag, FiTrendingUp, FiDollarSign, FiUsers, FiSearch, FiTarget } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { getThemeColors } from '@/utils/theme';

// Define types for our data
interface Agent {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: React.ComponentType;
  createdAt: string;
  lastUsed: string;
  usageCount: number;
  favorite: boolean;
}

interface AgentCategory {
  id: string;
  name: string;
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

// Mock data for agent categories
const agentCategories: AgentCategory[] = [
  { id: 'content-discovery', name: '콘텐츠 발굴' },
  { id: 'content-creation', name: '콘텐츠 생성' },
  { id: 'content-translation', name: '다국어 변환' },
  { id: 'content-publishing', name: '발행 관리' },
];

// Mock data for agents
const mockAgents: Agent[] = [
  {
    id: 'trending-topics',
    name: '인기 주제 탐색',
    description: '유튜브와 다양한 플랫폼의 트렌드를 분석하여 인기 있는 주제 제안',
    category: 'content-discovery',
    icon: FiTrendingUp,
    createdAt: '2023-08-15',
    lastUsed: '2023-10-28',
    usageCount: 42,
    favorite: true,
  },
  {
    id: 'profit-analysis',
    name: '수익성 분석',
    description: '주제별 예상 조회수, 수익 및 경쟁 강도를 분석',
    category: 'content-discovery',
    icon: FiDollarSign,
    createdAt: '2023-08-16',
    lastUsed: '2023-10-25',
    usageCount: 31,
    favorite: false,
  },
  {
    id: 'competitor-analysis',
    name: '경쟁사 분석',
    description: '선택한 주제에 대한 기존 콘텐츠 분석 및 차별화 요소 제안',
    category: 'content-discovery',
    icon: FiUsers,
    createdAt: '2023-08-17',
    lastUsed: '2023-10-26',
    usageCount: 27,
    favorite: true,
  },
  {
    id: 'keyword-research',
    name: '키워드 리서치',
    description: '주제와 관련된 검색 키워드 및 인기도 분석',
    category: 'content-discovery',
    icon: FiSearch,
    createdAt: '2023-08-18',
    lastUsed: '2023-10-27',
    usageCount: 38,
    favorite: true,
  },
  {
    id: 'niche-finder',
    name: '틈새 시장 발굴',
    description: '경쟁이 적고 성장 가능성이 높은 틈새 주제 발굴',
    category: 'content-discovery',
    icon: FiTarget,
    createdAt: '2023-08-19',
    lastUsed: '2023-10-22',
    usageCount: 16,
    favorite: false,
  },
  {
    id: 'youtube-video',
    name: '유튜브 비디오',
    description: '긴 형식의 유튜브 비디오 콘텐츠 및 편집 지시 생성',
    category: 'content-creation',
    icon: FiYoutube,
    createdAt: '2023-08-20',
    lastUsed: '2023-10-28',
    usageCount: 24,
    favorite: true,
  },
  {
    id: 'youtube-shorts',
    name: '유튜브 쇼츠',
    description: '짧은 형식의 세로 비디오 콘텐츠 및 편집 지시 생성',
    category: 'content-creation',
    icon: FiPlay,
    createdAt: '2023-08-21',
    lastUsed: '2023-10-24',
    usageCount: 19,
    favorite: false,
  },
  {
    id: 'script-writing',
    name: '스크립트 작성',
    description: '비디오 콘텐츠를 위한 대본 작성',
    category: 'content-creation',
    icon: FiFileText,
    createdAt: '2023-08-22',
    lastUsed: '2023-10-26',
    usageCount: 23,
    favorite: false,
  },
  {
    id: 'thumbnail',
    name: '썸네일 제작',
    description: '클릭률이 높은 유튜브 썸네일 이미지 생성',
    category: 'content-creation',
    icon: FiImage,
    createdAt: '2023-08-23',
    lastUsed: '2023-10-27',
    usageCount: 32,
    favorite: true,
  },
  {
    id: 'description-tags',
    name: '설명 및 태그',
    description: 'SEO에 최적화된 비디오 설명 및 태그 생성',
    category: 'content-creation',
    icon: FiTag,
    createdAt: '2023-08-24',
    lastUsed: '2023-10-23',
    usageCount: 25,
    favorite: false,
  },
];

interface AgentsPageProps {
  themeProps?: ThemeProps;
}

const AgentsPage = ({ themeProps }: AgentsPageProps) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'usage' | 'recent'>('recent');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [agents, setAgents] = useState<Agent[]>(mockAgents);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'content-discovery',
  });
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
  const agentCardBg = cardBgColor;
  const secondaryBgColor = colorMode === 'dark' ? '#1c2536' : '#f0f5fa';

  // Filter agents based on search query, categories, and favorites
  const filteredAgents = agents.filter(agent => {
    // Search filter
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Category filter
    const matchesCategory = selectedCategories.length === 0 || 
      selectedCategories.includes(agent.category);
    
    // Favorites filter
    const matchesFavorite = !showFavoritesOnly || agent.favorite;
    
    return matchesSearch && matchesCategory && matchesFavorite;
  });

  // Sort agents
  const sortedAgents = [...filteredAgents].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'usage') {
      return b.usageCount - a.usageCount;
    } else { // recent
      return new Date(b.lastUsed).getTime() - new Date(a.lastUsed).getTime();
    }
  });

  // Handle category selection
  const toggleCategory = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  // Handle agent creation
  const handleCreateAgent = () => {
    setFormData({
      name: '',
      description: '',
      category: 'content-discovery',
    });
    setSelectedAgent(null);
    onOpen();
  };

  // Handle agent editing
  const handleEditAgent = (agent: Agent) => {
    setFormData({
      name: agent.name,
      description: agent.description,
      category: agent.category,
    });
    setSelectedAgent(agent);
    onOpen();
  };

  // Handle agent deletion
  const handleDeleteAgent = (agentId: string) => {
    setAgents(agents.filter(agent => agent.id !== agentId));
  };

  // Handle form submission
  const handleSubmit = () => {
    if (selectedAgent) {
      // Update existing agent
      setAgents(agents.map(agent => 
        agent.id === selectedAgent.id 
          ? { ...agent, name: formData.name, description: formData.description, category: formData.category }
          : agent
      ));
    } else {
      // Create new agent
      const newAgent: Agent = {
        id: `agent-${Date.now()}`,
        name: formData.name,
        description: formData.description,
        category: formData.category,
        icon: FiDatabase, // Default icon
        createdAt: new Date().toISOString().split('T')[0],
        lastUsed: new Date().toISOString().split('T')[0],
        usageCount: 0,
        favorite: false,
      };
      setAgents([...agents, newAgent]);
    }
    onClose();
  };

  // Toggle favorite status
  const toggleFavorite = (agentId: string) => {
    setAgents(agents.map(agent => 
      agent.id === agentId 
        ? { ...agent, favorite: !agent.favorite }
        : agent
    ));
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
        <Heading size="md">에이전트 관리</Heading>
        <Button
          leftIcon={<AddIcon />}
          colorScheme="purple"
          onClick={handleCreateAgent}
        >
          새 에이전트
        </Button>
      </Flex>

      {/* Filters */}
      <Box
        px={6}
        py={4}
        borderBottom="1px"
        borderColor={borderColor}
      >
        <HStack spacing={4} mb={4}>
          <InputGroup maxW="400px">
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="에이전트 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              bg={secondaryBgColor}
              borderColor={borderColor}
              _focus={{ borderColor: accentColor }}
            />
          </InputGroup>
          
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} variant="outline">
              정렬: {sortBy === 'name' ? '이름순' : sortBy === 'usage' ? '사용량순' : '최근 사용순'}
            </MenuButton>
            <MenuList bg={secondaryBgColor} borderColor={borderColor}>
              <MenuItem onClick={() => setSortBy('name')} bg={sortBy === 'name' ? agentCardBg : 'transparent'}>
                이름순
              </MenuItem>
              <MenuItem onClick={() => setSortBy('usage')} bg={sortBy === 'usage' ? agentCardBg : 'transparent'}>
                사용량순
              </MenuItem>
              <MenuItem onClick={() => setSortBy('recent')} bg={sortBy === 'recent' ? agentCardBg : 'transparent'}>
                최근 사용순
              </MenuItem>
            </MenuList>
          </Menu>
          
          <Button
            leftIcon={<StarIcon />}
            variant={showFavoritesOnly ? "solid" : "outline"}
            colorScheme={showFavoritesOnly ? "yellow" : "gray"}
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          >
            즐겨찾기
          </Button>
        </HStack>
        
        <HStack spacing={2} overflowX="auto" py={2}>
          {agentCategories.map((category) => (
            <Button
              key={category.id}
              size="sm"
              colorScheme={selectedCategories.includes(category.id) ? "purple" : "gray"}
              variant={selectedCategories.includes(category.id) ? "solid" : "outline"}
              onClick={() => toggleCategory(category.id)}
              _hover={{ bg: selectedCategories.includes(category.id) ? undefined : 'gray.700' }}
            >
              {category.name}
            </Button>
          ))}
        </HStack>
      </Box>

      {/* Agent List */}
      <Box p={6}>
        {sortedAgents.length > 0 ? (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
            {sortedAgents.map(agent => (
              <Box
                key={agent.id}
                bg={agentCardBg}
                border="1px"
                borderColor={borderColor}
                borderRadius="md"
                overflow="hidden"
                transition="all 0.2s"
                _hover={{ borderColor: accentColor, transform: 'translateY(-2px)' }}
                cursor="pointer"
                onClick={() => router.push(`/agents/${agent.id}`)}
              >
                <Flex p={4} justify="space-between" align="center">
                  <HStack>
                    <Box
                      bg={accentColor}
                      p={2}
                      borderRadius="md"
                      color="white"
                    >
                      <Box as={agent.icon} />
                    </Box>
                    <Box>
                      <Heading size="sm" mb={1}>{agent.name}</Heading>
                      <Badge colorScheme="purple">
                        {agentCategories.find(c => c.id === agent.category)?.name}
                      </Badge>
                    </Box>
                  </HStack>
                  <IconButton
                    aria-label={agent.favorite ? "Remove from favorites" : "Add to favorites"}
                    icon={<StarIcon />}
                    size="sm"
                    variant="ghost"
                    color={agent.favorite ? "yellow.400" : "gray.400"}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(agent.id);
                    }}
                  />
                </Flex>
                <Divider borderColor={borderColor} />
                <Box p={4}>
                  <Text fontSize="sm" noOfLines={2} mb={2}>
                    {agent.description}
                  </Text>
                  <Flex justify="space-between" align="center" fontSize="xs" color="gray.400">
                    <Text>사용횟수: {agent.usageCount}</Text>
                    <Text>최근 사용: {agent.lastUsed}</Text>
                  </Flex>
                </Box>
                <Divider borderColor={borderColor} />
                <Flex p={2} justify="flex-end">
                  <IconButton
                    aria-label="Edit agent"
                    icon={<EditIcon />}
                    size="sm"
                    variant="ghost"
                    mr={2}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditAgent(agent);
                    }}
                  />
                  <IconButton
                    aria-label="Delete agent"
                    icon={<DeleteIcon />}
                    size="sm"
                    variant="ghost"
                    colorScheme="red"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteAgent(agent.id);
                    }}
                  />
                </Flex>
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
          >
            <Text mb={4} color="gray.500">검색 결과가 없습니다.</Text>
            <Button
              leftIcon={<AddIcon />}
              colorScheme="purple"
              onClick={handleCreateAgent}
            >
              새 에이전트 만들기
            </Button>
          </Flex>
        )}
      </Box>

      {/* Create/Edit Agent Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={secondaryBgColor} color={textColor}>
          <ModalHeader>{selectedAgent ? '에이전트 편집' : '새 에이전트 생성'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>이름</FormLabel>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="에이전트 이름"
                  bg={agentCardBg}
                  borderColor={borderColor}
                />
              </FormControl>
              <FormControl>
                <FormLabel>설명</FormLabel>
                <Input
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="에이전트 기능 설명"
                  bg={agentCardBg}
                  borderColor={borderColor}
                />
              </FormControl>
              <FormControl>
                <FormLabel>카테고리</FormLabel>
                <Select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  bg={agentCardBg}
                  borderColor={borderColor}
                >
                  {agentCategories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              취소
            </Button>
            <Button colorScheme="purple" onClick={handleSubmit}>
              {selectedAgent ? '저장' : '생성'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AgentsPage; 