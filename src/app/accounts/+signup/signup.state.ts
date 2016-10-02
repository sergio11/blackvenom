export interface ISignupState {
  isLoading: boolean;
  hasError: boolean;
  success: boolean;
}

export const initialState: ISignupState = {
  isLoading: false,
  hasError: false,
  success: false
}
