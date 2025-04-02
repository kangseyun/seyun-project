import React from "react";
import { useAuthenticated } from "@refinedev/core";
import { useRouter } from "next/router";
import {
  Box,
  Heading,
  Text,
  Container,
  Grid,
  GridItem,
  Button,
  Card,
  CardHeader,
  CardBody,
  Flex,
  Center,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Badge,
  Icon,
  HStack,
  VStack,
  Progress,
  Divider,
  useColorModeValue,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  IconButton,
  List,
  ListItem,
  ListIcon,
  ChakraProvider,
  useColorMode,
} from "@chakra-ui/react";
import { dashboardTheme, getThemeColors } from "@/utils/theme";

import { 
  FiServer, 
  FiUsers, 
  FiActivity, 
  FiCpu, 
  FiGlobe, 
  FiSettings, 
  FiDatabase, 
  FiShield, 
  FiAirplay, 
  FiMenu,
  FiHome,
  FiBarChart2,
  FiAlertCircle,
  FiTerminal,
  FiLayers,
  FiGitPullRequest,
  FiCheckCircle,
  FiXCircle,
  FiTrendingUp,
  FiFileText,
  FiImage,
  FiVideo,
  FiCalendar,
  FiPlus,
  FiChevronDown,
  FiChevronRight,
  FiSun,
  FiMoon,
  FiBox,
  FiBriefcase,
  FiKey,
  FiLoader,
  FiCodesandbox,
  FiLink,
  FiCode,
  FiPackage,
  FiCommand,
  FiFeather,
  FiGrid,
  FiFilter,
  FiTool,
  FiGitBranch,
  FiAward,
  FiCloud,
  FiSearch,
  FiEdit,
  FiSend,
  FiPause,
  FiSkipForward,
  FiPlay,
} from "react-icons/fi";

// 사이드바 항목 타입 정의
interface SidebarItem {
  id: string;
  icon: React.ComponentType;
  label: string;
  subItems?: SubItem[]; // 하위 메뉴 항목
}

// 하위 메뉴 항목 타입
interface SubItem {
  id: string;
  label: string;
  icon?: React.ComponentType;
}

// 사이드바 콘텐츠 컴포넌트 Props 타입 정의
interface SidebarContentProps {
  items: SidebarItem[];
  activeItem: string;
  setActiveItem: (id: string) => void;
  accentColor: string;
  borderColor: string;
  subTextColor: string;
  textColor: string;
}

/**
 * 대시보드 페이지 컴포넌트
 * 미래지향적 DevOps 스타일
 */
interface DashboardProps {
  children?: React.ReactNode;
}

