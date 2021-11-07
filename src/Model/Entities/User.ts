export enum UserTypeEnum {
  CITIZEN,
  ENTITY,
}

export type UserType = {
  id: string;
  type: UserTypeEnum;
  completeName: string;
  email: string;
};
