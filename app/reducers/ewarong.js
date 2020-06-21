import {
  EWARONG,
  EWARONG_DISTRICTS,
  EWARONG_DISTRICTS_ID,
  EWARONG_VILLAGES,
  EWARONG_ITEMS,
  EWARONG_PARAMS,
  EWARONG_MYORDERS,
} from '../constants/actionTypes';

const initialState = {
  ewarong: null,
  alldistricts: {
    districts: [],
    villages: [],
  },
  district_id: -1,
  allvillages: [],
  allItems: [],
  myorders: [],
  filters: {
    timefilter: null,
    itemfilter: [],
    latitude: null,
    longitude: null,
    villagefilter: null,
    districtfilter: null,
    rangekm: 1,
    showRadius: false,
    usemylocation: false,
    searchname: null,
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
    case EWARONG_DISTRICTS: {
      return {
        ...state,
        alldistricts: payload,
      };
    }
    case EWARONG_DISTRICTS_ID: {
      return {
        ...state,
        district_id: payload,
      };
    }
    case EWARONG_VILLAGES: {
      return {
        ...state,
        allvillages: payload,
      };
    }
    case EWARONG_ITEMS: {
      return {
        ...state,
        allItems: payload,
      };
    }
    case EWARONG_MYORDERS: {
      return {
        ...state,
        myorders: payload,
      };
    }
    case EWARONG_PARAMS: {
      return {
        ...state,
        filters: {
          ...initialState.filters,
          ...payload,
        },
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
