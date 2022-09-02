import { NextApiResponse } from "next";

interface ErrorType {
  status: number;
  message: string;
}

interface SuccessType {
  status: number;
  message: string | [];
}

export class ApiResponse {
  private errors: ErrorType[];
  private success?: SuccessType;
  private res: NextApiResponse;

  constructor (res: NextApiResponse) {
    this.errors = [];
    this.res = res;
  }

  /**
   * Any time an error is presented, call this method.
   * 
   * @param status - status code of the error.
   * @param message - message of the error.
   */
  addError(status: number, message: string) {
    this.errors.push({ status, message });
  }

  /**
   * If there has been a success, call this method.
   * 
   * @param status - status code of success.
   * @param message - message of the success.
   */
  addSuccess(status: number, message: string | []) {
    this.success = { status, message };
  }

  /**
   * Checks if there are one or more errors.
   */
  get hasError() {
    return this.errors.length > 0 ? true : false;
  }

  /**
   * F
   * 
   * @param res - the response from the api.
   */
  send() {
    if (this.errors.length > 1) {
      this.res.status(400).json(this.errors.map(obj => obj.message));
    } else if (this.errors.length > 0) {
      this.res.status(this.errors[0].status).json(this.errors[0].message);
    } else if (this.success) {
      this.res.status(this.success.status).json(this.success.message);
    } else {
      this.res.status(500).json({ message: "No response information was provided." })
    }
  }
}
