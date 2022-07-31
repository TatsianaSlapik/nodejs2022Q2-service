import { validate as uuidValidate } from 'uuid';

export const isValidId = (id: string) => {
  return uuidValidate(id);
};
