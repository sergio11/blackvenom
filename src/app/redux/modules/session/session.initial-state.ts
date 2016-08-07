import { reimmutifySession } from './session.transforms';

export const SESSION_STATE = reimmutifySession({
  token: null,
  user: {},
  hasError: false,
  isLoading: false,
});
