export default interface GenericResponse<T = any> {
  ok: boolean;
  data?: T;
  error?: string;
  msg?: string;
  [key: string]: any;
}
