import { Client, NetworkResponse } from '@cacdigital-lib/types';
import { AxiosResponse } from 'axios';
import { API } from '../../netConfig';

export default class ClientService {
  private static selfInstance: ClientService = ClientService.createInstance();

  private static createInstance(): ClientService {
    return new ClientService();
  }

  public static get instance(): ClientService {
    return ClientService.selfInstance;
  }

  // eslint-disable-next-line
  private constructor(private readonly api = API) {}

  public async getClients(
    page: number = 0,
    offset: number = 0
  ): Promise<NetworkResponse<Client[]>> {
    const clients = await this.api.get<NetworkResponse<Client[]>>('/clients', {
      params: {
        page,
        offset
      }
    });

    if (!clients.data.ok) {
      return Promise.reject(clients.data.error);
    }
    return clients.data;
  }

  public async getClient(document: string): Promise<NetworkResponse<Client>> {
    try {
      const client = await this.api.get<NetworkResponse<Client>>(
        `/clients/${document}`
      );

      return client.data;
    } catch (err) {
      throw err.response.data.error;
    }
  }

  public async addClient(data: Partial<Client>): Promise<boolean> {
    try {
      return (await this.api.post<NetworkResponse>('/clients', data)).data.ok;
    } catch (err) {
      throw err.response.data.error;
    }
  }

  public async editClient(
    document: string,
    data: Partial<Client>
  ): Promise<boolean> {
    const serverReturn = await this.api.patch<
      Client,
      AxiosResponse<NetworkResponse>
    >(`/clients/${document}`, data);

    if (!serverReturn.data.ok) {
      return Promise.reject(serverReturn.data.error);
    }

    return serverReturn.data.ok;
  }

  public async removeClient(document: string): Promise<boolean> {
    try {
      const serverReturn = await this.api.delete<NetworkResponse>(
        `/clients/${document}`
      );
      return serverReturn.data.ok;
    } catch (err) {
      throw err.response.data.error;
    }
  }
}
