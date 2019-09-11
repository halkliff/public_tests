import { Injectable } from '@nestjs/common';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { Client } from '@cacdigital-lib/types';

@Injectable()
export default class ClientService {
  private STATIC_DATA: Client[] = [
    {
      id: randomStringGenerator(),
      name: 'Carlos Bonzaga da Silva',
      clientType: 'fisico',
      document: '001.002.003-04',
      contacts: {
        mobileNumber: '+55 (11) 98765-4321',
      },
    },
  ];

  /**
   * Lists the clients in the mocked database
   * @param page The page to look for
   * @param offset how many clients will be retrieved
   * @returns an array containing the found `Client`s. The array may be empty.
   */
  public async getclients(page = 0, offset = 10): Promise<Client[]> {
    return this.STATIC_DATA.slice(page * offset, page * offset + offset);
  }

  /**
   * Gets a single client from the mocked database
   * @param document The client's registered document
   * @returns the `Client` if found, or `null` if not
   */
  public async getClient(document: string): Promise<Client | null> {
    const client = this.STATIC_DATA.find(value => value.document === document);

    if (!client) {
      return null;
    }

    return client;
  }

  /**
   * Adds a client to the mocked database.
   * @param data The data of the client to be added to the database.
   */
  public async addClient(data: Client): Promise<void> {
    const existingIndex = this.STATIC_DATA.findIndex(
      value => value.document === data.document,
    );
    if (existingIndex !== -1) {
      this.STATIC_DATA[existingIndex] = data;
    } else {
      this.STATIC_DATA.push(data);
    }
  }

  /**
   * Removes a client from the mocked database.
   * @param document The client's document to find and remove the client
   * @returns the last updated instance of the `Client` before removal, if the client was found
   * and removed, or `false` otherwise.
   */
  public async removeClient(document: string): Promise<Client | false> {
    const client = this.STATIC_DATA.find(value => value.document === document);
    if (!client) {
      return false;
    }

    this.STATIC_DATA = this.STATIC_DATA.filter(
      value => value.document === document,
    );
    return client;
  }

  /**
   * Edits a client in the mocked database.
   * @param document The client's document to find and edit the client.
   * @param data The new data of the client to replace in the database.
   * @returns the latest `Client` instance prior to the edit, or false if the client was not
   * found.
   */
  public async editClient(
    document: string,
    data: Client,
  ): Promise<Client | false> {
    const clientIndex = this.STATIC_DATA.findIndex(
      value => value.document === document,
    );

    if (clientIndex === -1) {
      return false;
    }
    const oldClientData = this.STATIC_DATA[clientIndex];
    this.STATIC_DATA[clientIndex] = data;

    return oldClientData;
  }
}
