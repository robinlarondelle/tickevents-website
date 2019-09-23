export class CustomerDetails {
  firstname: string
  middlename?: string
  lastname: string
  email: string

  constructor(fn?: string, mn?: string, ln?: string, email?: string) {
    this.firstname = fn
    this.middlename = mn
    this.lastname = ln
    this.email = email
  }
}