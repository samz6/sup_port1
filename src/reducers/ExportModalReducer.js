import ActionTypes from "../constants/ActionTypes";

const initialState = {
  modalProps: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SHOW_MODAL:
      return {
        modalProps: action.modalProps,
        type: action.type
      };

    case ActionTypes.HIDE_MODAL:
      return initialState;

    default:
      return state;
  }
};
