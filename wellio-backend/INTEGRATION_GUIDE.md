# Wellio Frontend-Backend Integration Guide

This guide explains how to integrate your existing React Native frontend with the new microservices backend architecture.

## 🎯 Overview

Your existing frontend has beautiful UI components and screens. This integration will:
- Connect your UI to real backend services
- Add AI-powered features
- Enable real-time chat
- Provide analytics and insights
- Maintain your current design and UX

## 📁 Current Frontend Structure

```
src/
├── screens/
│   ├── coach/
│   │   ├── DashboardScreen.tsx ✅ (Ready for backend)
│   │   ├── AnalyticsScreen.tsx ✅ (Ready for backend)
│   │   ├── ChatScreen.tsx ✅ (Ready for backend)
│   │   ├── ClientsScreen.tsx ✅ (Ready for backend)
│   │   ├── MessagesScreen.tsx ✅ (Ready for backend)
│   │   ├── QuestionnaireScreen.tsx ✅ (Ready for backend)
│   │   └── ClientOnboardingScreen.tsx ✅ (Ready for backend)
│   └── auth/
├── components/
├── theme/
└── navigation/
```

## 🔌 Integration Steps

### Step 1: Install API Client

The API client is already created in `src/services/api.ts`. It provides:
- Authentication methods
- CRUD operations for all entities
- Real-time WebSocket support
- AI service integration

### Step 2: Update Authentication Flow

Replace mock authentication with real backend calls:

```typescript
// In your auth screens
import { apiClient } from '../services/api';

const handleLogin = async (email: string, password: string) => {
  try {
    const response = await apiClient.login(email, password);
    if (response.success) {
      // Navigate to dashboard
      navigation.navigate('CoachDashboard');
    }
  } catch (error) {
    // Handle error
  }
};
```

### Step 3: Connect Dashboard Screen

Update `DashboardScreen.tsx` to fetch real data:

```typescript
import { apiClient } from '../../services/api';

const DashboardScreen = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const response = await apiClient.getDashboard();
      if (response.success) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error('Failed to load dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  // Your existing UI components with real data
  return (
    <ScrollView>
      {/* Today's Sessions */}
      <SessionsCard sessions={dashboardData?.sessions} />
      
      {/* Active Clients */}
      <ClientsCard clients={dashboardData?.clients} />
      
      {/* AI Insights */}
      <InsightsCard insights={dashboardData?.insights} />
      
      {/* Unread Messages */}
      <MessagesCard messages={dashboardData?.messages} />
    </ScrollView>
  );
};
```

### Step 4: Connect Chat Screen

Add real-time messaging to `ChatScreen.tsx`:

```typescript
import { apiClient } from '../../services/api';
import io from 'socket.io-client';

const ChatScreen = ({ route }) => {
  const { conversationId } = route.params;
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Load existing messages
    loadMessages();
    
    // Setup WebSocket connection
    setupWebSocket();
  }, []);

  const loadMessages = async () => {
    try {
      const response = await apiClient.getMessages(conversationId);
      if (response.success) {
        setMessages(response.data.data);
      }
    } catch (error) {
      console.error('Failed to load messages:', error);
    }
  };

  const setupWebSocket = () => {
    const newSocket = io('http://localhost:3000', {
      auth: {
        token: await AsyncStorage.getItem('auth_token')
      }
    });

    newSocket.on('new_message', (message) => {
      setMessages(prev => [...prev, message]);
    });

    setSocket(newSocket);
  };

  const sendMessage = async (content: string) => {
    try {
      await apiClient.sendMessage(conversationId, { content });
      // Message will be added via WebSocket
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  // Your existing UI with real data
  return (
    <View>
      <FlatList
        data={messages}
        renderItem={({ item }) => <MessageBubble message={item} />}
      />
      <MessageInput onSend={sendMessage} />
    </View>
  );
};
```

### Step 5: Connect Analytics Screen

Update `AnalyticsScreen.tsx` with real analytics:

```typescript
import { apiClient } from '../../services/api';

const AnalyticsScreen = () => {
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const [retention, revenue, insights] = await Promise.all([
        apiClient.getAnalytics('retention'),
        apiClient.getAnalytics('revenue'),
        apiClient.getInsights()
      ]);

      setAnalyticsData({
        retention: retention.data,
        revenue: revenue.data,
        insights: insights.data
      });
    } catch (error) {
      console.error('Failed to load analytics:', error);
    }
  };

  // Your existing charts with real data
  return (
    <ScrollView>
      <RetentionChart data={analyticsData?.retention} />
      <RevenueChart data={analyticsData?.revenue} />
      <InsightsList insights={analyticsData?.insights} />
    </ScrollView>
  );
};
```

