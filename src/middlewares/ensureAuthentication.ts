import { Response, Request, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuthentication(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token is missing!", 401);
  }

  // Bearer 9923dsffsdvasd-234234
  // desestruturando o bearer token para pegar apenas o token
  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      "021240c0818738f237974026940b19b1"
    ) as IPayload;

    const usersRepository = new UsersRepository();

    const user = usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("User does not exists!", 401);
    }

    next();
  } catch {
    throw new AppError("Invalid token!", 401);
  }
}
