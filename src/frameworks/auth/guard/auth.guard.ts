import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { JwtStrategyNames } from "core";
import { Observable } from "rxjs";

@Injectable()
export class CustomAuthGuard
  extends AuthGuard([JwtStrategyNames.Access, JwtStrategyNames.Refresh])
  implements CanActivate
{
  constructor() {
    super();
  }

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest(); // Получаем HTTP-запрос

    return super.canActivate(context);
  }
}
