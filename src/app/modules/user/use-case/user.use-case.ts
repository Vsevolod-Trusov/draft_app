import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { GenericBaseUseCase } from 'core';
import { CombinedExpression, OperationPrismaDictionary } from 'core/utils/parseFilter';
import { AbstractUserUseCase, DatabaseService } from 'gateways';

@Injectable()
export class UserUseCase extends GenericBaseUseCase<User> implements AbstractUserUseCase {
  constructor(private readonly _dataService: DatabaseService) {
    super(_dataService.userRepository);
  }

  getByFilter({ combined, children }: CombinedExpression): Promise<User[]> {
    let value = undefined;

    let combineSection = {};
    let whereSection = {};

    if (combined) {
      combined = combined.toUpperCase() as 'and' | 'or';
      combineSection = {
        [combined]: [],
      };
    }

    const fields = Object.fromEntries(
      Object.entries(this._dataService.userRepository.user.fields).map(([key, value]) => [key.toLowerCase(), value]),
    );

    for (const { left, right, operator } of children) {
      const normalizedLeft = left.toLowerCase();

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

      if (combineSection[combined]) {
        combineSection[combined].push({
          [fieldName]: {
            [`${OperationPrismaDictionary[operator]}`]: value,
          },
        });
      } else {
        whereSection = {
          [fieldName]: {
            [`${OperationPrismaDictionary[operator]}`]: value,
          },
        };
      }
    }

    const where = {
      where: combineSection[combined] ? combineSection : whereSection,
    };

    return this._dataService.userRepository.user.findMany(where);
  }
}
