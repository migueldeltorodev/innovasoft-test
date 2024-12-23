import axiosInstance from './axiosConfig';

export const clientService = {
  listClients: async () => {
    const response = await axiosInstance.get('clients');
    return response.data;
  },

  createClient: async (clientData: any) => {
    const response = await axiosInstance.post('clients', clientData);
    return response.data;
  },

  updateClient: async (clientId: number, clientData: any) => {
    const response = await axiosInstance.put(`clients/${clientId}`, clientData);
    return response.data;
  },

  deleteClient: async (clientId: number) => {
    const response = await axiosInstance.delete(`clients/${clientId}`);
    return response.data;
  },

  listInterests: async () => {
    const response = await axiosInstance.get('interests');
    return response.data;
  },
};