import { EWARONG } from '../constants/actionTypes';

const initialState = {
    ewarong: null,
};

const reducer = (state = initialState, action) => {
    const { payload, type } = action;
    switch (type) {
        case EWARONG: {
            return {
                ...state,
                ewarong: payload,
            };
        }
        default: {
            return state;
        }
    }
};

export default reducer;
