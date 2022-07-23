export interface IServerError {
  errorMessage: string;
  status: number;
}

export class ServerError implements IServerError {
  public errorMessage: string;

  public status: number;

  constructor(errorMessage: string, status: number) {
    this.errorMessage = errorMessage;
    this.status = status;
  }
}
