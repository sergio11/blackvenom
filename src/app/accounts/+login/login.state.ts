export interface ILoginState {
  token: string,
  user: any,
  hasError: boolean,
  isLoading: boolean,
  isExpired: boolean
};

export const initialState: ILoginState = {
  token: null,
  user: {},
  hasError: false,
  isLoading: false,
  isExpired: false
};
