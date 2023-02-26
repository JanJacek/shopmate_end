/*
 * File for additional types that found no place in models
 */
// Usefull type declaration
export type Message = {
  message: string;
};
export type StdRespBody<T = Message> = T | Message
