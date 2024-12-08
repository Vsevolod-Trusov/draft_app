import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";

@Module({
  imports: [UserModule],
  exports: [UserModule],
})
class ControllersModule {}

export { ControllersModule };
