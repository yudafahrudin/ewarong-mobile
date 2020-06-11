import api from '../services/api';
import EndPoints from '../constants/endPoints';
import {
    EWARONG,
} from '../constants/actionTypes';

export const getEwarong = () => (dispatch, getState) => {
    return api(getState, dispatch, EndPoints.ewarong).then(response => {
        const { data } = response;
        dispatch({
            type: EWARONG,
            payload: data.data,
        });
    });
}
