export interface PaginateResult<T> {
  Data: {
    PageIndex: number;
    PageSize: number;
    TotalCount: number;
    Result: T[];
  };
  IsSuccess: boolean;
  Errors: string[];
  Successes: string[];
  IsLoading: boolean;
}

export interface Result<T> {
  Data: T | null;
  IsSuccess: boolean;
  IsFailed: boolean;
  Errors: string[];
  Messages: string[];
}

export interface InfiniteResult<T> {
  Data: T | null;
  IsSuccess: boolean;
  Errors: string[];
  Successes: string[];
  HasMore: boolean
}

export interface DialogContext<T = null> {
  state?: boolean;
  onShow?: (id: number) => void;
  onConfirm?: Function;
  onCancel?: Function;
  content?: T | null;
}
export interface BaseRequest {
  PageIndex?: number;
  PageSize?: number;
  TotalCount?: number;
  OrderBy?: string[];
}

export enum RoleTypes {
  Customer = 1,
  Merchant = 2,
  Admin = 3,
}


export interface Message {
  Message: string;
  Raw: string;
  StackFrames: [];
  Type: string;
}
export interface Exception {
  detail: string;
  exceptionDetails?: Message[];
  Message: string;
  Raw: string;
  StackFrames: [];
  Type: string;
  instance: string;
  status: number;
  title: string;
  traceId: string;
  type: string;
}

export interface ExceptionError {
  IsSuccess: boolean;
  IsFailed: boolean;
  Errors: string[];
  Successes: string[];
  IsLoading: boolean;
}
