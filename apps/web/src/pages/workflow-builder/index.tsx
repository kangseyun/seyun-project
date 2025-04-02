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
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  SimpleGrid,
  Badge,
  Divider,
  Tooltip,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from '@chakra-ui/react';
import {
  AddIcon,
  DeleteIcon,
  DownloadIcon,
  DragHandleIcon,
  HamburgerIcon,
  SearchIcon,
  SettingsIcon,
  SmallAddIcon,
  RepeatIcon,
  CheckIcon,
} from '@chakra-ui/icons';
import { FiDatabase, FiPlay, FiYoutube, FiFileText, FiImage, FiTag, FiTrendingUp, FiDollarSign, FiUsers, FiSearch, FiTarget } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { workflowTheme } from '@/utils/theme';

// 워크플로우 테마 색상 가져오기
const { workflow } = workflowTheme.colors;
const { bgColor, secondaryBgColor, borderColor, textColor, accentColor, agentCardBg } = workflow;

// Define types for our data
interface Agent {
  id: string;
  name: string;
  icon: React.ComponentType;
}

interface AgentCategory {
  id: string;
  name: string;
  agents: Agent[];
}

interface NodeData {
  name: string;
  category: string;
}

interface Node {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: NodeData;
}

interface Edge {
  id: string;
  source: string;
  target: string;
}

// Mock data for agent nodes
const agentCategories: AgentCategory[] = [
  {
    id: 'content-discovery',
    name: '콘텐츠 발굴',
    agents: [
      { id: 'trending-topics', name: '인기 주제 탐색', icon: FiTrendingUp },
      { id: 'profit-analysis', name: '수익성 분석', icon: FiDollarSign },
      { id: 'competitor-analysis', name: '경쟁사 분석', icon: FiUsers },
      { id: 'keyword-research', name: '키워드 리서치', icon: FiSearch },
      { id: 'niche-finder', name: '틈새 시장 발굴', icon: FiTarget },
    ]
  },
  {
    id: 'content-creation',
    name: '콘텐츠 생성',
    agents: [
      { id: 'youtube-video', name: '유튜브 비디오', icon: FiYoutube },
      { id: 'youtube-shorts', name: '유튜브 쇼츠', icon: FiPlay },
      { id: 'script-writing', name: '스크립트 작성', icon: FiFileText },
      { id: 'thumbnail', name: '썸네일 제작', icon: FiImage },
      { id: 'description-tags', name: '설명 및 태그', icon: FiTag },
    ]
  }
];

// Mock data for canvas nodes
const initialNodes: Node[] = [
  { id: '1', type: 'agent', position: { x: 250, y: 100 }, data: { name: '인기 주제 탐색', category: '콘텐츠 발굴' } },
  { id: '2', type: 'agent', position: { x: 250, y: 250 }, data: { name: '수익성 분석', category: '콘텐츠 발굴' } },
  { id: '3', type: 'agent', position: { x: 500, y: 175 }, data: { name: '스크립트 작성', category: '콘텐츠 생성' } },
];

// Mock data for connections
const initialEdges: Edge[] = [
  { id: '1-3', source: '1', target: '3' },
  { id: '2-3', source: '2', target: '3' },
];

const WorkflowBuilderPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCategory, setSelectedCategory] = useState('content-discovery');
  const [activeNode, setActiveNode] = useState<Node | null>(null);
  
  // This will be replaced with actual ReactFlow implementation
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const router = useRouter();

  // Mock function for adding a node
  const addNode = (agent: Agent) => {
    console.log('Adding node:', agent);
    // This would be implemented with ReactFlow
  };

  // Mock function for connecting nodes
  const onConnect = (params: { source: string; target: string }) => {
    console.log('Connecting nodes:', params);
    // This would be implemented with ReactFlow
  };

  // Mock function for node selection
  const onNodeClick = (node: Node) => {
    console.log('Selected node:', node);
    setActiveNode(node);
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
        <Heading size="md">워크플로우 빌더</Heading>
        <HStack spacing={4}>
          <Tooltip label="새 워크플로우" placement="bottom">
            <IconButton
              aria-label="New workflow"
              icon={<AddIcon />}
              variant="ghost"
              colorScheme="purple"
            />
          </Tooltip>
          <Tooltip label="저장" placement="bottom">
            <IconButton
              aria-label="Save workflow"
              icon={<DownloadIcon />}
              variant="ghost"
              colorScheme="purple"
            />
          </Tooltip>
          <Tooltip label="실행" placement="bottom">
            <IconButton
              aria-label="Run workflow"
              icon={<FiPlay />}
              variant="ghost"
              colorScheme="green"
            />
          </Tooltip>
          <Tooltip label="설정" placement="bottom">
            <IconButton
              aria-label="Settings"
              icon={<SettingsIcon />}
              variant="ghost"
              colorScheme="gray"
            />
          </Tooltip>
        </HStack>
      </Flex>

      <Flex h="calc(100vh - 57px)">
        {/* Left Sidebar - Agent Palette */}
        <Box
          w="300px"
          bg={secondaryBgColor}
          borderRight="1px"
          borderColor={borderColor}
          overflowY="auto"
        >
          <VStack align="stretch" spacing={0}>
            <HStack justify="space-between" p={4} borderBottom="1px" borderColor={borderColor}>
              <Heading size="sm">에이전트</Heading>
              <IconButton
                aria-label="Search agents"
                icon={<SearchIcon />}
                size="sm"
                variant="ghost"
              />
            </HStack>
            
            <Box p={2}>
              <HStack spacing={2} mb={4} overflowX="auto" py={2}>
                {agentCategories.map((category) => (
                  <Button
                    key={category.id}
                    size="sm"
                    colorScheme={selectedCategory === category.id ? "purple" : "gray"}
                    variant={selectedCategory === category.id ? "solid" : "outline"}
                    onClick={() => setSelectedCategory(category.id)}
                    _hover={{ bg: selectedCategory === category.id ? undefined : 'gray.700' }}
                  >
                    {category.name}
                  </Button>
                ))}
              </HStack>
              
              <VStack align="stretch" spacing={3}>
                {agentCategories
                  .find(cat => cat.id === selectedCategory)?.agents
                  .map(agent => (
                    <Box
                      key={agent.id}
                      bg={agentCardBg}
                      border="1px"
                      borderColor={borderColor}
                      borderRadius="md"
                      p={3}
                      cursor="grab"
                      _hover={{ borderColor: accentColor, shadow: 'md' }}
                      onClick={() => addNode(agent)}
                    >
                      <HStack>
                        <Box
                          bg={accentColor}
                          p={2}
                          borderRadius="md"
                          color="white"
                        >
                          <Box as={agent.icon} />
                        </Box>
                        <VStack align="start" spacing={0}>
                          <Text fontWeight="medium">{agent.name}</Text>
                          <Text fontSize="xs" color="gray.400">드래그하여 추가</Text>
                        </VStack>
                      </HStack>
                    </Box>
                  ))}
              </VStack>
            </Box>
          </VStack>
        </Box>

        {/* Main Canvas Area */}
        <Box flex="1" position="relative" bg="#0d1117" p={4}>
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg="#0d1117"
            backgroundImage="radial-gradient(#1c2536 1px, transparent 1px)"
            backgroundSize="30px 30px"
          >
            {/* This is a placeholder for the ReactFlow component */}
            <Flex h="100%" justify="center" align="center" direction="column">
              <Text fontSize="xl" color="gray.500" mb={4}>React Flow 컴포넌트가 여기에 렌더링됩니다.</Text>
              <Text color="gray.400">각 에이전트는 노드로 표시되고, 데이터 흐름은 선으로 연결됩니다.</Text>
              <Box mt={6}>
                <SimpleGrid columns={3} spacing={8}>
                  {nodes.map(node => (
                    <Box
                      key={node.id}
                      p={4}
                      bg={agentCardBg}
                      border="1px"
                      borderColor={borderColor}
                      borderRadius="md"
                      onClick={() => onNodeClick(node)}
                      _hover={{ borderColor: accentColor }}
                      boxShadow={activeNode === node ? `0 0 0 2px ${accentColor}` : 'none'}
                    >
                      <Badge colorScheme="purple" mb={2}>{node.data.category}</Badge>
                      <Text fontWeight="bold">{node.data.name}</Text>
                    </Box>
                  ))}
                </SimpleGrid>
              </Box>
            </Flex>
          </Box>
        </Box>

        {/* Right Sidebar - Node Properties */}
        {activeNode && (
          <Box
            w="300px"
            bg={secondaryBgColor}
            borderLeft="1px"
            borderColor={borderColor}
            p={4}
            overflowY="auto"
          >
            <VStack align="stretch" spacing={4}>
              <Heading size="sm">노드 속성</Heading>
              <Divider />
              
              <Box>
                <Text fontWeight="bold" mb={1}>이름</Text>
                <Text>{activeNode.data.name}</Text>
              </Box>
              
              <Box>
                <Text fontWeight="bold" mb={1}>카테고리</Text>
                <Badge colorScheme="purple">{activeNode.data.category}</Badge>
              </Box>
              
              <Box>
                <Text fontWeight="bold" mb={1}>입력</Text>
                <Text fontSize="sm" color="gray.400">이 노드로 연결되는 데이터 입력</Text>
              </Box>
              
              <Box>
                <Text fontWeight="bold" mb={1}>출력</Text>
                <Text fontSize="sm" color="gray.400">이 노드가 생성하는 데이터</Text>
              </Box>
              
              <Box>
                <Text fontWeight="bold" mb={1}>설정</Text>
                <VStack align="stretch" mt={2} spacing={2}>
                  <Button size="sm" leftIcon={<SettingsIcon />} variant="outline">
                    고급 설정
                  </Button>
                  <Button size="sm" leftIcon={<DeleteIcon />} colorScheme="red" variant="ghost">
                    노드 삭제
                  </Button>
                </VStack>
              </Box>
            </VStack>
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default WorkflowBuilderPage; 