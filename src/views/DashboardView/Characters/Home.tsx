/* eslint-disable operator-linebreak */
import React, { useState, useRef, useEffect } from 'react';
import { ICharacter } from '@/modals/got.modals';
import { GOTClientService } from '@/services';
import { Grid, CharacterCard } from '@/shared/ui-components';
import { Wrapper } from './Home.styles';
import { DashboardLayout } from '@/shared/layouts';
import { SearchUtils } from '@/shared/utils';
import { redirectTo } from '../../../shared/utils/history';
import { WithAuth } from '@/shared/containers';

const DashboardHome = () => {
  const [showCharacters, setShowCharacters] = useState<ICharacter[]>([]);
  const allCharacters = useRef<ICharacter[]>([]);

  useEffect(() => {
    (async () => {
      const resp = await GOTClientService.getCharacters().catch((err) => err);
      if (!resp) return;

      allCharacters.current = resp.data;
      setShowCharacters(resp.data);
    })();
  }, []);

  const onSearchCharacters = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const searchResult = SearchUtils.matchAllKeys(val, allCharacters.current);
    setShowCharacters(searchResult);
  };

  const onClickCard = (charUrl: string) => () =>
    redirectTo(
      `/dashboard/characters/${charUrl.replaceAll(
        'https://anapioficeandfire.com/api/characters/',
        '',
      )}`,
    );

  return (
    <DashboardLayout
      head="Characters"
      inputPlaceholder="Search characters..."
      onSearch={onSearchCharacters}
      showBackBtn={false}
    >
      <Wrapper>
        <Grid container spacing={4}>
          {showCharacters.length > 0 &&
            showCharacters.map((char) => {
              return (
                <Grid item xs={12} md={6} lg={3} key={char.url}>
                  <CharacterCard char={char} onClick={onClickCard(char.url)} />
                </Grid>
              );
            })}
        </Grid>
      </Wrapper>
    </DashboardLayout>
  );
};

export default WithAuth(DashboardHome);
