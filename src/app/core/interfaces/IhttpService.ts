export interface IRegister {
  firstName:string,
  lastName:string,
  email:string,
  userName:string,
  password:string,
}

export interface IUsers{
  id:string,
  userName:string,
  email:string,
}
export interface ILogin{
  email:string;
  password:string;
}
export const apiRoot = 'https://localhost:7273/api/auth';
export const userApi = 'https://localhost:7273/api/users';
