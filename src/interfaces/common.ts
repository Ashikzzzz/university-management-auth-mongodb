export type IGenericResponseMessage = {
  statusCode: number
  message: string
  errorMessage: {
    path: string
    message: string
  }[]
}
