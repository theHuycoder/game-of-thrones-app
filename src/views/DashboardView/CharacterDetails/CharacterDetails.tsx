/* eslint-disable indent */
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { ICharacter } from '../../../modals/got.modals';
import { GOTClientService } from '@/services';
import { DashboardLayout } from '@/shared/layouts';
import { Typography, FlexBox, Grid } from '@/shared/ui-components';
import { Title } from './CharacterDetails.styles';
import { WithAuth } from '@/shared/containers';

const CharacterDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<ICharacter>();

  // useAuth();

  const basicInfo = useMemo(() => {
    return character
      ? {
          name: character.name,
          culture: character.culture,
          gender: character.gender,
          father: character.father,
          mother: character.mother,
          born: character.born,
          died: character.died,
        }
      : {};
  }, [character]);

  useEffect(() => {
    (async () => {
      const resp = await GOTClientService.getCharacterById(id);
      if (!resp) return;

      setCharacter(resp.data);
    })();
  }, [id]);

  if (!character) {
    return null;
  }

  const { aliases, books, spouse, tvSeries } = character;

  return (
    <DashboardLayout showSearch={false} head={`${character.name}`}>
      <Grid container>
        <Grid item xs={12} md={4}>
          <FlexBox flexDirection="column" gap={1}>
            {Object.entries(basicInfo).map(([key, val]) => {
              return (
                <Typography variant="body1">
                  <Title variantMapping={{ body1: 'span' }}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}:{' '}
                  </Title>
                  {val}
                </Typography>
              );
            })}
          </FlexBox>
        </Grid>
        <Grid item xs={12} md={6}>
          <FlexBox flexDirection="column" gap={1}>
            <Typography variant="body1">
              <Title variantMapping={{ body1: 'span' }}>
                Books:{' '}
                {books.map((book) => {
                  const bookId = book.replace(
                    'https://anapioficeandfire.com/api/books/',
                    '',
                  );

                  return (
                    <React.Fragment key={book}>
                      <NavLink to={`/dashboard/books/${bookId}`}>
                        Book {bookId}
                      </NavLink>{' '}
                    </React.Fragment>
                  );
                })}
              </Title>
            </Typography>
            <Typography variant="body1">
              <Title variantMapping={{ body1: 'span' }}>Aliases: </Title>
              {aliases.map(
                (alias, index) =>
                  `${index === aliases.length - 1 ? alias : `${alias} | `}`,
              )}
            </Typography>
            <Typography variant="body1">
              <Title variantMapping={{ body1: 'span' }}>Spouse: </Title>
              {spouse}
            </Typography>
            <Typography variant="body1">
              <Title variantMapping={{ body1: 'span' }}>TV Series: </Title>
              {tvSeries.map(
                (series, index) =>
                  `${index === tvSeries.length - 1 ? series : `${series} | `}`,
              )}
            </Typography>
          </FlexBox>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default WithAuth(CharacterDetails);
