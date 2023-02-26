import { Request, Response, NextFunction } from 'express'
import { StdRespBody } from './types'

export async function setHeaders(
  req: Request,
  res: Response<StdRespBody>,
  next: NextFunction
): Promise<void> {
  res.set('Access-Control-Allow-Origin', '*')
  res.set(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  res.set('Access-Control-Allow-Methods', 'DELETE, POST, PUT, GET, OPTIONS')
  next()
}

export function handleTest(req: Request, res: Response<StdRespBody>) {
  return res.status(200).json({
    message: 'Greetings from API server' + req.body.name,
  })
}

//jj. How to send msg
export function sendMsg(
  // req:Request, 
  res: Response<StdRespBody>) {
  return res.send({ message: 'Hello' });
}

//jj. How to receive a msg
export function receiveMsg(
  req: Request,
  // res:Response<StdRespBody>
) {
  const msgFormSpace = req.body
  console.log(msgFormSpace)
  // return msgFormSpace
} 