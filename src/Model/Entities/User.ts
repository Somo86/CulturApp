export enum UserTypeEnum {
  CITIZEN,
  ENTITY,
}

export type UserType = {
  type: UserTypeEnum;
  completeName: string;
  email: string;
};

export class User {
  constructor({ type, completeName, email }: UserType) {
    this.type = type;
    this.completeName = completeName;
    this.email = email;
  }

  get type(): UserType['type'] {
    return this.type;
  }

  set type(type) {
    this.type = type;
  }

  get completeName(): UserType['completeName'] {
    return this.completeName;
  }

  set completeName(completeName) {
    this.completeName = completeName;
  }

  get email(): UserType['email'] {
    return this.email;
  }

  set email(email) {
    this.email = email;
  }
}
