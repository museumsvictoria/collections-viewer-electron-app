import {
  RECIEVED_OBJECTS,
} from '../actions/system';

const initialState = {
  objects: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case RECIEVED_OBJECTS: {
      return {
        ...state,
        objects: action.payload,
      };
    }
    default:
      return state;
  }
}
