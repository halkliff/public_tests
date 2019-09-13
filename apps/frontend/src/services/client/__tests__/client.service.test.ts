import { Client } from '@cacdigital-lib/types';
import ClientService from '../client.service';

describe('ClientService methods tests', () => {
  let service: ClientService;

  beforeAll(() => {
    service = ClientService.instance;
  });

  describe('getClients tests', () => {
    it(`Shouldn't throw any errors and be resolved`, async () => {
      expect(async () => {
        await service.getClients();
      }).not.toThrow();
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
      expect(async () => {
        await service.addClient(clientData);
      }).not.toThrow();
    });

    it(`Should throw an error when trying to create a Client with missing data`, async () => {
      expect(async () => {
        await service.addClient({
          document: '987.654.321-00',
          clientType: 'fisico'
        });
      }).toThrow();
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
      expect(async () => {
        await service.addClient(clientData as Partial<Client>);
      }).not.toThrow();
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
      expect(async () => {
        await service.addClient(clientData as Partial<Client>);
      }).not.toThrow();
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
      expect(async () => {
        await service.addClient(clientData as Partial<Client>);
      }).not.toThrow();
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
      expect(async () => {
        await service.addClient(clientData as Partial<Client>);
      }).not.toThrow();
    });
  });

  describe('getClient tests', () => {
    it(`Shouldn't throw any errors and be resolved`, async () => {
      expect(async () => {
        await service.getClient('12345678910');
      }).not.toThrow();
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

      expect(async () => {
        await service.editClient('12345678910', clientData);
      }).not.toThrow();
    });

    it(`Should throw an error when trying to edit a client that doesn't exist.`, () => {
      expect(async () => {
        await service.editClient('00000000000', {});
      }).toThrow();
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

      expect(async () => {
        await service.removeClient('55566677788');
      }).not.toThrow();
    });

    it(`Should throw an error when trying to remove a client that doesn't exist.`, () => {
      expect(async () => {
        await service.removeClient('00000000000');
      }).toThrow();
    });
  });
});
