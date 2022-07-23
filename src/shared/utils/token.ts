import dayjs from 'dayjs';

export default (() => {
  const isTokenExpires = (expiresOn: number) => dayjs() > dayjs(expiresOn);

  return {
    isTokenExpires,
  };
})();
