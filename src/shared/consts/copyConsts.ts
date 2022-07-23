export default {
  validation: {
    required: (field: string) => `${field} is required!`,
    invalidEmail: 'Email is invalid!!',
  },
  loginView: {
    head: 'Welcome to Game of Thrones fan apps',
    subhead: 'Please sign you in',
  },
};
