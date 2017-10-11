import {
  RECIEVED_OBJECTS,
  SELECT_OBJECT,
  CLOSE_OBJECT,
  TOGGLE_IMAGE_EXPAND,
} from '../actions/system';

const initialState = {
  objects: [],
  activeObjectId: null,
  activeObjectImageExpanded: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case RECIEVED_OBJECTS:
      return {
        ...state,
        objects: action.payload,
      };
    case SELECT_OBJECT:
      return {
        ...state,
        activeObjectId: action.payload,
      };
    case CLOSE_OBJECT:
      return {
        ...state,
        activeObjectId: null,
        activeObjectImageExpanded: false,
      };
    case TOGGLE_IMAGE_EXPAND:
      return {
        ...state,
        activeObjectImageExpanded: !state.activeObjectImageExpanded,
      };
    default:
      return state;
  }
}
