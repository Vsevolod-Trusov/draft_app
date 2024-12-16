import { MailData } from 'libs';

abstract class AbstractMailUseCase {
  abstract sendMail(mail: MailData);
}

export { AbstractMailUseCase };
