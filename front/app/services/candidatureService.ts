import api from '@/app/lib/axios';
import { Candidature } from '@/app/types';

export const candidatureService = {
  async create(data: Candidature): Promise<string> {
    const response = await api.post('/candidatures', data);
    return response.data;
  },

  async getMyCandidatures(): Promise<Candidature[]> {
    const response = await api.get<Candidature[]>('/candidatures/me');
    return response.data;
  },

  async getAll(): Promise<Candidature[]> {
    const response = await api.get<Candidature[]>('/candidatures/all');
    return response.data;
  },

  async update(id: number, data: Candidature): Promise<string> {
    const response = await api.put(`/candidatures/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<string> {
    const response = await api.delete(`/candidatures/${id}`);
    return response.data;
  },

  async updateStatus(id: number, status: string): Promise<string> {
    const response = await api.put(`/candidatures/${id}/status?status=${status}`);
    return response.data;
  },
};
