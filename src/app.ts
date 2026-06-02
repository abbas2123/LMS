import express from 'express';
import path from 'path';
import {config} from 'dotenv';
import bodyParser from 'body-parser'
import methodOverride from 'method-override';
import connectDB from './db/connectDB';
import errorHandler from './middleware/errorHandler';
import studentRoutes from './routes/studentRoutes';


//load db conncetion and environment variable
config()
connectDB();

//initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

//set up middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(methodOverride('_method'));

//view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`, req.body);
  next();
});

//routes
app.use('/', studentRoutes);
//errorhandling middleware
app.use(errorHandler);

//start server
app.listen(PORT, ()=>{
    console.log('Server is started at port 3000');
})