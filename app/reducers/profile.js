import { PROFILE } from '../constants/actionTypes';

const initialState = {
  profile: [],
};

const reducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case PROFILE: {
      return {
        ...state,
        profile: payload,
      };
    }
    case 'RESET_STATE': {
      return {
        ...initialState,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
