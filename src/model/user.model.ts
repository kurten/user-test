import { InjectEntityModel } from '@midwayjs/orm';
import { UserEntity } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { Provide } from '@midwayjs/decorator';

@Provide()
export class UserModel {
    @InjectEntityModel(UserEntity)
    userRepo: Repository<UserEntity>;
  
    /**
     * 根据用户名和密码获取用户信息
     * @param username {String} 用户名
     * @param password {String} 用户密码
     */
    async getUserByUsernameAndPassword(username, password): Promise<UserEntity> {
      const e = new UserEntity();
      e.username = username;
      e.password = password;
      return this.userRepo.findOneBy(e);
    }
  }