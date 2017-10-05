export const RECIEVED_OBJECTS = 'RECIEVED_OBJECTS';

export function recievedObjects(data) {
  return {
    type: RECIEVED_OBJECTS,
    payload: data,
  };
}
