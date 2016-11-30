import { OPEN_APIKEY_MODAL,
  CLOSE_APIKEY_MODAL, SET_APIKEY_MODAL_MODE } from '../utils/AppConstants';

const assign = Object.assign;

const initialState = {
  show: false,
  key: null,
  mode: null,
  modalModeAddUrl: false
};

export default function apikeyModalReducer(state = initialState, action) {
  switch (action.type) {
  case OPEN_APIKEY_MODAL:
    return assign({}, state, {
      show: true,
      key: action.key,
      mode: action.mode
    });
  case CLOSE_APIKEY_MODAL:
    return assign({}, state, {
      show: false,
      key: null,
      mode: null
    });
  case SET_APIKEY_MODAL_MODE:
    return assign({}, state, { modalModeAddUrl: action.modalModeAddUrl });
  default:
    return state;
  }
}
