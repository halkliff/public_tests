import { Client } from '@cacdigital-lib/types';
import ClientService from '../client.service';

describe('ClientService methods tests', () => {
  let service: ClientService;

  beforeAll(() => {
    service = ClientService.instance;
  });

  describe('getClients tests', () => {
    it(`Shouldn't throw any errors and be resolved`, async () => {
      await expect(service.getClients()).resolves.toHaveProperty('data');
    });

    it('Should return a list of clients, a quantity, and be ok', async () => {
      const clientsData = await service.getClients();

      expect(clientsData.ok).toBeTruthy();
      expect(clientsData.data).toBeDefined();
    });
  });

  describe('addClient tests', () => {
    it(`Should create a new client on the database, and return an ok`, async () => {
      const clientData: Partial<Client> = {
        name: 'Abimael Santos',
        clientType: 'fisico',
        document: '123.456.789-10',
        contacts: {
          mobileNumber: '+55 (11) 98765-4321',
          email: 'abimael035@mail.com'
        }
      };
      await expect(service.addClient(clientData)).resolves.toHaveProperty('ok');
    });

    it(`Should throw an error when trying to create a Client with missing data`, async () => {
      await expect(
        service.addClient({
          document: '987.654.321-00',
          clientType: 'fisico'
        })
      ).rejects.toBeTruthy();
    });

    it(`Shouldn't allow the creation of a client when missing the clientType`, async () => {
      const clientData = {
        name: 'Abimael Santos',
        document: '123.456.789-10',
        contacts: {
          mobileNumber: '+55 (11) 98765-4321',
          email: 'abimael035@mail.com'
        }
      };
      return expect(
        service.addClient(clientData as Partial<Client>)
      ).rejects.toBeTruthy();
    });

    it(`Shouldn't allow the creation of a client when missing the name`, async () => {
      const clientData = {
        clientType: 'fisico',
        document: '123.456.789-10',
        contacts: {
          mobileNumber: '+55 (11) 98765-4321',
          email: 'abimael035@mail.com'
        }
      };
      return expect(
        service.addClient(clientData as Partial<Client>)
      ).rejects.toBeTruthy();
    });

    it(`Shouldn't allow the creation of a client when missing the document`, async () => {
      const clientData = {
        name: 'Abimael Santos',
        clientType: 'fisico',
        contacts: {
          mobileNumber: '+55 (11) 98765-4321',
          email: 'abimael035@mail.com'
        }
      };
      return expect(
        service.addClient(clientData as Partial<Client>)
      ).rejects.toBeTruthy();
    });

    it(`Shouldn't allow the creation of a client when missing the required mobileNumber`, async () => {
      const clientData = {
        name: 'Abimael Santos',
        clientType: 'fisico',
        document: '123.456.789-10',
        contacts: {
          email: 'abimael035@mail.com'
        }
      };
      return expect(
        service.addClient(clientData as Partial<Client>)
      ).rejects.toBeTruthy();
    });
  });

  describe('getClient tests', () => {
    it(`Shouldn't throw any errors and be resolved`, async () => {
      await expect(service.getClient('12345678910')).resolves.toHaveProperty(
        'data'
      );
    });

    it('Should return a list of clients, a quantity, and be ok', async () => {
      const clientData = await service.getClient('12345678910');

      expect(clientData.ok).toBeTruthy();
      expect(clientData.data).toBeDefined();
    });
  });

  describe('editClient tests', () => {
    it(`Shouldn't throw any errors and be resolved`, async () => {
      const clientData: Partial<Client> = {
        clientType: 'juridico',
        document: '01.002.003/0004-05'
      };

      await expect(
        service.editClient('12345678910', clientData)
      ).resolves.toBeTruthy();
    });

    it(`Should throw an error when trying to edit a client that doesn't exist.`, async () => {
      return expect(service.editClient('00000000000', {})).rejects.toBeTruthy();
    });
  });

  describe('removeClient tests', () => {
    it(`Should create and, on removal, shouldn't throw any errors and be resolved`, async () => {
      const clientData: Partial<Client> = {
        name: 'Gina Mota',
        clientType: 'fisico',
        document: '555.666.777-88',
        contacts: {
          mobileNumber: '+55 (11) 98765-4321',
          email: 'abimael035@mail.com'
        }
      };
      await service.addClient(clientData);

      await expect(service.removeClient('55566677788')).resolves.toBeTruthy();
    });

    it(`Should throw an error when trying to remove a client that doesn't exist.`, async () => {
      return expect(service.removeClient('00000000000')).rejects.toBeTruthy();
    });
  });
});
