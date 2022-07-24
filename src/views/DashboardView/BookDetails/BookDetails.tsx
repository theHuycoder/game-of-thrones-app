/* eslint-disable function-paren-newline */
/* eslint-disable indent */
import React, { useEffect, useMemo, useState } from 'react';
import { IBook, ICharacter } from '../../../modals/got.modals';
import { useParams, NavLink } from 'react-router-dom';
import { GOTClientService } from '@/services';
import { DashboardLayout } from '@/shared/layouts';
import { Title } from './BookDetails.styles';
import { Grid, Typography, FlexBox } from '@/shared/ui-components';
import { httpGOT } from '@/services/http-clients/https';
import dayjs from 'dayjs';
import { WithAuth } from '@/shared/containers';

type BookDetailsProps = {
  book: IBook;
};

const BookDetailsView: React.FC<BookDetailsProps> = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<IBook>();
  const [charactersDetails, setCharactersDetails] = useState<
    Pick<ICharacter, 'url' | 'name'>[]
  >([]);

  const basicInfo = useMemo(() => {
    return !book
      ? {}
      : {
          name: book.name,
          isBn: book.isbn,
          authors: book.authors.reduce((acc, author, index) => {
            if (index === book.authors.length) {
              return `${acc} & ${author}`;
            }

            if (index === 0) {
              return `${author}`;
            }
            return `${acc} & ${author} &`;
          }, ''),
          publisher: book.publisher,
          'number of pages': book.numberOfPages,
          'media type': book.mediaType,
          released: dayjs(book.released).format('DD/MM/YYYY'),
          country: book.country,
        };
  }, [book]);

  useEffect(() => {
    (async () => {
      const resp = await GOTClientService.getBookById(id).catch((err) => err);
      if (!resp) return;

      setBook(resp.data);
    })();
  }, [id]);

  useEffect(() => {
    (async () => {
      if (!book) return;
      const { characters } = book;

      const resp = await Promise.all(
        characters.map((char) =>
          httpGOT.get<ICharacter>(char, { baseURL: '' }),
        ),
      ).catch((err) => err);
      if (!resp) return;

      const charDetails = resp.map((char: any) => ({
        url: char.data.url,
        name: char.data.name,
      }));
      setCharactersDetails(charDetails);
    })();
  }, [book]);
  if (!book) return null;

  return (
    <DashboardLayout showBackBtn showSearch={false} head={book.name}>
      <Grid container>
        <Grid item xs={12} md={4}>
          <FlexBox flexDirection="column" gap={1}>
            {Object.entries(basicInfo).map(([key, val]) => {
              return (
                <Typography variant="body1" key={key}>
                  <Title variantMapping={{ body1: 'span' }}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}:{' '}
                  </Title>
                  {val}
                </Typography>
              );
            })}
          </FlexBox>
        </Grid>
        <Grid item xs={12} md={8}>
          <FlexBox flexDirection="column" gap={1}>
            <Typography variant="body1">
              <Title variantMapping={{ body1: 'span' }}>
                Characters:{' '}
                {charactersDetails.map((char) => {
                  const charId = char.url.replace(
                    'https://anapioficeandfire.com/api/characters/',
                    '',
                  );

                  return (
                    <React.Fragment key={charId}>
                      <NavLink to={`/dashboard/characters/${charId}`}>
                        {char.name}
                      </NavLink>
                      ,{' '}
                    </React.Fragment>
                  );
                })}
              </Title>
            </Typography>
          </FlexBox>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default WithAuth(BookDetailsView);
