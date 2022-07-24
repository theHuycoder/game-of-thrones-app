/* eslint-disable function-paren-newline */
import React, { PropsWithChildren } from 'react';
import { Navbar, Grid, Typography } from '@/shared/ui-components';
import {
  alpha,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import { Header, Container } from './DashboardLayout.styles';
import { goBack } from '../../utils/history';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import IconButton from '@material-ui/core/IconButton';

type DashboardLayoutProps = PropsWithChildren<{
  head?: string;
  inputPlaceholder?: string;
  // eslint-disable-next-line no-unused-vars
  onSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showSearch?: boolean;
  showBackBtn?: boolean;
}>;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }),
);

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children = null,
  head = '',
  inputPlaceholder = '',
  onSearch = () => {},
  showSearch = true,
  showBackBtn = true,
}) => {
  const classes = useStyles();

  return (
    <>
      <Navbar />
      <Container>
        <Header container>
          {showBackBtn && (
            <Grid item xs={12}>
              <IconButton onClick={goBack}>
                <ArrowBackRoundedIcon />
              </IconButton>
            </Grid>
          )}
          <Grid item xs={12} md={6}>
            <Typography variant="h5">{head}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            {showSearch && (
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  onChange={onSearch}
                  placeholder={inputPlaceholder}
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </div>
            )}
          </Grid>
        </Header>
        <Grid container>
          <Grid item xs={12}>
            {children}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default DashboardLayout;
