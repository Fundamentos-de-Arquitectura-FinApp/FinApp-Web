import {Role} from './role-interface';

export interface UserInterface {
  username: string;
  password: string;
  roles?: Role[];
}
