import ActionTypes from '../constants/ActionTypes';

export const showModal = ({ modalProps }) => dispatch => {
    dispatch({
        type: ActionTypes.SHOW_MODAL,
        modalProps
    });
};

export const hideModal = () => dispatch => {
    dispatch({
        type: ActionTypes.HIDE_MODAL
    });
};
