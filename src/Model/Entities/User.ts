export enum UserTypeEnum {
  CITIZEN,
  ENTITY,
}

export type UserType = {
  type: UserTypeEnum;
  completeName: string;
  email: string;
};
