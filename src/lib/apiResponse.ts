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

  constructor () {
    this.errors = [];
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

  send(res: NextApiResponse) {
    if (this.errors.length > 1) {
      res.status(400).json(this.errors.map(obj => obj.message));
    } else if (this.errors.length > 0) {
      res.status(this.errors[0].status).json(this.errors[0].message);
    } else if (this.success) {
      res.status(this.success.status).json(this.success.message);
    } else {
      res.status(500).json({ message: "No response information was provided." })
    }
  }
}