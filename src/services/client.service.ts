import axios from 'axios';
import { tokenUtils } from '../utils/token.utils';
import { defaultInterests } from '../utils/default-interests';

const API_URL = 'https://pruebareactjs.test-class.com/Api';

// Interfaz que coincide con la API
interface IClientAPI {
  id?: string;
  nombre: string;
  apellidos: string;
  identificacion: string;
  celular: string;
  otroTelefono: string;
  direccion: string;
  fNacimiento: string;
  fAfiliacion: string;
  sexo: string;
  resennaPersonal: string;
  imagen: string;
  interesesId?: string;
  usuarioId: string;
}

// Interfaz para uso interno en el frontend
export interface IClient {
  id?: string;
  nombre: string;
  apellidos: string;
  identificacion: string;
  telefonoCelular: string;
  otroTelefono: string;
  direccion: string;
  fNacimiento: string;
  fAfiliacion: string;
  sexo: 'F' | 'M';
  resenaPersonal: string;
  imagen: string;
  interesFK?: string;
  usuarioId: string;
}

export interface IClientListItem {
  id: string;
  identificacion: string;
  nombre: string;
  apellidos: string;
}

export interface IInterest {
  id: string;
  nombre: string;
}

const getAuthConfig = () => ({
  headers: { Authorization: `Bearer ${tokenUtils.getToken()}` }
});

const DEFAULT_INTEREST_ID = "3fa85f64-5717-4562-b3fc-2c963f66afa6";

const mapToAPIClient = (client: IClient): IClientAPI => ({
  id: client.id,
  nombre: client.nombre,
  apellidos: client.apellidos,
  identificacion: client.identificacion,
  celular: client.telefonoCelular,
  otroTelefono: client.otroTelefono,
  direccion: client.direccion,
  fNacimiento: new Date(client.fNacimiento).toISOString().split('.')[0], // Sin milisegundos
  fAfiliacion: new Date(client.fAfiliacion).toISOString().split('.')[0], // Sin milisegundos
  sexo: client.sexo,
  resennaPersonal: client.resenaPersonal,
  imagen: client.imagen,
  interesesId: client.interesFK || DEFAULT_INTEREST_ID, // Cambiando a interesesId
  usuarioId: client.usuarioId
});

const handleApiError = (error: any) => {
  if (error.response) {
    // El servidor respondió con un status fuera del rango 2xx
    console.error('Error Response:', {
      status: error.response.status,
      data: error.response.data,
      headers: error.response.headers,
      config: {
        url: error.response.config.url,
        method: error.response.config.method,
        data: error.response.config.data/*  */
      }
    });
    if (error.response.status === 500) {
      console.error('Server Error:', error.response.data);
    }
    throw new Error(`API Error: ${JSON.stringify(error.response.data)}`);
  } else if (error.request) {
    // La petición fue hecha pero no se recibió respuesta
    console.error('Request Error:', error.request);
    throw new Error('No se recibió respuesta del servidor');
  } else {
    // Algo sucedió al configurar la petición
    console.error('Error:', error.message);
    throw error;
  }
};

export const clientService = {
  searchClients: async (searchTerm: string = ''): Promise<IClientListItem[]> => {
    try {
      const user = tokenUtils.getUser();
      if (!user) {
        throw new Error('Usuario no autenticado');
      }

      const searchParams = {
        identificacion: searchTerm,
        nombre: searchTerm,
        usuarioId: user.userId
      };

      const response = await axios.post(
        `${API_URL}/api/Cliente/Listado`,
        searchParams,
        getAuthConfig()
      );
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },

  getClient: async (id: string): Promise<IClient> => {
    try {
      const response = await axios.get(
        `${API_URL}/api/Cliente/Obtener/${id}`,
        getAuthConfig()
      );
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },

  createClient: async (client: Omit<IClient, 'id'>): Promise<void> => {
    try {
      const apiClient = mapToAPIClient(client as IClient);
      console.log('Creating client with data:', apiClient); 
      console.log('Datos enviados:', client); // Agregado para mostrar los datos enviados
      await axios.post(
        `${API_URL}/api/Cliente/Crear`,
        apiClient,
        getAuthConfig()
      );
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },

  updateClient: async (client: IClient): Promise<void> => {
    try {
      const apiClient = mapToAPIClient(client);
      console.log('Updating client with data:', apiClient); 
      console.log('Datos enviados:', client); // Agregado para mostrar los datos enviados
      await axios.post(
        `${API_URL}/api/Cliente/Actualizar`,
        apiClient,
        getAuthConfig()
      );
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },

  deleteClient: async (id: string): Promise<void> => {
    try {
      await axios.delete(
        `${API_URL}/api/Cliente/Eliminar/${id}`,
        getAuthConfig()
      );
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },

  getInterests: async (): Promise<IInterest[]> => {
    try {
      const response = await axios.get(
        `${API_URL}/api/Intereses/Listado`,
        getAuthConfig()
      );
      return response.data;
    } catch (error) {
      handleApiError(error);
      console.warn('Using default interests as fallback');
      return defaultInterests;
    }
  }
};
