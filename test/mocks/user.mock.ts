import { IUser } from '../../src/domain/entities';

export const userMock = new IUser({
  name: 'Teste',
  email: 'teste@gmail.com',
  gender: 'male',
  password: '1234',
  marital_status: 'single',
  date_of_birthday: new Date('01/02/1993'),
});
