import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework } from '@midwayjs/koa';

describe('test/controller/home.test.ts', () => {

  it('should POST /api/user/login', async () => {
    // create app
    const app = await createApp<Framework>();

    // make request
    const result = await createHttpRequest(app).post('/api/user/login').send({
      username: "jack",
      password: "redballoon"
    });

    // use expect by jest
    expect(result.status).toBe(200);
    expect(result.body.code).toBe(200);
    expect(result.body.result).toBe('success');
    expect(result.body.message).toBe('登录成功');
    expect(result.body.data.token).toBeDefined();

    const resulterr = await createHttpRequest(app).post('/api/user/login').send({
      username: "jackerr",
      password: "redballoonerr"
    });
    // use expect by jest
    expect(resulterr.status).toBe(200);
    expect(resulterr.body.code).toBe(400);
    expect(resulterr.body.result).toBe('error');
    expect(resulterr.body.message).toBe('账号或密码不正确');
    expect(resulterr.body.data).toBeNull();

    // 1s 超时
    let err;
    try {
      await createHttpRequest(app).post('/api/user/login').timeout(1000).send({
        username: "timeout",
        password: "redballoonerr"
      });
    } catch (e) {
      err = e;
    }
    
    // use expect by jest
    expect(err).toBeDefined();
    console.log('---->', err);

    // close app
    await close(app);
  });
});
