import User from '../models/user.model.js';
import Note from '../models/note.model.js';


class UserController {
  static async dashboard(req, res, next) {
    res.status(200).render('dashboard/index', {
      layout: '../views/layouts/dashboardPage',
    });
  }

  static async addNote(req, res, next) {
    res.status(201).redirect('/dashboard');
  }
}

export default UserController;
