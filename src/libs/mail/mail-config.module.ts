import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";

import { DependenciesNames } from "core";

import { MailService } from "./mail.service";

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: "smtps://user@domain.com:pass@smtp.domain.com",
        preview: true,
        // template: {
        //   dir: path.join(process.cwd(), "templates/pages"),
        //   adapter: new HandlebarsAdapter(),
        //   options: {
        //     strict: true,
        //   },
        // },
        // options: {
        //   partials: {
        //     dir: path.join(process.cwd(), "templates/partials"),
        //     options: {
        //       strict: true,
        //     },
        //   },
        // },
      }),
    }),
  ],
  providers: [
    {
      provide: DependenciesNames.MailService,
      useClass: MailService,
    },
  ],
  exports: [DependenciesNames.MailService],
})
export class MailConfigModule {}
