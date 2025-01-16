import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { GenericBaseUseCase } from 'core';
import { OperationPrismaDictionary, SimpleExpression } from 'core/utils/parseFilter';
import { AbstractUserUseCase, DatabaseService } from 'gateways';

@Injectable()
export class UserUseCase extends GenericBaseUseCase<User> implements AbstractUserUseCase {
  constructor(private readonly _dataService: DatabaseService) {
    super(_dataService.userRepository);
  }

  getByFilter({ operator, right, left }: SimpleExpression): Promise<User[]> {
    let value = undefined;
    const normalizedLeft = left.toLowerCase();

    const fields = Object.fromEntries(
      Object.entries(this._dataService.userRepository.user.fields).map(([key, value]) => [key.toLowerCase(), value]),
    );
    const fieldType = fields[normalizedLeft]?.typeName;
    const fieldName = fields[normalizedLeft]?.name;

    if (!fieldType) {
      throw new Error(`Field ${normalizedLeft} not found in the schema`);
    }

    if (fieldType === 'DateTime' || fieldType === 'Date') {
      value = new Date(right);
      console.log(value);

      if (!value || isNaN(new Date(value).getTime())) {
        throw new Error('Invalid date string');
      }
    } else if (fieldType === 'Int') {
      value = +right;
    } else if (fieldType === 'Boolean') {
      value = right === 'true' ? true : false;
    } else {
      value = right;
    }

    const whereSection = {
      [fieldName]: {
        [`${OperationPrismaDictionary[operator]}`]: value,
      },
    };

    return this._dataService.userRepository.user.findMany({
      where: whereSection,
    });
  }
}
