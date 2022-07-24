import React from 'react';
import { APP_URL_MAP } from '@/shared/utils';
import {
  LoginView,
  CharacterDetailsView,
  BooksView,
  BookDetailsView,
  CharactersView,
} from '@/views';

export default [
  {
    path: APP_URL_MAP.getLoginView(),
    render: (props: any) => <LoginView {...props} />,
  },
  {
    path: APP_URL_MAP.getCharactersView(),
    exact: true,
    render: (props: any) => <CharactersView {...props} />,
  },
  {
    path: APP_URL_MAP.getCharacterDetails(),
    render: (props: any) => <CharacterDetailsView {...props} />,
  },
  {
    path: APP_URL_MAP.getBooks(),
    exact: true,
    render: (props: any) => <BooksView {...props} />,
  },
  {
    path: APP_URL_MAP.getBookDetails(),
    render: (props: any) => <BookDetailsView {...props} />,
  },
];
