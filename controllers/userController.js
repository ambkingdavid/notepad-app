import { formatDate } from '../utils/helpers.js'
import User from '../models/user.model.js';
import Note from '../models/note.model.js';


class UserController {
  static async dashboard(req, res, next) {
    const query = {
      createdBy: req.user.id,
    };

    let notesObj = Note.find(query).lean();

    notesObj = notesObj.sort('-createdAt');

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 6;
    const skip = (page - 1) * limit;
    const totalNotes = await Note.countDocuments(notesObj);

    notesObj = notesObj.skip(skip).limit(limit);

    const numOfPage = Math.ceil(totalNotes / limit);
    console.log(numOfPage)

    const notesList = await notesObj;

    // parse updatedAt to human readable format
    const notes = notesList.map(formatDate);

    res.status(200).render('dashboard/index', {
      layout: '../views/layouts/dashboardPage',
      notes,
      totalNotes,
      numOfPage,
      page,
      limit,
    });
  }

  static async addNote(req, res, next) {
    res.redirect('/dashboard');
  }

  static async getNote(req, res, next) {
    console.log('Open')
    const note = await Note.findOne({
      _id: req.params.id,
    }).where({
      createdBy: req.user.id,
    }).lean()
    res.render('dashboard/viewNote', {
      layout: '../views/layouts/dashboardPage',
      note,
    })
  }
}

export default UserController;
