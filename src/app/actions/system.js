export const RECIEVED_OBJECTS = 'RECIEVED_OBJECTS';
export const SELECT_OBJECT = 'SELECT_OBJECT';
export const CLOSE_OBJECT = 'CLOSE_OBJECT';
export const TOGGLE_IMAGE_EXPAND = 'TOGGLE_IMAGE_EXPAND';

export function recievedObjects(data) {
  return {
    type: RECIEVED_OBJECTS,
    payload: data,
  };
}

export function selectObject(id) {
  return {
    type: SELECT_OBJECT,
    payload: id,
  };
}

export function closeObject() {
  return {
    type: CLOSE_OBJECT,
  };
}

export function toggleImageExpand() {
  return {
    type: TOGGLE_IMAGE_EXPAND,
  };
}
