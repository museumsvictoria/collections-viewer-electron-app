import {
  RECIEVED_OBJECTS,
  SELECT_OBJECT,
  CLOSE_OBJECT,
} from '../actions/system';

const initialState = {
  objects: [],
  activeObjectId: null,
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
      };
    default:
      return state;
  }
}
