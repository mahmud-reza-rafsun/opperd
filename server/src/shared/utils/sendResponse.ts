import { Response } from "express";
import { IResponseData } from "../../interface/sendResponse.interface";

export const sendResponse = <T>(res: Response, responseData: IResponseData<T>) => {
  const { status, success, message, data, meta } = responseData;

  res.status(status).json({
    success,
    message,
    data,
    meta,
  });
};