### Step 6: Connect Clients Screen

Update `ClientsScreen.tsx` with real client data:

```typescript
import { apiClient } from '../../services/api';

const ClientsScreen = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    try {
      const response = await apiClient.getClients();
      if (response.success) {
        setClients(response.data.data);
      }
    } catch (error) {
      console.error('Failed to load clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const createClient = async (clientData) => {
    try {
      const response = await apiClient.createClient(clientData);
      if (response.success) {
        loadClients(); // Refresh list
      }
    } catch (error) {
      console.error('Failed to create client:', error);
    }
  };

  // Your existing UI with real data
  return (
    <View>
      <ClientsList 
        clients={clients}
        onClientPress={(client) => navigation.navigate('ClientProfile', { client })}
      />
      <AddClientButton onPress={() => navigation.navigate('ClientOnboarding')} />
    </View>
  );
};
```

### Step 7: Connect Questionnaire Screen

Update `QuestionnaireScreen.tsx` with AI integration:

```typescript
import { apiClient } from '../../services/api';

const QuestionnaireScreen = () => {
  const [questionnaires, setQuestionnaires] = useState([]);

  useEffect(() => {
    loadQuestionnaires();
  }, []);

  const loadQuestionnaires = async () => {
    try {
      const response = await apiClient.getQuestionnaires();
      if (response.success) {
        setQuestionnaires(response.data.data);
      }
    } catch (error) {
      console.error('Failed to load questionnaires:', error);
    }
  };

  const createQuestionnaire = async (questionnaireData) => {
    try {
      const response = await apiClient.createQuestionnaire(questionnaireData);
      if (response.success) {
        loadQuestionnaires();
      }
    } catch (error) {
      console.error('Failed to create questionnaire:', error);
    }
  };

  const sendQuestionnaire = async (questionnaireId, clientIds) => {
    try {
      await apiClient.sendQuestionnaire(questionnaireId, clientIds);
      // Show success message
    } catch (error) {
      console.error('Failed to send questionnaire:', error);
    }
  };

  // Your existing UI with real data
  return (
    <View>
      <QuestionnaireList 
        questionnaires={questionnaires}
        onSend={sendQuestionnaire}
      />
      <CreateQuestionnaireButton onPress={() => navigation.navigate('CreateQuestionnaire')} />
    </View>
  );
};
```

## 🤖 AI Integration Examples

### Chat AI Features

```typescript
// In ChatScreen.tsx
const analyzeMessage = async (message: string) => {
  try {
    const response = await apiClient.analyzeChatMessage(
      message,
      conversationId,
      userId,
      'coach'
    );
    
    if (response.success) {
      // Show AI insights
      showInsights(response.data);
    }
  } catch (error) {
    console.error('Failed to analyze message:', error);
  }
};

const generateResponse = async (message: string) => {
  try {
    const response = await apiClient.generateChatResponse(
      message,
      conversationId,
      userId,
      'coach'
    );
    
    if (response.success) {
      // Show AI response suggestions
      showResponseSuggestions(response.data.suggestions);
    }
  } catch (error) {
    console.error('Failed to generate response:', error);
  }
};
```

### Client Profile Generation

```typescript
// In ClientOnboardingScreen.tsx
const generateProfile = async (responses: any) => {
  try {
    const response = await apiClient.generateClientProfile(
      responses,
      clientId,
      coachId
    );
    
    if (response.success) {
      // Navigate to generated profile
      navigation.navigate('ClientProfile', { 
        profile: response.data 
      });
    }
  } catch (error) {
    console.error('Failed to generate profile:', error);
  }
};
```

### Analytics Insights

```typescript
// In AnalyticsScreen.tsx
const generateInsights = async () => {
  try {
    const response = await apiClient.generateInsights(
      coachId,
      'performance',
      { from: '2024-01-01', to: '2024-12-31' }
    );
    
    if (response.success) {
      setInsights(response.data);
    }
  } catch (error) {
    console.error('Failed to generate insights:', error);
  }
};

const predictChurn = async () => {
  try {
    const response = await apiClient.predictChurn(coachId);
    
    if (response.success) {
      setChurnRisk(response.data);
    }
  } catch (error) {
    console.error('Failed to predict churn:', error);
  }
};
```

## 🔄 State Management Integration

### Redux Integration

