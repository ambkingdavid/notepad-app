import dotenv from 'dotenv';
dotenv.config()


import express from 'express';
import session from 'express-session';
import passport from 'passport';
import expressEjsLayouts from 'express-ejs-layouts';
import SessionStore from 'connect-mongo';

// files import
import mongoClient from './config/db.js';

// routes
import indexRoutes from './routes/indexRoutes.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/userRoutes.js';

mongoClient();

const app = express();

const port = process.env.PORT;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: SessionStore.create({
      mongoUrl: process.env.SESSION_STORAGE,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());


// static files
app.use(express.static('public'));


// template engines
app.use(expressEjsLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.use('/', indexRoutes);
app.use('/', authRoutes);
app.use('/', userRoutes);

app.get('*', (req, res) => {
  res.status(404).render('404');
})

app.listen(port, () => {
  console.log(`server running in ${process.env.MODE} mode on port ${port}`);
})
