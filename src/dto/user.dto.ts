import { Rule, RuleType } from '@midwayjs/validate';

export class UserLoginDTO {
    @Rule(RuleType.string, { required: true })
    username: string;
  
    @Rule(RuleType.string, { required: true })
    password: string;
  }