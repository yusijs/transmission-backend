export class DBResponse {
  private message(strings, ...values) {
    return `Collection ${values[1]} (${values[0]}) inserted into the local DB`;
  }

  public response: {
    message: string;
    status: number;
  }

  constructor(values) {
    this.response = {
      message: this.message`${values.id} ${values.name}`,
      status: 1
    }
  }
}