export default function Dashboard({ children }: DashboardProps) {
  const { data: authData, isLoading } = useAuthenticated();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeSidebarItem, setActiveSidebarItem] = React.useState("dashboard");
  const { colorMode, toggleColorMode } = useColorMode();
  
  // 테마에 따른 색상 설정
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
  } = getThemeColors(colorMode as 'light' | 'dark');

  // 사이드바 항목 데이터
  const sidebarItems: SidebarItem[] = [
    { id: "dashboard", icon: FiHome, label: "대시보드" },
    { 
      id: "workflow-management", 
      icon: FiGitBranch, 
      label: "워크플로우",
      subItems: [
        { id: "workflow-builder", label: "워크플로우 빌더" },
        { id: "workflow-runs", label: "워크플로우 실행" },
        { id: "workflows", label: "워크플로우 갤러리" },
        { id: "agents", label: "에이전트 관리" },
      ]
    },
    { 
      id: "content-discovery", 
      icon: FiSearch, 
      label: "콘텐츠 발굴",
      subItems: [
        { id: "trending-topics", label: "인기 주제 탐색" },
        { id: "revenue-analysis", label: "수익성 분석" },
        { id: "competitor-research", label: "경쟁사 분석" },
        { id: "keyword-research", label: "키워드 리서치" },
        { id: "niche-finder", label: "틈새 시장 발굴" }
      ]
    },
    { 
      id: "content-creation", 
      icon: FiEdit, 
      label: "콘텐츠 생성",
      subItems: [
        { id: "youtube-video", label: "유튜브 비디오" },
        { id: "youtube-shorts", label: "유튜브 쇼츠" },
        { id: "script-writing", label: "스크립트 작성" },
        { id: "thumbnail-creation", label: "썸네일 제작" },
        { id: "description-tags", label: "설명 및 태그" }
      ]
    },
    { 
      id: "multilingual", 
      icon: FiGlobe, 
      label: "다국어 변환",
      subItems: [
        { id: "auto-translate", label: "자동 번역" },
        { id: "voice-localization", label: "음성 현지화" },
        { id: "subtitle-generation", label: "자막 생성" },
        { id: "cultural-adaptation", label: "문화적 조정" },
        { id: "language-management", label: "언어 관리" }
      ]
    },
    { 
      id: "publishing", 
      icon: FiSend, 
      label: "발행 관리",
      subItems: [
        { id: "youtube-publishing", label: "유튜브 발행" },
        { id: "account-management", label: "계정 관리" },
        { id: "publishing-schedule", label: "발행 일정" },
        { id: "batch-uploader", label: "일괄 업로드" },
        { id: "publishing-history", label: "발행 이력" }
      ]
    },
    { 
      id: "analytics", 
      icon: FiBarChart2, 
      label: "성과 분석",
      subItems: [
        { id: "youtube-analytics", label: "유튜브 분석" },
        { id: "revenue-tracking", label: "수익 추적" },
        { id: "audience-insights", label: "시청자 인사이트" },
        { id: "performance-compare", label: "언어별 성과 비교" }
      ]
    },
    { 
      id: "platforms", 
      icon: FiLayers, 
      label: "플랫폼 확장",
      subItems: [
        { id: "platform-youtube", label: "유튜브" },
        { id: "platform-tiktok", label: "틱톡 (준비중)" },
        { id: "platform-instagram", label: "인스타그램 (준비중)" },
        { id: "platform-facebook", label: "페이스북 (준비중)" },
        { id: "platform-blog", label: "블로그 (준비중)" }
      ]
    },
    { 
      id: "ai-models", 
      icon: FiCodesandbox, 
      label: "AI 모델",
      subItems: [
        { id: "models-connect", label: "모델 연결" },
        { id: "models-settings", label: "모델 설정" },
        { id: "prompt-library", label: "프롬프트 라이브러리" },
        { id: "voice-models", label: "음성 모델" }
      ]
    },
    { 
      id: "settings", 
      icon: FiSettings, 
      label: "설정",
      subItems: [
        { id: "api-connections", label: "API 연결 관리" },
        { id: "account-settings", label: "계정 설정" },
        { id: "workflow-settings", label: "워크플로우 설정" },
        { id: "notification-settings", label: "알림 설정" }
      ]
    },
  ];

  // 서버 상태 데이터를 콘텐츠 플랫폼 상태 데이터로 변경
  const platformStatusData = [
    { name: "유튜브", status: "정상", uptime: "99.98%", load: 23 },
    { name: "틱톡", status: "정상", uptime: "99.95%", load: 45 },
    { name: "블로그", status: "주의", uptime: "99.82%", load: 68 },
    { name: "인스타그램", status: "정상", uptime: "100%", load: 12 },
  ];

  // 배포 데이터를 콘텐츠 발행 데이터로 변경
  const contentPublishData = [
    { env: "유튜브", status: "성공", time: "오늘 12:45", version: "브이로그" },
    { env: "틱톡", status: "성공", time: "오늘 10:30", version: "쇼츠" },
    { env: "블로그", status: "실패", time: "어제", version: "튜토리얼" },
    { env: "워드프레스", status: "성공", time: "3일 전", version: "리뷰" }
  ];

  // CPU 사용량 데이터를 번역 상태 데이터로 변경
  const translationStatusData = {
    current: 32,
    max: 100,
    avg: 28,
    trend: "상승"
  };

  // 메모리 사용량 데이터를 콘텐츠 생성 현황 데이터로 변경
  const contentGenerationData = {
    current: 45,
    max: 64,
    unit: "개", 
    percent: 70
  };

  // 인증되지 않은 사용자는 로그인 페이지로 리다이렉트
  // React.useEffect(() => {
  //   if (!authData?.authenticated) {
  //     router.push("/login");
  //   }
  // }, [authData, router]);

  // 로딩 상태 처리
  if (isLoading) {
    return (
      <ChakraProvider theme={dashboardTheme}>
        <Box bg={bgColor} minH="100vh" color={textColor}>
          <Center py={10}>
            <VStack spacing={4}>
              <Icon as={FiCpu} boxSize={12} color={accentColor} />
              <Heading size="md">시스템 초기화 중...</Heading>
              <Progress 
                size="xs" 
                w="240px" 
                colorScheme="purple" 
                isIndeterminate 
                borderRadius="full"
              />
            </VStack>
          </Center>
        </Box>
      </ChakraProvider>
    );
  }

  return (
    <ChakraProvider theme={dashboardTheme}>
      <Box bg={bgColor} minH="100vh" color={textColor} overflowX="hidden">
        {/* 모바일 메뉴 버튼 */}
        <IconButton
          display={{ base: "flex", md: "none" }}
          aria-label="메뉴 열기"
          icon={<FiMenu />}
          onClick={onOpen}
          position="fixed"
          top={4}
          left={4}
          zIndex={20}
          bg={accentColor}
          color="white"
          _hover={{ bg: "#6366f1" }}
        />

        {/* 모바일 사이드바 */}
        <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent bg={cardBgColor} color={textColor}>
            <DrawerHeader borderBottomWidth="1px" borderColor={borderColor} p={3}>
              <Flex align="center" gap={2}>
                <Icon as={FiCpu} color={accentColor} boxSize={4} />
                <Text fontSize="15px" fontWeight="500" color={textColor}>콘텐츠 자동화</Text>
              </Flex>
            </DrawerHeader>
            <DrawerBody p={0}>
              <SidebarContent 
                items={sidebarItems} 
                activeItem={activeSidebarItem}
                setActiveItem={setActiveSidebarItem}
                accentColor={accentColor}
                borderColor={borderColor}
                subTextColor={subTextColor}
                textColor={textColor}
              />
            </DrawerBody>
          </DrawerContent>
        </Drawer>

        {/* 데스크탑 사이드바 */}
        <Box
          position="fixed"
          left={0}
          w="220px"
          h="100vh"
          bg={cardBgColor}
          borderRight="1px"
          borderColor={borderColor}
          display={{ base: "none", md: "block" }}
        >
          <Flex direction="column" h="full">
            <Box p={3} borderBottom="1px" borderColor={borderColor}>
              <Flex align="center" gap={2}>
                <Icon as={FiCpu} color={accentColor} boxSize={4} />
                <Heading size="md" color={textColor} letterSpacing="-0.02em">콘텐츠 자동화</Heading>
              </Flex>
            </Box>
            <Box flex="1" overflowY="auto">
              <SidebarContent 
                items={sidebarItems} 
                activeItem={activeSidebarItem}
                setActiveItem={setActiveSidebarItem}
                accentColor={accentColor}
                borderColor={borderColor}
                subTextColor={subTextColor}
                textColor={textColor}
              />
            </Box>
            <Box p={3} borderTop="1px" borderColor={borderColor}>
              <HStack>
                <Icon as={FiShield} color={accentColor} boxSize={3} />
                <Text fontSize="12px">시스템 보안 활성화됨</Text>
              </HStack>
            </Box>
          </Flex>
        </Box>

        {/* 메인 콘텐츠 */}
        <Box 
          ml={{ base: 0, md: "220px" }} 
          p={{ base: 3, md: 5 }}
          pt={{ base: 16, md: 5 }}
        >
          <Container maxW="full">
            {/* 상단 헤더 */}
            <Flex mb={5} justify="space-between" align="center">
              <Box>
                <Heading size="lg" mb={1} color={textColor} letterSpacing="-0.03em">유튜브 콘텐츠 자동화 센터</Heading>
                <Text color={subTextColor} fontSize="13px">오늘 {new Date().toLocaleString()}</Text>
              </Box>
              <HStack spacing={3}>
                <IconButton
                  aria-label="테마 변경"
                  icon={colorMode === 'dark' ? <FiSun /> : <FiMoon />}
                  onClick={toggleColorMode}
                  size="sm"
                  borderRadius="6px"
                  colorScheme={colorMode === 'dark' ? "yellow" : "purple"}
                />
                <Button 
                  leftIcon={<FiKey />} 
                  size="sm" 
                  borderRadius="6px" 
                  fontWeight="500"
                  variant="outline"
                  color={textColor}
                  borderColor={borderColor}
                  _hover={{ bg: `${accentColor}15` }}
                >
                  API 키 관리
                </Button>
                <Badge colorScheme="green" px={2} py={1} borderRadius="full" fontSize="11px">
                  모든 시스템 정상 작동 중
                </Badge>
                <Button leftIcon={<FiPlay />} colorScheme="purple" size="sm" borderRadius="6px" fontWeight="500">
                  자동화 파이프라인 실행
                </Button>
              </HStack>
            </Flex>

            {/* 대시보드 콘텐츠 영역 - 대시보드 경로일 때만 표시 */}
            {router.pathname === '/dashboard' && (
              <>
                {/* 상태 요약 카드 */}
                <Grid 
                  templateColumns={{ base: "1fr", md: "repeat(5, 1fr)" }} 
                  gap={4}
                  mb={5}
                >
                  <GridItem>
                    <Card bg={cardBgColor} borderColor={borderColor} borderWidth="1px" h="130px">
                      <CardBody py={3}>
                        <Flex justify="space-between" align="flex-start">
                          <Box>
                            <Text color={subTextColor} fontSize="13px" mb={1}>발굴된 주제</Text>
                            <Heading size="2xl" color={textColor} mb={1}>28</Heading>
                            <Text mt={1} color={successColor} fontSize="12px">
                              <Icon as={FiTrendingUp} mr={1} /> 새 트렌드 12개
                            </Text>
                          </Box>
                          <Box position="relative" w="40px" h="40px">
                            <Icon 
                              as={FiSearch} 
                              position="absolute"
                              top={0}
                              right={0}
                              boxSize={8} 
                              color={accentColor} 
                              opacity={0.8} 
                            />
                          </Box>
                        </Flex>
                      </CardBody>
                    </Card>
                  </GridItem>
                  
                  <GridItem>
                    <Card bg={cardBgColor} borderColor={borderColor} borderWidth="1px" h="130px">
                      <CardBody py={3}>
                        <Flex justify="space-between" align="flex-start">
                          <Box>
                            <Text color={subTextColor} fontSize="13px" mb={1}>생성된 콘텐츠</Text>
                            <Heading size="2xl" color={textColor} mb={1}>15</Heading>
                            <Text mt={1} color={warningColor} fontSize="12px">
                              <Icon as={FiAlertCircle} mr={1} /> 5개 검토 필요
                            </Text>
                          </Box>
                          <Box position="relative" w="40px" h="40px">
                            <Icon 
                              as={FiEdit} 
                              position="absolute"
                              top={0}
                              right={0}
                              boxSize={8} 
                              color={accentColor} 
                              opacity={0.8} 
                            />
                          </Box>
                        </Flex>
                      </CardBody>
                    </Card>
                  </GridItem>
                  
                  <GridItem>
                    <Card bg={cardBgColor} borderColor={borderColor} borderWidth="1px" h="130px">
                      <CardBody py={3}>
                        <Flex justify="space-between" align="flex-start">
                          <Box>
                            <Text color={subTextColor} fontSize="13px" mb={1}>번역된 콘텐츠</Text>
                            <Heading size="2xl" color={textColor} mb={1}>42</Heading>
                            <Text mt={1} color={successColor} fontSize="12px">
                              <Icon as={FiCheckCircle} mr={1} /> 7개 언어
                            </Text>
                          </Box>
                          <Box position="relative" w="40px" h="40px">
                            <Icon 
                              as={FiGlobe} 
                              position="absolute"
                              top={0}
                              right={0}
                              boxSize={8} 
                              color={accentColor} 
                              opacity={0.8}
                            />
                          </Box>
                        </Flex>
                      </CardBody>
                    </Card>
                  </GridItem>
                  
                  <GridItem>
                    <Card bg={cardBgColor} borderColor={borderColor} borderWidth="1px" h="130px">
                      <CardBody py={3}>
                        <Flex justify="space-between" align="flex-start">
                          <Box>
                            <Text color={subTextColor} fontSize="13px" mb={1}>발행된 콘텐츠</Text>
                            <Heading size="2xl" color={textColor} mb={1}>36</Heading>
                            <Text mt={1} color={successColor} fontSize="12px">
                              <Icon as={FiCheckCircle} mr={1} /> 오늘 3개 업로드
                            </Text>
                          </Box>
                          <Box position="relative" w="40px" h="40px">
                            <Icon 
                              as={FiSend} 
                              position="absolute"
                              top={0}
                              right={0}
                              boxSize={8} 
                              color={accentColor} 
                              opacity={0.8}
                            />
                          </Box>
                        </Flex>
                      </CardBody>
                    </Card>
                  </GridItem>
                  
                  <GridItem>
                    <Card bg={cardBgColor} borderColor={borderColor} borderWidth="1px" h="130px">
                      <CardBody py={3}>
                        <Flex justify="space-between" align="flex-start">
                          <Box>
                            <Text color={subTextColor} fontSize="13px" mb={1}>총 조회수</Text>
                            <Heading size="2xl" color={textColor} mb={1}>245K</Heading>
                            <Text mt={1} color={successColor} fontSize="12px">
                              <Icon as={FiTrendingUp} mr={1} /> 18% 증가
                            </Text>
                          </Box>
                          <Box position="relative" w="40px" h="40px">
                            <Icon 
                              as={FiBarChart2} 
                              position="absolute"
                              top={0}
                              right={0}
                              boxSize={8} 
                              color={accentColor} 
                              opacity={0.8}
                            />
                          </Box>
                        </Flex>
                      </CardBody>
                    </Card>
                  </GridItem>
                </Grid>
                
                {/* 기존 대시보드 내용 계속... */}
              </>
            )}

            {/* 서브페이지 콘텐츠 영역 - 대시보드가 아닌 경로일 때 표시 */}
            {router.pathname !== '/dashboard' && (
              <Box 
                bg={cardBgColor} 
                borderRadius="lg" 
                p={5} 
                borderWidth="1px" 
                borderColor={borderColor}
                minH="70vh"
              >
                {React.cloneElement(children as React.ReactElement, {
                  themeProps: {
                    bgColor,
                    cardBgColor,
                    accentColor,
                    successColor,
                    warningColor,
                    errorColor,
                    textColor,
                    subTextColor,
                    borderColor,
                    colorMode
                  }
                })}
              </Box>
            )}
          </Container>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

// 사이드바 콘텐츠 컴포넌트
function SidebarContent({ 
  items, 
  activeItem, 
  setActiveItem, 
  accentColor, 
  borderColor, 
  subTextColor,
  textColor
}: SidebarContentProps) {
  const [expandedItems, setExpandedItems] = React.useState<{[key: string]: boolean}>({});
  const router = useRouter();

  // 하위 메뉴 토글 함수
  const toggleSubMenu = (itemId: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  // 메뉴 클릭 핸들러
  const handleItemClick = (item: SidebarItem) => {
    if (item.subItems && item.subItems.length > 0) {
      toggleSubMenu(item.id);
    } else {
      setActiveItem(item.id);
      navigateToPage(item.id);
    }
  };

  // 하위 메뉴 클릭 핸들러
  const handleSubItemClick = (subItemId: string) => {
    setActiveItem(subItemId);
    navigateToPage(subItemId);
  };

  // 페이지 이동 함수
  const navigateToPage = (itemId: string) => {
    switch (itemId) {
      case 'dashboard':
        router.push('/dashboard');
        break;
      case 'workflow-builder':
        router.push('/workflow-builder');
        break;
      case 'workflow-runs':
        router.push('/workflow-runs');
        break;
      case 'workflows':
        router.push('/workflows');
        break;
      case 'agents':
        router.push('/agents');
        break;
      case 'workflow-settings':
        router.push('/settings/workflow');
        break;
      default:
        // 아직 구현되지 않은 페이지는 대시보드로 이동하고 알림 표시 (실제 구현시 알림 로직 추가)
        console.log(`페이지 ${itemId}는 아직 구현되지 않았습니다.`);
        break;
    }
  };

  return (
    <List spacing={0} py={2}>
      {items.map((item) => (
        <React.Fragment key={item.id}>
          <ListItem 
            onClick={() => handleItemClick(item)}
            cursor="pointer"
            pl={3}
            pr={2}
            py={1.5}
            bg={activeItem === item.id || activeItem.startsWith(`${item.id}-`) ? `${accentColor}15` : "transparent"}
            borderLeftWidth={activeItem === item.id || activeItem.startsWith(`${item.id}-`) ? "2px" : "0px"}
            borderColor={accentColor}
            _hover={{ bg: `${accentColor}10` }}
            transition="all 0.15s"
            borderRadius="0 4px 4px 0"
          >
            <Flex align="center" justify="space-between">
              <Flex align="center">
                <Icon 
                  as={item.icon} 
                  color={activeItem === item.id || activeItem.startsWith(`${item.id}-`) ? accentColor : subTextColor}
                  boxSize={4}
                  mr={2}
                />
                <Text 
                  fontWeight={activeItem === item.id || activeItem.startsWith(`${item.id}-`) ? "500" : "400"}
                  color={activeItem === item.id || activeItem.startsWith(`${item.id}-`) ? textColor : subTextColor}
                  fontSize="13px"
                >
                  {item.label}
                </Text>
              </Flex>
              {item.subItems && item.subItems.length > 0 && (
                <Icon 
                  as={expandedItems[item.id] ? FiChevronDown : FiChevronRight} 
                  color={subTextColor}
                  boxSize={3.5}
                />
              )}
            </Flex>
          </ListItem>
          
          {/* 하위 메뉴 */}
          {item.subItems && expandedItems[item.id] && (
            <Box pl={4} pr={2} bg={`${accentColor}05`} borderLeft="1px" borderColor={borderColor}>
              {item.subItems.map(subItem => (
                <ListItem 
                  key={subItem.id}
                  onClick={() => handleSubItemClick(subItem.id)}
                  cursor="pointer"
                  py={1.5}
                  pl={3}
                  _hover={{ bg: `${accentColor}10` }}
                  borderLeft="1px"
                  borderColor={activeItem === subItem.id ? accentColor : "transparent"}
                  bg={activeItem === subItem.id ? `${accentColor}10` : "transparent"}
                  borderRadius="0 4px 4px 0"
                >
                  <Flex align="center">
                    {subItem.icon && (
                      <Icon 
                        as={subItem.icon} 
                        color={activeItem === subItem.id ? accentColor : subTextColor}
                        boxSize={3.5}
                        mr={1.5}
                      />
                    )}
                    <Text 
                      fontSize="12px"
                      fontWeight={activeItem === subItem.id ? "500" : "400"}
                      color={activeItem === subItem.id ? textColor : subTextColor}
                    >
                      {subItem.label}
                    </Text>
                  </Flex>
                </ListItem>
              ))}
            </Box>
          )}
        </React.Fragment>
      ))}
    </List>
  );
} 