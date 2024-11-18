export interface ClientInterface {
  id:number,
  email: string,
  names: string,
  paternalSurname: string,
  maternalSurname: string,
  fullName?:string,
  dni: string,
  phone: string,
  photo: string
  accountId?:number
}
