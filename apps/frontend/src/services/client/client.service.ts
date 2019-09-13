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
    const client = await this.api.get<NetworkResponse<Client>>(`/${document}`);

    if (!client.data.ok) {
      return Promise.reject(client.data.error);
    }

    return client.data;
  }

  public async addClient(data: Partial<Client>): Promise<boolean> {
    const serverReturn = await this.api.post<NetworkResponse>('/clients', data);
    if (!serverReturn.data.ok) {
      return Promise.reject(serverReturn.data.error);
    }

    return serverReturn.data.ok;
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
    const serverReturn = await this.api.delete<NetworkResponse>(
      `/clients/${document}`
    );

    if (!serverReturn.data.ok) {
      Promise.reject(serverReturn.data.error);
    }

    return serverReturn.data.ok;
  }
}
