import { registerDecorator, ValidationOptions, ValidationArguments } from '@nestjs/class-validator';
import { UserService } from '../modules/users/user.service'; // Đảm bảo đường dẫn đúng

export function IsUnique(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isUnique',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      async validator(value: any, args: ValidationArguments) {
        const userService: UserService = args.object['userService']; // Lấy service từ context
        if (!userService) {
          throw new Error('UserService is not provided');
        }
        const isUnique = await userService.isEmailUnique(value);
        return isUnique; // Trả về kết quả kiểm tra tính duy nhất
      },
      
    });
  };
}
