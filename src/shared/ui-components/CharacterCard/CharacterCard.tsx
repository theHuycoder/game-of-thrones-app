/* eslint-disable react/jsx-one-expression-per-line */
import React, { memo } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { ICharacter } from '../../../modals/got.modals';

type CharacterCardProps = {
  char: ICharacter;
  onClick?: () => void;
};

const CharacterCard: React.FC<CharacterCardProps> = ({
  char,
  onClick = () => {},
}) => {
  const getCharTitles = () =>
    char.titles?.length > 0 &&
    char.titles.reduce((acc, title, index) => {
      if (index === char.titles.length - 1) {
        return title + acc;
      }

      return `${title + acc}|`;
    }, '');

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Name: {char.name}</Typography>
        <Typography variant="h6">Titles: {getCharTitles()}</Typography>
        <Typography>Culture: {char.culture}</Typography>
        <Typography>Played by: {char.playedBy}</Typography>
      </CardContent>
      <CardActions>
        <Button variant="text" onClick={onClick}>
          See Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default memo(CharacterCard);
