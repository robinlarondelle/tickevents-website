export class ServerError {
  message: string
  status: number
  type: string

  constructor(error: any) {
    this.message = error.message
    this.status = error.status
    this.type = error.type
  }
}