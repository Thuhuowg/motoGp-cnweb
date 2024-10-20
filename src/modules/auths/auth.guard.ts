import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private jwtservice: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request=context.switchToHttp().getRequest();
        const token= this.extractTokenFromHeader(request)
        if (!token) {
            throw new UnauthorizedException();
          }
          try {
            const payload = await this.jwtservice.verifyAsync(
              token,
              {
                // secret: process.env.ACCESS_SECRET_KEY
                secret:'access-token'
              }
            );
          
            request['user'] = payload;
            const decoded = this.jwtservice.verify(token);
            request.user = decoded;
          console.log(payload)
          } catch {
            throw new UnauthorizedException();
          }
          return true;
    }
    private extractTokenFromHeader(request:Request):string |undefined {
        const [type,token]= request.headers.authorization?.split(' ') ?? []
        return type === 'Bearer' ? token:undefined
    }
}