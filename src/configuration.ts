import { Configuration, App } from '@midwayjs/decorator';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import { join } from 'path';
import * as orm from '@midwayjs/orm';
import * as jwt from '@midwayjs/jwt';
// import { DefaultErrorFilter } from './filter/default.filter';
// import { NotFoundFilter } from './filter/notfound.filter';
import { ReportMiddleware } from './middleware/report.middleware';

import { InjectEntityModel } from '@midwayjs/orm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';

@Configuration({
  imports: [
    koa,
    validate,
    jwt,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
    orm,
  ],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle {
  @App()
  app: koa.Application;

  @InjectEntityModel(UserEntity)
  userRepo: Repository<UserEntity>;

  async onReady() {
    // add middleware
    this.app.useMiddleware([ReportMiddleware]);
    // add filter
    // this.app.useFilter([NotFoundFilter, DefaultErrorFilter]);

    const u = new UserEntity();
    u.username = 'jack';
    u.password = 'redballoon';
    const ret = await this.userRepo.findOneBy(u)
    if (!ret) {
      await this.userRepo.save(u);
    }
  }
}
