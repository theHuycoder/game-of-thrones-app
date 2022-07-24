import { IBook, ICharacter, IHouse } from '@/modals/got.modals';
import { API_URL_MAP } from '@/shared/utils';
import { httpGOT } from './https';

export default {
  getCharacters: async () =>
    httpGOT.get<ICharacter[]>(API_URL_MAP.getCharacters()),
  getCharacterById: async (id: string) =>
    httpGOT.get<ICharacter>(API_URL_MAP.getCharacterById(id)),

  getBooks: async () => httpGOT.get<IBook[]>(API_URL_MAP.getBooks()),
  getBookById: async (id: string) =>
    httpGOT.get<IBook>(API_URL_MAP.getBookById(id)),

  getHouses: async () => httpGOT.get<IHouse[]>(API_URL_MAP.getHouses()),
  getHouseById: async (id: string) =>
    httpGOT.get<IHouse>(API_URL_MAP.getHouseById(id)),
};
