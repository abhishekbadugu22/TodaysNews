import { darkTheme, lightTheme } from '../../assets/theme/colors';
import {DARK_THEME, LIGHT_THEME} from './ActionType';

const initialState = {
  theme: {...lightTheme},
};

const AuthReducer = (state = initialState, action:any) => {
  switch (action.type) {
    case LIGHT_THEME:
      return {
        ...state,
        theme: {...lightTheme},
      };

    case DARK_THEME:
        return {
            ...state,
            theme: {...darkTheme},
          };

    default:
      return state
  }
};

export default AuthReducer