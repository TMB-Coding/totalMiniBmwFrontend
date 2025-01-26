import { AuthorityModel } from "./Authority";
import { Tool } from "./ToolModel";

interface UserModel {
  id: string;
  employeeNumber: number;
  firstName: string;
  lastName: string;
  email: string;
  kioskToken: string;
  role: string;
  authorities: AuthorityModel[];
  promptToSetPw: boolean;
  checkedOut: Tool[];
  enabled: boolean;
  username: string;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
}

export { type UserModel };
