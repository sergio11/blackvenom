export interface ILoginState {
  token: string,
  user: any,
  hasError: boolean,
  isLoading: boolean,
};

export const initialState: LoginState = {
  token: null,
  user: {},
  hasError: false,
  isLoading: false,
};
