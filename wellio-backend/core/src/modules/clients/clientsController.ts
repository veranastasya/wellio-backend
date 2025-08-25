import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import { ClientSchema, ClientDTO } from '@wellio/shared';
import { logger } from '../../common/logger';
import { getRepo } from '../../data/repo';

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

export const getClients = async (req: Request, res: Response) => {
  try {
    const filters = req.query as unknown as ClientFilters;
    logger.info('Getting clients', { userId: req.user?.id, filters });

    const repo = await getRepo();
    const page = filters.page || 1;
    const page_size = filters.page_size || 20;
    const query = filters.query || "";

    const { items, total } = await repo.listClients({ page, page_size, query });

    // Apply additional filters that aren't in the repo yet
    let filteredItems = items;
    if (filters.status) {
      filteredItems = filteredItems.filter(client => client.attention_status === filters.status);
    }
    if (filters.service) {
      filteredItems = filteredItems.filter(client => client.services.includes(filters.service!));
    }

    const totalPages = Math.ceil(total / page_size);
    const response: PaginatedResponse<ClientDTO> = {
      data: filteredItems,
      pagination: {
        page,
        page_size,
        total,
        total_pages: totalPages,
        has_next: page < totalPages
      }
    };

    res.json({
      success: true,
      ...response
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

    const repo = await getRepo();
    const client = await repo.getClient(id);

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

    const repo = await getRepo();
    const newClient = await repo.createClient(clientData);

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

    const repo = await getRepo();
    const updatedClient = await repo.updateClient(id, updateData);

    if (!updatedClient) {
      return res.status(404).json({
        error: {
          code: 'NOT_FOUND',
          message: 'Client not found'
        }
      });
    }

    res.json({
      success: true,
      data: updatedClient
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

    const repo = await getRepo();
    const services = await repo.getDistinctServices();
    const statuses = await repo.getDistinctAttentionStatuses();

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
