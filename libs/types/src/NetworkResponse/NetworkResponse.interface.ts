export default interface NetworkResponse<T = any> {
  ok: boolean;
  data?: T;
  error?: string;
  msg?: string;
  [key: string]: any;
}
