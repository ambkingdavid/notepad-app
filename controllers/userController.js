import { formatDate } from '../utils/helpers.js'
import User from '../models/user.model.js';
import Note from '../models/note.model.js';


class UserController {
  static async dashboard(req, res, next) {
    const user = await User.findById(req.user.id);
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

    const notesList = await notesObj;

    // parse updatedAt to human readable format
    const notes = notesList.map(formatDate);

    res.status(200).render('dashboard/index', {
      layout: '../views/layouts/dashboardPage',
      user,
      notes,
      totalNotes,
      numOfPage,
      page,
      limit,
    });
  }

  static async addNote(req, res) {
    const { title, content } = req.body;
    req.body.createdBy = req.user.id;
    if (!title) {
      const message = 'Title field required'
      return res.status(400).redirect('/dashboard/new-note')
    }
    const newNote = await Note.create(req.body);

    res.status(201).redirect(`/dashboard/note/${newNote._id}`);
  }

  static async updateNote(req, res) {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).redirect(`/dashboard/note/${req.params.id}`);
    }

    try {
      await Note.findByIdAndUpdate(req.params.id, req.body).where(req.user.id);
      res.status(500).redirect(`/dashboard/note/${req.params.id}`);
    } catch (err) {
      console.log(err)
      res.status(500).redirect(`/dashboard/note/${req.params.id}`);
    }

  }

  static async deleteNote(req, res) {
    const note = await Note.findOne({ _id: req.params.id}).where(req.user.id);
    if (!note) {
      return res.status(404).render('404');
    }
    await Note.findByIdAndDelete(req.params.id).where(req.user.id);
    res.status(200).redirect('/dashboard');
  }

  static async newNotePage(req, res) {
    const user = await User.findById(req.user.id);
    const locals = {
      title: 'NotePad',
      description: 'Create Note',
    }

    res.render('dashboard/newNote', {
      locals,
      layout: '../views/layouts/dashboardPage',
      user,
    });
  }

  static async getNote(req, res, next) {
    console.log('Open')
    const note = await Note.findOne({
      _id: req.params.id,
    }).where({
      createdBy: req.user.id,
    }).lean()
    const formatDate = new Date(note.createdAt);
    note.createdAt = formatDate.toLocaleString();
    res.render('dashboard/viewNote', {
      layout: '../views/layouts/dashboardPage',
      note,
    })
  }
}

export default UserController;
