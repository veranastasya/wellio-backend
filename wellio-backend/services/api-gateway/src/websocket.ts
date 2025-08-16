import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { logger } from './utils/logger';

export const setupWebSocket = (io: Server) => {
  // Authentication middleware for WebSocket
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    
    if (!token) {
      return next(new Error('Authentication error'));
    }

    try {
      const secret = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';
      const decoded = jwt.verify(token, secret) as {
        id: string;
        email: string;
        role: 'coach' | 'client';
      };
      
      socket.data.user = decoded;
      next();
    } catch (error) {
      return next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket) => {
    const user = socket.data.user;
    logger.info(`User ${user.email} connected`);

    // Join user-specific room
    socket.join(`user:${user.id}`);

    // Join role-specific room
    if (user.role === 'coach') {
      socket.join('coaches');
    } else {
      socket.join('clients');
    }

    // Handle chat messages
    socket.on('send_message', (data) => {
      // Broadcast to conversation participants
      socket.to(`conversation:${data.conversationId}`).emit('new_message', data);
    });

    // Handle typing indicators
    socket.on('typing', (data) => {
      socket.to(`conversation:${data.conversationId}`).emit('user_typing', {
        userId: user.id,
        conversationId: data.conversationId
      });
    });

    // Handle session updates
    socket.on('session_update', (data) => {
      if (user.role === 'coach') {
        socket.to(`user:${data.clientId}`).emit('session_updated', data);
      } else {
        socket.to(`user:${data.coachId}`).emit('session_updated', data);
      }
    });

    // Handle notifications
    socket.on('notification_read', (data) => {
      // Update notification status
      logger.info(`Notification ${data.notificationId} marked as read by ${user.id}`);
    });

    socket.on('disconnect', () => {
      logger.info(`User ${user.email} disconnected`);
    });
  });

  return io;
}; 