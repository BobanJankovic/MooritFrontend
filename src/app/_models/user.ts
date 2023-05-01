export class User {
    id?: string;
    username?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    token?: string;
    isAdmin?: boolean;
}


// export interface User {
//     firstName: string;
//     lastName: string;
//     id: string;
//     userName: string;
//     normalizedUserName: string;
//     email: string;
//     normalizedEmail: string;
//     emailConfirmed: boolean;
//     passwordHash: string;
//     securityStamp: string;
//     concurrencyStamp: string;
//     phoneNumber: string | null;
//     phoneNumberConfirmed: boolean;
//     twoFactorEnabled: boolean;
//     lockoutEnd: Date | null;
//     lockoutEnabled: boolean;
//     accessFailedCount: number;
//   }
  
//   export interface Response {
//     user: User;
//     result: string;
//   }