module.exports = class Controller {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  callRoute(route) {
    // Execute the action of the route
    const result = this[route.action]();

    // // =>
    // const handler = this[route.action];
    // // =>
    // const handler = this['create'];
    // // =>
    // const handler = this.create;
    // // =>
    // const result = handler();
// 
    if (this.res.statusCode) {
      this.res.statusCode = 200;
    }

    this.res.write(result);
    this.res.end();
  }

  static middleware(req, res, next) {
    for (const route of this.routes) {
      if (req.method === route.method && req.url === route.url) {
        const ctrl = new this(req, res)
        ctrl.callRoute(route);
        return;
      }
    }

    next();
  }
}