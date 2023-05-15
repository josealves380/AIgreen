import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken"

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization;

  if(!authToken) {
    return response.status(401).json({
      message: "Token is missing"
    });
  }
  const [, token] = authToken.split(" ");

  try{
    verify(token, "acb5ebba-5578-4e52-b03f-910f3e45c269");
  
    return next();  
  }catch(err){
    return response.status(401).json({
      message: "token invalid"
    })
  }
}