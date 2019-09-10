import Contacts from './Contacts.interface';

type ClientType = 'fisico' | 'juridico';

export default interface Client {
  id: string;
  name: string;
  clientType: ClientType;
  document: string;
  contacts: Contacts;
}
