import {
  BOOKING,
  LAYANAN,
  ANTRIAN,
  HASIL_LAB,
  HASIL_LAB_DETAIL,
} from '../constants/actionTypes';

const initialState = {
  booking: null,
  layanan: null,
};

const reducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case BOOKING: {
      return {
        ...state,
        booking: payload,
      };
    }
    case LAYANAN: {
      return {
        ...state,
        layanan: payload,
      };
    }
    case ANTRIAN: {
      return {
        ...state,
        antrian: payload,
      };
    }
    case HASIL_LAB: {
      return {
        ...state,
        hasilLab: payload,
      };
    }
    case HASIL_LAB_DETAIL: {
      return {
        ...state,
        hasilLabDetail: payload,
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
