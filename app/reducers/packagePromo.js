import { PROMO, PACKAGE } from '../constants/actionTypes';

const initialState = {
  promo: [],
  package: [],
};

const reducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case PROMO: {
      return {
        ...state,
        promo: payload,
      };
    }
    case PACKAGE: {
      return {
        ...state,
        package: payload,
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
