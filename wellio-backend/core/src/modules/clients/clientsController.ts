import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import { ClientSchema, ClientDTO } from '@wellio/shared';
import { logger } from '../../common/logger';

// Define types locally for now
type Client = z.infer<typeof ClientSchema>;
type CreateClient = Omit<Client, 'id' | 'joined_at'>;
type UpdateClient = Partial<Omit<Client, 'id' | 'joined_at'>>;
type ClientFilters = {
  query?: string;
  status?: string;
  service?: string;
  page?: number;
  page_size?: number;
};
type PaginatedResponse<T> = {
  data: T[];
  pagination: {
    page: number;
    page_size: number;
    total: number;
    total_pages: number;
    has_next: boolean;
  };
};

// Mock data - in production this would come from database
const mockClients: Client[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    full_name: 'Emma Johnson',
    email: 'emma.johnson@email.com',
    phone: '+1-555-0123',
    services: ['nutrition', 'fitness'],
    attention_status: 'on_track',
    joined_at: '2024-01-15T10:00:00Z',
    next_session_at: '2024-02-01T14:00:00Z',
    tags: { priority: 'high', goals: ['weight_loss'] }
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    full_name: 'Michael Chen',
    email: 'michael.chen@email.com',
    phone: '+1-555-0124',
    services: ['fitness'],
    attention_status: 'needs_attention',
    joined_at: '2024-01-10T09:00:00Z',
    next_session_at: null,
    tags: { priority: 'medium', goals: ['muscle_gain'] }
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    full_name: 'Sarah Williams',
    email: 'sarah.williams@email.com',
    phone: '+1-555-0125',
    services: ['nutrition', 'wellness'],
    attention_status: 'on_track',
    joined_at: '2024-01-20T11:00:00Z',
    next_session_at: '2024-01-30T16:00:00Z',
    tags: { priority: 'low', goals: ['general_health'] }
  }
];

export const getClients = async (req: Request, res: Response) => {
  try {
    const filters = req.query as unknown as ClientFilters;
    logger.info('Getting clients', { userId: req.user?.id, filters });

    let filteredClients = [...mockClients];

    // Apply filters
    if (filters.query) {
      const query = filters.query.toLowerCase();
      filteredClients = filteredClients.filter(client =>
        client.full_name.toLowerCase().includes(query) ||
        client.email.toLowerCase().includes(query)
      );
    }

    if (filters.status) {
      filteredClients = filteredClients.filter(client =>
        client.attention_status === filters.status
      );
    }

    if (filters.service) {
      filteredClients = filteredClients.filter(client =>
        client.services.includes(filters.service!)
      );
    }

    // Apply pagination
    const page = filters.page || 1;
    const pageSize = filters.page_size || 20;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedClients = filteredClients.slice(startIndex, endIndex);

    const response: PaginatedResponse<Client> = {
      data: paginatedClients,
      pagination: {
        page,
        page_size: pageSize,
        total: filteredClients.length,
        total_pages: Math.ceil(filteredClients.length / pageSize),
        has_next: endIndex < filteredClients.length
      }
    };

    res.json({
      success: true,
      data: response
    });
  } catch (error) {
    logger.error('Error getting clients:', error);
    res.status(500).json({
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to get clients'
      }
    });
  }
};

export const getClient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    logger.info('Getting client', { userId: req.user?.id, clientId: id });

    const client = mockClients.find(c => c.id === id);

    if (!client) {
      return res.status(404).json({
        error: {
          code: 'NOT_FOUND',
          message: 'Client not found'
        }
      });
    }

    res.json({
      success: true,
      data: client
    });
  } catch (error) {
    logger.error('Error getting client:', error);
    res.status(500).json({
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to get client'
      }
    });
  }
};

export const createClient = async (req: Request, res: Response) => {
  try {
    const clientData = req.body as CreateClient;
    logger.info('Creating client', { userId: req.user?.id, clientData });

    const newClient: Client = {
      id: uuidv4(),
      ...clientData,
      joined_at: new Date().toISOString(),
      next_session_at: null,
      tags: clientData.tags || {}
    };

    mockClients.push(newClient);

    res.status(201).json({
      success: true,
      data: newClient
    });
  } catch (error) {
    logger.error('Error creating client:', error);
    res.status(500).json({
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to create client'
      }
    });
  }
};

export const updateClient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body as UpdateClient;
    logger.info('Updating client', { userId: req.user?.id, clientId: id, updateData });

    const clientIndex = mockClients.findIndex(c => c.id === id);

    if (clientIndex === -1) {
      return res.status(404).json({
        error: {
          code: 'NOT_FOUND',
          message: 'Client not found'
        }
      });
    }

    mockClients[clientIndex] = {
      ...mockClients[clientIndex],
      ...updateData
    };

    res.json({
      success: true,
      data: mockClients[clientIndex]
    });
  } catch (error) {
    logger.error('Error updating client:', error);
    res.status(500).json({
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to update client'
      }
    });
  }
};

export const getClientFacets = async (req: Request, res: Response) => {
  try {
    logger.info('Getting client facets', { userId: req.user?.id });

    // Extract facets from mock data
    const services = [...new Set(mockClients.flatMap(c => c.services))];
    const statuses = [...new Set(mockClients.map(c => c.attention_status))];

    res.json({
      success: true,
      data: {
        services,
        statuses
      }
    });
  } catch (error) {
    logger.error('Error getting client facets:', error);
    res.status(500).json({
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to get client facets'
      }
    });
  }
};
