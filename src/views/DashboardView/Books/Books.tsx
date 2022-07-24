import React, { useState, useEffect, useMemo, useRef } from 'react';
import { DataGrid, GridColDef } from '@material-ui/data-grid';
import { GOTClientService } from '@/services';
import { IBook } from '@/modals/got.modals';
import dayjs from 'dayjs';
import { DashboardLayout } from '@/shared/layouts';
import { Wrapper } from './Book.styles';
import { SearchUtils } from '@/shared/utils';
import { redirectTo } from '../../../shared/utils/history';
import { WithAuth } from '@/shared/containers';

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 100,
    resizable: true,
  },
  { field: 'name', headerName: 'Name', width: 150, resizable: true },
  { field: 'authors', headerName: 'Authors', width: 200, resizable: true },
  { field: 'numberOfPages', headerName: 'Pages', width: 150, resizable: true },
  { field: 'country', headerName: 'Country', width: 150, resizable: true },
  { field: 'released', headerName: 'Released', width: 150, resizable: true },
  { field: 'mediaType', headerName: 'Media Type', width: 150 },
];

const BooksView = () => {
  const [books, setBooks] = useState<IBook[]>([]);
  const allBooks = useRef<IBook[]>([]);

  useEffect(() => {
    (async () => {
      const resp = await GOTClientService.getBooks().catch((err) => err);
      if (!resp) return;
      allBooks.current = resp.data;
      setBooks([...resp.data]);
    })();
  }, []);

  const dataRows = useMemo(
    () =>
      books.map((book) => ({
        id: Number(
          book.url.replaceAll('https://anapioficeandfire.com/api/books/', ''),
        ),
        name: book.name,
        authors: book.authors.reduce((acc, author, index) => {
          if (index === book.authors.length) {
            return `${acc} & ${author}`;
          }

          if (index === 0) {
            return `${author}`;
          }
          return `${acc} & ${author} &`;
        }, ''),
        numberOfPages: book.numberOfPages,
        country: book.country,
        released: dayjs(book.released).format('DD/MM/YYYY'),
        mediaType: book.mediaType,
      })),
    [books],
  );

  const onSearchBooks = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const searchResult = SearchUtils.matchAllKeys(val, allBooks.current);
    setBooks(searchResult);
  };

  return (
    <Wrapper>
      <DashboardLayout
        head="Books"
        showBackBtn={false}
        onSearch={onSearchBooks}
        inputPlaceholder="Search Books..."
      >
        <DataGrid
          loading={dataRows.length === 0}
          autoHeight
          rows={dataRows}
          columns={columns}
          pageSize={10}
          onRowClick={({ id }) => redirectTo(`/dashboard/books/${id}`)}
        />
      </DashboardLayout>
    </Wrapper>
  );
};

export default WithAuth(BooksView);
