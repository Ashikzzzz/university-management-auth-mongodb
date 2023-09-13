import { IGenericErrorMessage } from './error';

export type IGenericResponseMessage = {
  statusCode: number;
  message: string;
  errorMessage: IGenericErrorMessage[];
};
