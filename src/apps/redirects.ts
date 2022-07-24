import { APP_URL_MAP } from '../shared/utils/map';

export default [
  {
    from: '',
    to: APP_URL_MAP.getLoginView(),
  },
  {
    from: APP_URL_MAP.getDashboardView(),
    to: APP_URL_MAP.getCharactersView(),
  },
];
