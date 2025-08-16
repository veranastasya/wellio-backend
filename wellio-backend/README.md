# Wellio Backend - Microservices Architecture

A comprehensive backend system for the Wellio wellness coaching platform, built with microservices architecture, AI/ML integration, and real-time communication.

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Native  │    │   Web Client    │    │   Admin Panel   │
│     Frontend    │    │   (Future)      │    │   (Future)      │
└─────────┬───────┘    └─────────┬───────┘    └─────────┬───────┘
          │                      │                      │
          └──────────────────────┼──────────────────────┘
                                 │
                    ┌─────────────▼─────────────┐
                    │      API Gateway          │
                    │     (Port 3000)          │
                    └─────────────┬─────────────┘
                                  │
        ┌─────────────────────────┼─────────────────────────┐
        │                         │                         │
┌───────▼────────┐    ┌──────────▼──────────┐    ┌────────▼────────┐
│   Auth Service  │    │   Chat Service      │    │ Analytics Service│
│   (Port 4001)   │    │   (Port 4002)       │    │   (Port 4003)   │
└─────────────────┘    └─────────────────────┘    └─────────────────┘
        │                         │                         │
┌───────▼────────┐    ┌──────────▼──────────┐    ┌────────▼────────┐
│Notifications Svc│    │   AI Service        │    │   Database      │
│   (Port 4004)   │    │   (Port 8001)       │    │   (PostgreSQL)  │
└─────────────────┘    └─────────────────────┘    └─────────────────┘
        │                         │                         │
        └─────────────────────────┼─────────────────────────┘
                                  │
                    ┌─────────────▼─────────────┐
                    │      Infrastructure       │
                    │  Redis • RabbitMQ • etc  │
                    └───────────────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 18+ 
- Python 3.11+
- Git

### 1. Clone and Setup
```bash
# Clone the backend repository
git clone <backend-repo-url>
cd wellio-backend

# Install dependencies for all services
npm run install:all
```

### 2. Environment Configuration
```bash
# Copy environment template
cp .env.example .env

# Edit environment variables
nano .env
```

### 3. Start All Services
```bash
# Start with Docker (recommended)
docker-compose up -d

# Or start services individually
npm run dev
```

### 4. Verify Installation
```bash
# Check API Gateway
curl http://localhost:3000/health

# Check Auth Service
curl http://localhost:4001/health

# Check AI Service
curl http://localhost:8001/health
```

## 📁 Service Structure

### API Gateway (Port 3000)
- **Purpose**: Single entry point for all client requests
- **Features**: 
  - Request routing and load balancing
  - Authentication middleware
  - Rate limiting
  - CORS handling
  - WebSocket proxy for real-time features

### Auth Service (Port 4001)
- **Purpose**: User authentication and authorization
- **Features**:
  - JWT token management
  - User registration/login
  - Role-based access control
  - Password reset with magic links
  - OAuth2 integration (Google, Apple)

### Chat Service (Port 4002)
- **Purpose**: Real-time messaging and communication
- **Features**:
  - WebSocket connections
  - Message persistence
  - File uploads
  - Typing indicators
  - Message status tracking

### Analytics Service (Port 4003)
- **Purpose**: Business intelligence and data analysis
- **Features**:
  - Client performance tracking
  - Session analytics
  - Revenue reporting
  - Custom metrics
  - Data export

### Notifications Service (Port 4004)
- **Purpose**: Push notifications and alerts
- **Features**:
  - Push notification delivery
  - Email notifications
  - SMS integration
  - Notification preferences
  - Delivery tracking

### AI Service (Port 8001)
- **Purpose**: AI/ML powered features
- **Features**:
  - Chat message analysis
  - Client profile generation
  - Churn prediction
  - Program recommendations
  - Automated insights

## 🔧 Development Setup

### Individual Service Development
```bash
# Auth Service
cd services/auth
npm run dev

# Chat Service  
cd services/chat
npm run dev

# Analytics Service
cd services/analytics
npm run dev

# AI Service
cd services/ai
python -m uvicorn main:app --reload --port 8001
```

### Database Setup
```bash
# PostgreSQL (via Docker)
docker-compose up postgres

# Run migrations
cd services/auth
npm run migrate

# Seed data (optional)
npm run seed
```

### Redis Setup
```bash
# Redis (via Docker)
docker-compose up redis

# Test connection
redis-cli ping
```

## 🔌 API Integration

### Frontend Integration
The React Native app connects to the backend via the API Gateway:

