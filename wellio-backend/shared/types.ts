export interface User {
  id: string;
  email: string;
  name: string;
  role: 'coach' | 'client';
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Coach extends User {
  role: 'coach';
  specialization?: string;
  experience?: number;
  bio?: string;
  hourlyRate?: number;
  availability?: Availability[];
}

export interface Client extends User {
  role: 'client';
  coachId: string;
  healthMetrics?: HealthMetrics;
  goals?: Goal[];
  program?: Program;
  status: 'active' | 'inactive' | 'pending';
}

export interface HealthMetrics {
  weight?: number;
  height?: number;
  age?: number;
  activityLevel?: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  dietaryRestrictions?: string[];
  medicalConditions?: string[];
  medications?: string[];
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  targetValue?: number;
  currentValue?: number;
  unit?: string;
  deadline?: Date;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  createdAt: Date;
}

export interface Program {
  id: string;
  name: string;
  description: string;
  duration: number; // in weeks
  focusAreas: string[];
  exercises: Exercise[];
  nutritionPlan?: NutritionPlan;
  createdAt: Date;
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  type: 'strength' | 'cardio' | 'flexibility' | 'balance';
  duration?: number; // in minutes
  sets?: number;
  reps?: number;
  weight?: number;
  instructions: string[];
}

export interface NutritionPlan {
  id: string;
  name: string;
  dailyCalories: number;
  macros: {
    protein: number;
    carbs: number;
    fat: number;
  };
  meals: Meal[];
}

export interface Meal {
  id: string;
  name: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  foods: Food[];
  totalCalories: number;
}

export interface Food {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  quantity: number;
  unit: string;
}

export interface Session {
  id: string;
  coachId: string;
  clientId: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  type: 'consultation' | 'training' | 'nutrition' | 'assessment';
  notes?: string;
  videoLink?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderType: 'coach' | 'client';
  content: string;
  type: 'text' | 'image' | 'file' | 'questionnaire' | 'reminder';
  attachments?: Attachment[];
  readAt?: Date;
  createdAt: Date;
}

export interface Attachment {
  id: string;
  filename: string;
  url: string;
  type: 'image' | 'pdf' | 'video' | 'other';
  size: number;
}

export interface Conversation {
  id: string;
  coachId: string;
  clientId: string;
  lastMessage?: Message;
  unreadCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Questionnaire {
  id: string;
  coachId: string;
  clientId: string;
  title: string;
  description: string;
  questions: Question[];
  status: 'draft' | 'sent' | 'completed' | 'expired';
  sentAt?: Date;
  completedAt?: Date;
  responses?: QuestionnaireResponse[];
  createdAt: Date;
}

export interface Question {
  id: string;
  text: string;
  type: 'text' | 'number' | 'select' | 'multiselect' | 'scale' | 'date';
  required: boolean;
  options?: string[];
  minValue?: number;
  maxValue?: number;
}

export interface QuestionnaireResponse {
  questionId: string;
  answer: string | number | string[] | Date;
  createdAt: Date;
}

export interface Template {
  id: string;
  coachId: string;
  name: string;
  type: 'message' | 'questionnaire' | 'reminder';
  content: string;
  variables?: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Automation {
  id: string;
  coachId: string;
  name: string;
  type: 'session_reminder' | 'birthday' | 're_engagement' | 'milestone' | 'custom';
  trigger: 'time_based' | 'event_based';
  conditions: AutomationCondition[];
  actions: AutomationAction[];
  isActive: boolean;
  createdAt: Date;
}

export interface AutomationCondition {
  field: string;
  operator: 'equals' | 'not_equals' | 'greater_than' | 'less_than' | 'contains';
  value: any;
}

export interface AutomationAction {
  type: 'send_message' | 'send_questionnaire' | 'create_session' | 'update_status';
  data: any;
}

export interface Analytics {
  id: string;
  coachId: string;
  type: 'retention' | 'revenue' | 'engagement' | 'performance';
  data: any;
  period: 'daily' | 'weekly' | 'monthly' | 'yearly';
  date: Date;
  createdAt: Date;
}

export interface Insight {
  id: string;
  coachId: string;
  type: 'churn_risk' | 'opportunity' | 'trend' | 'recommendation';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  data: any;
  isRead: boolean;
  createdAt: Date;
}

export interface Availability {
  id: string;
  coachId: string;
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
  isAvailable: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'message' | 'session' | 'reminder' | 'insight' | 'system';
  title: string;
  body: string;
  data?: any;
  isRead: boolean;
  createdAt: Date;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// WebSocket Types
export interface WebSocketMessage {
  type: 'message' | 'notification' | 'session_update' | 'analytics_update';
  data: any;
  timestamp: Date;
}

// Authentication Types
export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  role: 'coach' | 'client';
}

export interface MagicLinkRequest {
  email: string;
  role: 'coach' | 'client';
}

// Search and Filter Types
export interface SearchFilters {
  query?: string;
  status?: string;
  dateFrom?: Date;
  dateTo?: Date;
  type?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
} 