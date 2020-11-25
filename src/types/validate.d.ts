export interface Expect {
  type: string;
  required?: boolean;
  enum?: any[];
  default?: any;
  properties?: any;
  pattern?: string;
  maximum?: number;
  minimum?: number;
  [name: string]: any;
}

export interface ErrField {
  [key: string]: any
}


export interface Parameters {
  [key: string]: Expect
}