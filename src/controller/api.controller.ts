import { Inject, Controller, Get, Query, Post, Body, Config } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { UserLoginDTO } from '../dto/user.dto';
import { UserModel } from '../model/user.model';
import { UserService } from '../service/user.service';
import { JwtService } from '@midwayjs/jwt';

@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Inject()
  userModel: UserModel;

  @Inject()
  jwtService: JwtService;

  @Config('jwt')
  jwtConfig: any;

  @Get('/get_user')
  async getUser(@Query('uid') uid) {
    const user = await this.userService.getUser({ uid });
    return { success: true, message: 'OK', data: user };
  }

  @Post('/user/login')
  async doLogin(@Body() user: UserLoginDTO) {
    // 模拟超时case
    if (user.username === 'timeout') {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({ code: 200 });
        }, 15000);
      });
    }
    const userInfo = await this.userModel.getUserByUsernameAndPassword(user.username, user.password);
    if (userInfo) {
      return {
        code: 200,
        result: 'success',
        message: '登录成功',
        data: {
          token: this.jwtService.signSync(JSON.parse(JSON.stringify(userInfo))),
        }
      }
    } else {
      return {
        code: 400,
        result: 'error',
        message: '账号或密码不正确',
        data: null
      };
    }
  }
}
