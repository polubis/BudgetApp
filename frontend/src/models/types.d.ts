declare module 'Entities' {
  export class User {
    constructor(public _id: string, public email: string, public username: string, public token?: string) {
      
    }
  }
}