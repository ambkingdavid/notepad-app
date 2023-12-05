import express from 'express';
import dotenv from 'dotenv';
import expressEjsLayouts from 'express-ejs-layouts';

// routes
import indexRoutes from './routes/indexRoutes.js'

dotenv.config();

const app = express();
const port = process.env.PORT;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// static files
app.use(express.static('public'));


// template engines
app.use(expressEjsLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.use('/', indexRoutes);


app.get('*', (req, res) => {
  res.status(404).render('404')
})

app.listen(port, () => {
  console.log(`server running in ${process.env.MODE} mode on port ${port}`);
})