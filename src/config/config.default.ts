import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1655884314411_4059',
  koa: {
    port: 7001,
  },
  orm: {
    type: "sqlite",
    database: ":memory:",
    synchronize: true,     // 如果第一次使用，不存在表，有同步的需求可以写 true
    logging: false,
  },
  jwt: {
    secret: 'localtestfortest', // fs.readFileSync('xxxxx.key')
    expiresIn: 3600, 
  }
} as MidwayConfig;
