import {
  EWARONG,
  EWARONG_DISTRICTS_VILLAGES,
  EWARONG_ITEMS,
  EWARONG_PARAMS,
} from '../constants/actionTypes';

const initialState = {
  ewarong: null,
  alldistricts: [],
  allItems: [],
  filters: {
    timefilter: null,
    itemfilter: [],
    villagefilter: null,
    districtfilter: null,
  },
};

const reducer = (state = initialState, action) => {
  const {payload, type} = action;
  switch (type) {
    case EWARONG: {
      return {
        ...state,
        ewarong: payload,
      };
    }
    case EWARONG_DISTRICTS_VILLAGES: {
      return {
        ...state,
        alldistricts: payload,
      };
    }
    case EWARONG_ITEMS: {
      return {
        ...state,
        allItems: payload,
      };
    }
    case EWARONG_PARAMS: {
      console.log(payload);
      return {
        ...state,
        filters: {
          ...payload,
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
