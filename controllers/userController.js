import User from '../models/user.model.js';


class UserController {
  static async dashboard(req, res, next) {
    res.status(200).render('dashboard', {
      layout: '../views/layouts/dashboardPage',
    })
  }
}

export default UserController;
