export default interface ICreateUserDTO {
  name: string;
  email: string;
  tag: string;
  description?: string;
  password: string;
  image?: string;
}
