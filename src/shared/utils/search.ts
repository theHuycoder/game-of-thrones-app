/* eslint-disable array-callback-return */
export default {
  matchAllKeys: (searchText: string, arr: any[]) => {
    return arr.filter((item) => {
      return !!Object.values(item).find((val) => {
        if (Array.isArray(val)) {
          return !!val.find(
            (valItem) =>
              !!valItem?.toLowerCase().includes(searchText.toLowerCase()),
          );
        }
        if (typeof val === 'string') {
          return val.toLowerCase().includes(searchText.toLowerCase());
        }
      });
    });
  },
};
