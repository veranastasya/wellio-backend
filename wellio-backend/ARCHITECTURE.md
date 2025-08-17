# Wellio Backend Architecture

## Overview

The Wellio backend has been restructured to implement a clean microservices architecture with a Core API that handles all domain-specific operations, separate Auth and Chat services, and proper API Gateway routing.

## Architecture Components

### API Gateway (Port 3000)
- **Purpose**: Single entry point for all client requests
- **Routing**:
  - `/api/v1/auth/*` → Auth Service (4001)
  - `/api/v1/conversations/*` and `/api/v1/messages/*` → Chat Service (4002)
  - All other `/api/v1/*` → Core API (4000)
- **Features**: Authentication middleware, rate limiting, CORS, request logging

### Core API (Port 4000)
- **Purpose**: Main business logic service handling all domain operations
- **Modules**:
  - `clients` - Client management (CRUD, filtering, facets)
  - `sessions` - Session management (scheduling, joining, status updates)
  - `insights` - Business insights and analytics
  - `analytics` - Data analysis and reporting
  - `onboarding` - Client onboarding workflows
  - `uploads` - File upload handling
  - `integrations` - Third-party integrations (MFP, FatSecret)
  - `notifications` - Notification management
  - `search` - Global search functionality

### Auth Service (Port 4001)
- **Purpose**: Authentication and authorization
- **Endpoints**: Login, register, refresh, password reset
- **Features**: JWT token management, Redis session storage

### Chat Service (Port 4002)
- **Purpose**: Real-time messaging and conversations
- **Features**: WebSocket support, message persistence, file attachments

### AI Service (Port 8001)
- **Purpose**: AI/ML powered features (internal RPC)
- **Features**: Churn prediction, optimal scheduling, scoring

### Worker Service (Port 7000)
- **Purpose**: Background job processing
- **Features**: Analytics calculations, data imports, message templates

## API Structure

### Authentication
All API requests (except auth endpoints) require a JWT Bearer token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

### Response Format
Standardized response format:
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional message"
}
```

### Error Format
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message",
    "details": { ... }
  }
}
```

### Pagination
Consistent pagination using `page` and `page_size` parameters:
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "page_size": 20,
    "total": 100,
    "total_pages": 5,
    "has_next": true
  }
}
```

## Key Endpoints

### Home Dashboard
- `GET /api/v1/home/summary` - Dashboard summary data

### Clients
- `GET /api/v1/clients` - List clients with filtering
- `GET /api/v1/clients/{id}` - Get client details
- `POST /api/v1/clients` - Create new client
- `PATCH /api/v1/clients/{id}` - Update client
- `GET /api/v1/clients/facets` - Get filtering options

### Sessions
- `GET /api/v1/sessions` - List sessions with filtering
- `GET /api/v1/sessions/{id}` - Get session details
- `POST /api/v1/sessions` - Create new session
- `PATCH /api/v1/sessions/{id}` - Update session
- `POST /api/v1/sessions/{id}/join` - Join session

### Analytics
- `GET /api/v1/analytics/summary` - Analytics summary
- `GET /api/v1/predictions/churn` - Churn predictions
- `GET /api/v1/analytics/optimal-scheduling` - Scheduling recommendations
- `GET /api/v1/analytics/revenue-forecast` - Revenue forecasting
- `GET /api/v1/analytics/export` - Data export

### Chat
- `GET /api/v1/conversations` - List conversations
- `GET /api/v1/conversations/{id}/messages` - Get messages
- `POST /api/v1/messages` - Send message
- `GET /api/v1/messages/unread-count` - Unread count

### Search
- `GET /api/v1/search` - Global search across clients, conversations, sessions

## Database Schema

### Core Tables
- `clients` - Client information and status
- `sessions` - Session scheduling and management
- `messages` - Chat messages
- `conversations` - Chat conversations
- `insights` - Business insights and analytics
- `availability` - Coach availability
- `notifications` - User notifications
- `import_jobs` - Data import tracking

## Development Setup

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- PostgreSQL 15+
- Redis 7+

### Local Development
```bash
# Install dependencies
npm run install:all

# Start all services
npm run dev

# Or use Docker
docker-compose up -d
```

### Environment Variables
Each service has its own `.env` file with service-specific configuration:
- `PORT` - Service port
- `DATABASE_URL` - PostgreSQL connection string
- `REDIS_URL` - Redis connection string
- `JWT_SECRET` - JWT signing secret
- `CORS_ORIGIN` - Allowed CORS origins

## SDK Generation

The Core API includes OpenAPI specification and SDK generation:
```bash
# Generate TypeScript SDK
npm run build:sdk
```

The generated SDK is available in `core/sdk/` and can be used by the frontend.

## Testing

### Health Checks
All services provide health check endpoints:
- Gateway: `GET /health`
- Core API: `GET /health`
- Auth Service: `GET /health`
- Chat Service: `GET /health`
- AI Service: `GET /health`
- Worker Service: `GET /health`

### Running Tests
```bash
# Run all tests
npm test

# Test specific service
cd core && npm test
```

## Deployment

### Docker Deployment
```bash
# Build all services
docker-compose build

# Start production stack
docker-compose -f docker-compose.prod.yml up -d
```

### Environment Configuration
Production deployments should use:
- Strong JWT secrets
- SSL/TLS termination
- Database connection pooling
- Redis clustering
- Load balancing
- Monitoring and logging

## Monitoring

### Logging
All services use structured logging with request IDs for tracing.

### Metrics
Key metrics to monitor:
- API response times
- Error rates
- Database connection pool usage
- Redis memory usage
- Service health status

## Security

### Authentication
- JWT tokens with refresh mechanism
- Token expiration and rotation
- Secure password hashing (bcrypt)

### API Security
- Rate limiting
- Input validation (Zod schemas)
- CORS configuration
- Helmet security headers

### Data Protection
- Database connection encryption
- Sensitive data encryption at rest
- Audit logging for data access
