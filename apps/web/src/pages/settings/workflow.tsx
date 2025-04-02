import React, { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  FormControl,
  FormLabel,
  Input,
  Divider,
  Switch,
  Select,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Badge,
  useToast,
  InputGroup,
  InputRightElement,
  IconButton,
  useColorMode,
} from '@chakra-ui/react';
import { CheckIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import { getThemeColors } from '@/utils/theme';

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

interface WorkflowSettingsPageProps {
  themeProps?: ThemeProps;
}

const WorkflowSettingsPage = ({ themeProps }: WorkflowSettingsPageProps) => {
  const toast = useToast();
  const router = useRouter();
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
  const formBgColor = cardBgColor;
  const secondaryBgColor = colorMode === 'dark' ? '#1c2536' : '#f0f5fa';
  
  // 설정 상태 관리
  const [aiSettings, setAiSettings] = useState({
    openaiApiKey: "sk-••••••••••••••••••••••••••••••••••••••••••",
    useGpt4: true,
    temperature: 0.7,
    maxTokens: 1000,
    backupModel: "gpt-3.5-turbo",
  });
  
  const [workflowSettings, setWorkflowSettings] = useState({
    autoSave: true,
    autoSaveInterval: 5,
    maxConcurrentRuns: 3,
    saveDirectory: "/home/user/workflows",
    useVersioning: true,
    notifyOnCompletion: true,
    debugMode: false,
  });
  
  const [showApiKey, setShowApiKey] = useState(false);
  
  // 설정 저장 핸들러
  const saveSettings = () => {
    // 실제 구현에서는 API로 설정을 저장
    toast({
      title: "설정이 저장되었습니다.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  // 폼 입력 변경 핸들러 - AI 설정
  const handleAiSettingChange = (field: string, value: any) => {
    setAiSettings({
      ...aiSettings,
      [field]: value,
    });
  };
  
  // 폼 입력 변경 핸들러 - 워크플로우 설정
  const handleWorkflowSettingChange = (field: string, value: any) => {
    setWorkflowSettings({
      ...workflowSettings,
      [field]: value,
    });
  };

  return (
    <Box
      bg={bgColor}
      minH="100vh"
      color={textColor}
    >
      {/* 헤더 */}
      <Flex
        px={6}
        py={3}
        bg={secondaryBgColor}
        borderBottom="1px"
        borderColor={borderColor}
        justify="space-between"
        align="center"
      >
        <Heading size="md">워크플로우 설정</Heading>
        <Button
          colorScheme="purple"
          onClick={saveSettings}
        >
          설정 저장
        </Button>
      </Flex>

      <Box p={6}>
        <Tabs colorScheme="purple">
          <TabList>
            <Tab>AI 모델 설정</Tab>
            <Tab>워크플로우 환경</Tab>
            <Tab>백업 및 복원</Tab>
          </TabList>
          
          <TabPanels>
            {/* AI 모델 설정 */}
            <TabPanel>
              <VStack spacing={6} align="stretch">
                <Box>
                  <Heading size="sm" mb={4}>API 키 설정</Heading>
                  <FormControl mb={4}>
                    <FormLabel>OpenAI API 키</FormLabel>
                    <InputGroup>
                      <Input
                        value={aiSettings.openaiApiKey}
                        onChange={(e) => handleAiSettingChange('openaiApiKey', e.target.value)}
                        type={showApiKey ? "text" : "password"}
                        placeholder="sk-..."
                        bg={formBgColor}
                        borderColor={borderColor}
                      />
                      <InputRightElement>
                        <IconButton
                          aria-label={showApiKey ? "Hide API key" : "Show API key"}
                          icon={showApiKey ? <ViewOffIcon /> : <ViewIcon />}
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowApiKey(!showApiKey)}
                        />
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                  
                  <FormControl display="flex" alignItems="center" mb={4}>
                    <FormLabel mb="0">
                      GPT-4 사용
                    </FormLabel>
                    <Switch
                      colorScheme="purple"
                      isChecked={aiSettings.useGpt4}
                      onChange={(e) => handleAiSettingChange('useGpt4', e.target.checked)}
                    />
                  </FormControl>
                  
                  <FormControl mb={4}>
                    <FormLabel>백업 모델</FormLabel>
                    <Select
                      value={aiSettings.backupModel}
                      onChange={(e) => handleAiSettingChange('backupModel', e.target.value)}
                      bg={formBgColor}
                      borderColor={borderColor}
                    >
                      <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                      <option value="llama-3-8b">Llama 3 (8B)</option>
                      <option value="claude-instant">Claude Instant</option>
                    </Select>
                  </FormControl>
                </Box>
                
                <Divider borderColor={borderColor} />
                
                <Box>
                  <Heading size="sm" mb={4}>생성 파라미터</Heading>
                  <FormControl mb={6}>
                    <FormLabel>Temperature ({aiSettings.temperature})</FormLabel>
                    <Slider
                      value={aiSettings.temperature}
                      min={0}
                      max={1}
                      step={0.1}
                      onChange={(val) => handleAiSettingChange('temperature', val)}
                      colorScheme="purple"
                    >
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                      <SliderThumb />
                    </Slider>
                    <Flex justify="space-between" mt={1}>
                      <Text fontSize="xs" color="gray.500">정확한 응답</Text>
                      <Text fontSize="xs" color="gray.500">창의적인 응답</Text>
                    </Flex>
                  </FormControl>
                  
                  <FormControl>
                    <FormLabel>최대 토큰 수</FormLabel>
                    <Input
                      type="number"
                      value={aiSettings.maxTokens}
                      onChange={(e) => handleAiSettingChange('maxTokens', parseInt(e.target.value))}
                      bg={formBgColor}
                      borderColor={borderColor}
                    />
                    <Text fontSize="xs" color="gray.500" mt={1}>
                      더 긴 응답을 생성하려면 값을 높게 설정하세요.
                    </Text>
                  </FormControl>
                </Box>
              </VStack>
            </TabPanel>
            
            {/* 워크플로우 환경 */}
            <TabPanel>
              <VStack spacing={6} align="stretch">
                <Box>
                  <Heading size="sm" mb={4}>일반 설정</Heading>
                  
                  <FormControl display="flex" alignItems="center" mb={4}>
                    <FormLabel mb="0">
                      자동 저장
                    </FormLabel>
                    <Switch
                      colorScheme="purple"
                      isChecked={workflowSettings.autoSave}
                      onChange={(e) => handleWorkflowSettingChange('autoSave', e.target.checked)}
                    />
                  </FormControl>
                  
                  {workflowSettings.autoSave && (
                    <FormControl mb={4}>
                      <FormLabel>자동 저장 간격 (분)</FormLabel>
                      <Input
                        type="number"
                        value={workflowSettings.autoSaveInterval}
                        onChange={(e) => handleWorkflowSettingChange('autoSaveInterval', parseInt(e.target.value))}
                        bg={formBgColor}
                        borderColor={borderColor}
                      />
                    </FormControl>
                  )}
                  
                  <FormControl mb={4}>
                    <FormLabel>최대 동시 실행 수</FormLabel>
                    <Select
                      value={workflowSettings.maxConcurrentRuns}
                      onChange={(e) => handleWorkflowSettingChange('maxConcurrentRuns', parseInt(e.target.value))}
                      bg={formBgColor}
                      borderColor={borderColor}
                    >
                      <option value="1">1 (최소 리소스)</option>
                      <option value="2">2</option>
                      <option value="3">3 (균형)</option>
                      <option value="5">5</option>
                      <option value="10">10 (높은 성능)</option>
                    </Select>
                    <Text fontSize="xs" color="gray.500" mt={1}>
                      시스템 리소스에 따라 조정하세요.
                    </Text>
                  </FormControl>
                  
                  <FormControl mb={4}>
                    <FormLabel>워크플로우 저장 경로</FormLabel>
                    <Input
                      value={workflowSettings.saveDirectory}
                      onChange={(e) => handleWorkflowSettingChange('saveDirectory', e.target.value)}
                      bg={formBgColor}
                      borderColor={borderColor}
                    />
                  </FormControl>
                </Box>
                
                <Divider borderColor={borderColor} />
                
                <Box>
                  <Heading size="sm" mb={4}>고급 설정</Heading>
                  
                  <FormControl display="flex" alignItems="center" mb={4}>
                    <FormLabel mb="0">
                      버전 관리 사용
                    </FormLabel>
                    <Switch
                      colorScheme="purple"
                      isChecked={workflowSettings.useVersioning}
                      onChange={(e) => handleWorkflowSettingChange('useVersioning', e.target.checked)}
                    />
                  </FormControl>
                  
                  <FormControl display="flex" alignItems="center" mb={4}>
                    <FormLabel mb="0">
                      완료 시 알림
                    </FormLabel>
                    <Switch
                      colorScheme="purple"
                      isChecked={workflowSettings.notifyOnCompletion}
                      onChange={(e) => handleWorkflowSettingChange('notifyOnCompletion', e.target.checked)}
                    />
                  </FormControl>
                  
                  <FormControl display="flex" alignItems="center">
                    <FormLabel mb="0">
                      디버그 모드
                      <Badge ml={2} colorScheme="red" fontSize="xs">개발자용</Badge>
                    </FormLabel>
                    <Switch
                      colorScheme="red"
                      isChecked={workflowSettings.debugMode}
                      onChange={(e) => handleWorkflowSettingChange('debugMode', e.target.checked)}
                    />
                  </FormControl>
                </Box>
              </VStack>
            </TabPanel>
            
            {/* 백업 및 복원 */}
            <TabPanel>
              <VStack spacing={8} align="stretch">
                <Box>
                  <Heading size="sm" mb={4}>워크플로우 백업</Heading>
                  <Text mb={4}>현재 워크플로우 설정과 템플릿을 백업합니다.</Text>
                  <Button leftIcon={<CheckIcon />} colorScheme="purple">
                    백업 생성
                  </Button>
                </Box>
                
                <Divider borderColor={borderColor} />
                
                <Box>
                  <Heading size="sm" mb={4}>백업에서 복원</Heading>
                  <Text mb={4}>이전에 만든 백업에서 워크플로우 설정을 복원합니다.</Text>
                  <HStack>
                    <Input
                      placeholder="백업 파일 선택..."
                      readOnly
                      bg={formBgColor}
                      borderColor={borderColor}
                    />
                    <Button>찾아보기</Button>
                  </HStack>
                  <Button mt={4} isDisabled>
                    선택한 백업에서 복원
                  </Button>
                </Box>
                
                <Divider borderColor={borderColor} />
                
                <Box>
                  <Heading size="sm" mb={4}>초기화</Heading>
                  <Text mb={4} color="red.300">
                    모든 워크플로우 설정을 기본값으로 초기화합니다. 이 작업은 취소할 수 없습니다.
                  </Text>
                  <Button colorScheme="red" variant="outline">
                    설정 초기화
                  </Button>
                </Box>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default WorkflowSettingsPage; 