```typescript
// Example API call from frontend
import { apiClient } from './src/services/api';

// Login
const response = await apiClient.login(email, password);

// Get dashboard data
const dashboard = await apiClient.getDashboard();

// Send message
await apiClient.sendMessage(conversationId, {
  content: "Hello!",
  type: "text"
});
```

### WebSocket Integration
```typescript
// Real-time chat
import io from 'socket.io-client';

const socket = io('http://localhost:3000', {
  auth: {
    token: userToken
  }
});

socket.on('new_message', (message) => {
  // Handle incoming message
});

socket.emit('send_message', {
  conversationId: '123',
  content: 'Hello!'
});
```

## 🤖 AI/ML Features

### Chat Analysis
- Sentiment analysis of messages
- Intent recognition
- Automated response suggestions
- Conversation flow optimization

### Client Profiling
- Health metrics analysis
- Goal tracking
- Progress prediction
- Personalized recommendations

### Business Intelligence
- Churn prediction
- Revenue forecasting
- Client segmentation
- Performance insights

### Automated Messaging
- Smart templates
- Context-aware responses
- Engagement optimization
- A/B testing

## 🔐 Security Features

### Authentication
- JWT tokens with refresh mechanism
- Role-based access control
- Session management
- Multi-factor authentication (future)

### Data Protection
- End-to-end encryption for messages
- Secure file uploads
- GDPR compliance
- Data anonymization

### API Security
- Rate limiting
- Input validation
- SQL injection prevention
- XSS protection

## 📊 Monitoring & Logging

### Health Checks
```bash
# Check all services
curl http://localhost:3000/health
curl http://localhost:4001/health
curl http://localhost:4002/health
curl http://localhost:4003/health
curl http://localhost:4004/health
curl http://localhost:8001/health
```

### Logs
```bash
# View logs
docker-compose logs -f api-gateway
docker-compose logs -f auth
docker-compose logs -f chat
docker-compose logs -f analytics
docker-compose logs -f notifications
docker-compose logs -f ai-service
```

## 🚀 Deployment

### Production Setup
```bash
# Build production images
docker-compose -f docker-compose.prod.yml build

# Deploy to production
docker-compose -f docker-compose.prod.yml up -d
```

### Environment Variables
```bash
# Production environment
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@host:5432/wellio
REDIS_URL=redis://host:6379
JWT_SECRET=your-super-secret-key
OPENAI_API_KEY=your-openai-key
```

## 🔄 Data Flow Examples

### Session Booking Flow
1. Coach creates session via frontend
2. Frontend → API Gateway → Analytics Service
3. Analytics Service → Database (store session)
4. Notifications Service → Send reminders
5. Chat Service → Notify client via WebSocket

### Chat Message Flow
1. User sends message via frontend
2. Frontend → API Gateway → Chat Service
3. Chat Service → AI Service (analyze message)
4. AI Service → Generate insights/recommendations
5. Chat Service → Store message + broadcast via WebSocket

### Questionnaire Analysis Flow
1. Client submits questionnaire
2. Frontend → API Gateway → Analytics Service
3. Analytics Service → AI Service (analyze responses)
4. AI Service → Generate client profile
5. Analytics Service → Store profile + insights

## 🧪 Testing

### Unit Tests
```bash
# Run all tests
npm test

# Test specific service
cd services/auth && npm test
cd services/chat && npm test
cd services/analytics && npm test
```

### Integration Tests
```bash
# Test API endpoints
npm run test:integration

# Test WebSocket connections
npm run test:websocket
```

### Load Testing
```bash
# Test API performance
npm run test:load

# Test WebSocket scalability
npm run test:websocket:load
```

## 📈 Performance Optimization

### Caching Strategy
- Redis for session storage
- Redis for API response caching
- Redis for WebSocket connections
- Database query optimization

### Scaling Considerations
- Horizontal scaling for stateless services
- Database read replicas
- CDN for static assets
- Load balancing with nginx

## 🔧 Troubleshooting

### Common Issues

**Service won't start:**
```bash
# Check logs
docker-compose logs <service-name>

# Check environment variables
docker-compose config

# Restart service
docker-compose restart <service-name>
```

**Database connection issues:**
```bash
# Check PostgreSQL
docker-compose exec postgres psql -U wellio_user -d wellio

# Check Redis
docker-compose exec redis redis-cli ping
```

**WebSocket connection issues:**
```bash
# Check WebSocket server
curl -I http://localhost:3000

# Test WebSocket connection
wscat -c ws://localhost:3000
```

## 📚 Additional Resources

- [API Documentation](docs/api.md)
- [Database Schema](docs/schema.md)
- [Deployment Guide](docs/deployment.md)
- [Contributing Guidelines](CONTRIBUTING.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 