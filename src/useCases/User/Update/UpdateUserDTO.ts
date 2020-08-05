export default interface IUpdateUserDTO {
  authId: string;
  id: string;
  email?: string;
  name?: string;
  password?: string;
  image?: string;
}