```typescript
// actions/authActions.ts
export const loginUser = (email: string, password: string) => async (dispatch) => {
  try {
    dispatch({ type: 'LOGIN_REQUEST' });
    
    const response = await apiClient.login(email, password);
    
    if (response.success) {
      dispatch({ 
        type: 'LOGIN_SUCCESS', 
        payload: response.data 
      });
    } else {
      dispatch({ 
        type: 'LOGIN_FAILURE', 
        payload: response.error 
      });
    }
  } catch (error) {
    dispatch({ 
      type: 'LOGIN_FAILURE', 
      payload: error.message 
    });
  }
};

// actions/clientsActions.ts
export const fetchClients = (params) => async (dispatch) => {
  try {
    dispatch({ type: 'FETCH_CLIENTS_REQUEST' });
    
    const response = await apiClient.getClients(params);
    
    if (response.success) {
      dispatch({ 
        type: 'FETCH_CLIENTS_SUCCESS', 
        payload: response.data 
      });
    }
  } catch (error) {
    dispatch({ 
      type: 'FETCH_CLIENTS_FAILURE', 
      payload: error.message 
    });
  }
};
```

## 📱 Real-time Features

### WebSocket Integration

```typescript
// services/websocket.ts
import io from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';

class WebSocketService {
  private socket: any = null;

  async connect() {
    const token = await AsyncStorage.getItem('auth_token');
    
    this.socket = io('http://localhost:3000', {
      auth: { token }
    });

    this.socket.on('connect', () => {
      console.log('WebSocket connected');
    });

    this.socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
    });
  }

  onMessage(callback) {
    this.socket.on('new_message', callback);
  }

  onTyping(callback) {
    this.socket.on('user_typing', callback);
  }

  sendMessage(conversationId: string, content: string) {
    this.socket.emit('send_message', {
      conversationId,
      content
    });
  }

  sendTyping(conversationId: string) {
    this.socket.emit('typing', { conversationId });
  }
}

export const wsService = new WebSocketService();
```

## 🧪 Testing Integration

### API Mocking for Development

```typescript
// services/apiMock.ts
export const mockApiClient = {
  login: async (email: string, password: string) => ({
    success: true,
    data: {
      token: 'mock-token',
      user: { id: '1', email, role: 'coach' }
    }
  }),
  
  getDashboard: async () => ({
    success: true,
    data: {
      sessions: mockSessions,
      clients: mockClients,
      insights: mockInsights,
      messages: mockMessages
    }
  }),
  
  // ... other mock methods
};

// Use mock in development
const apiClient = __DEV__ ? mockApiClient : realApiClient;
```

## 🚀 Deployment Checklist

### Environment Configuration

```bash
# .env
API_BASE_URL=http://localhost:3000/api
AI_BASE_URL=http://localhost:8001/ai
WEBSOCKET_URL=http://localhost:3000
```

### Production Configuration

```bash
# .env.production
API_BASE_URL=https://api.wellio.com/api
AI_BASE_URL=https://ai.wellio.com/ai
WEBSOCKET_URL=https://api.wellio.com
```

### Error Handling

```typescript
// utils/errorHandler.ts
export const handleApiError = (error: any) => {
  if (error.message === 'Unauthorized') {
    // Redirect to login
    navigation.navigate('Login');
  } else if (error.message === 'Network Error') {
    // Show offline message
    showOfflineMessage();
  } else {
    // Show generic error
    showErrorMessage(error.message);
  }
};
```

## 📊 Performance Optimization

### Caching Strategy

```typescript
// services/cache.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export const cacheData = async (key: string, data: any) => {
  await AsyncStorage.setItem(key, JSON.stringify({
    data,
    timestamp: Date.now()
  }));
};

export const getCachedData = async (key: string, maxAge: number = 5 * 60 * 1000) => {
  const cached = await AsyncStorage.getItem(key);
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < maxAge) {
      return data;
    }
  }
  return null;
};
```

## 🔧 Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure backend CORS is configured for your frontend URL
2. **WebSocket Connection**: Check if WebSocket server is running and accessible
3. **Authentication**: Verify JWT token is being sent correctly
4. **API Endpoints**: Confirm all endpoints match between frontend and backend

### Debug Tools

```typescript
// Enable API logging in development
if (__DEV__) {
  console.log('API Request:', { url, method, body });
  console.log('API Response:', response);
}
```

## 🎉 Next Steps

1. **Start Backend Services**: Follow the backend README to start all services
2. **Update Frontend**: Replace mock data with API calls using this guide
3. **Test Integration**: Verify all features work with real backend
4. **Add AI Features**: Implement AI-powered features gradually
5. **Deploy**: Deploy both frontend and backend to production

Your beautiful UI is now ready to connect to a powerful, scalable backend with AI capabilities! 