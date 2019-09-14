import { Injectable } from '@nestjs/common';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { Client } from '@cacdigital-lib/types';
import UserAlreadyExistsError from './UserAlreadyExists.error';
import UserNotFoundError from './UserNotFound.error';
import InvalidEntryError from './InvalidEntry.error';

@Injectable()
export default class ClientService {
  private STATIC_DATA: Client[] = [
    {
      id: randomStringGenerator(),
      name: 'Carlos Bonzaga da Silva',
      clientType: 'fisico',
      document: '00100200304',
      parsedDocument: '001.002.003-04',
      contacts: {
        mobileNumber: '+55 (11) 98765-4321',
      },
    },
  ];

  /**
   * Lists the clients in the mocked database
   * @param page The page to look for
   * @param offset how many clients will be retrieved
   * @returns a set containing two informations: the first, the `number` of clients
   * registered in the database, the second, an array containing the found [Client]s.
   * The array may be empty.
   */
  public async getClients(page = 0, offset = 10): Promise<[number, Client[]]> {
    return [
      this.STATIC_DATA.length,
      this.STATIC_DATA.slice(page * offset, page * offset + offset),
    ];
  }

  /**
   * Gets a single client from the mocked database
   * @param document The client's registered document
   * @returns the [Client] if found, or `null` if not
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
   * @param data The data of the [Client] to be added to the database.
   * @throws [UserAlreadyExistsError] case trying to add an user that already exists
   */
  public async addClient(data: Client): Promise<void> {
    const existingIndex = this.STATIC_DATA.findIndex(
      value => value.document === data.document,
    );
    if (existingIndex !== -1) {
      throw new UserAlreadyExistsError();
    } else if (!data || Object.keys(data).length === 0) {
      throw new InvalidEntryError(`Empty body`);
    } else if (!data.clientType) {
      throw new InvalidEntryError(
        `Client Type must be provided, either as 'fisico' or 'juridico'`,
      );
    } else if (data.clientType !== 'fisico' && data.clientType !== 'juridico') {
      throw new InvalidEntryError(`Wrong Client Type`);
    } else if (!data.document) {
      throw new InvalidEntryError(`A document must be provided`);
    } else if (data.document.length !== 11 && data.clientType === 'fisico') {
      throw new InvalidEntryError(
        `Invalid document. Documents for client type 'fisico' must have exactly 11 digits.`,
      );
    } else if (data.document.length !== 14 && data.clientType === 'juridico') {
      throw new InvalidEntryError(
        `Invalid document. Documents for client type 'juridico' must have exactly 14 digits.`,
      );
    } else if (!data.name) {
      throw new InvalidEntryError(`Client's name must be provided`);
    } else if (!data.contacts || !data.contacts.mobileNumber) {
      throw new InvalidEntryError(
        `At least the mobile phone number must be provided in 'contacts' object.`,
      );
    } else {
      this.STATIC_DATA.push({
        id: randomStringGenerator(),
        ...data,
      });
    }
  }

  /**
   * Removes a client from the mocked database.
   * @param document The client's document to find and remove the client
   * @returns the last updated instance of the [Client] before removal, if the client was found
   * and removed, or `false` otherwise.
   */
  public async removeClient(document: string): Promise<Client> {
    const client = this.STATIC_DATA.find(value => value.document === document);
    if (!client) {
      throw new UserNotFoundError();
    }

    this.STATIC_DATA = this.STATIC_DATA.filter(
      value => value.document !== document,
    );
    return client;
  }

  /**
   * Edits a client in the mocked database.
   * @param document The client's document to find and edit the client.
   * @param data The new data of the client to replace in the database.
   * @returns the latest [Client] instance prior to the edit, or false if the client was not
   * found.
   */
  public async editClient(
    document: string,
    data: Partial<Client>,
  ): Promise<Client | false> {
    const clientIndex = this.STATIC_DATA.findIndex(
      value => value.document === document,
    );

    if (clientIndex === -1) {
      throw new UserNotFoundError();
    }

    if (
      data.document &&
      data.document.length !== 11 &&
      data.document.length !== 14
    ) {
      throw new InvalidEntryError(`Invalid document`);
    }

    const { id, contacts, ...rest } = data;

    const { contacts: oldContacts, ...oldRest } = this.STATIC_DATA[clientIndex];
    this.STATIC_DATA[clientIndex] = {
      ...oldRest,
      ...rest,
      contacts: { ...oldContacts, ...contacts },
    };

    return { ...oldRest, contacts: oldContacts };
  }
}
