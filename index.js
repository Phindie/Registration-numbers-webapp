const exphbs = require('express-handlebars');
const flash = require('express-flash');
const session = require('express-session');
const Registrations = require('./registration-numbers')
const Routes = require ('./route/Routes')
const Services = require ('./services/numberServices')
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const pg = require("pg");
const Pool = pg.Pool;



let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
  useSSL = true;
}
const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/my_registration';

const pool = new Pool({
  connectionString,
  ssl: useSSL
});

 const reg = Registrations();

  // initialise session middleware - flash-express depends on it
  app.use(session({
    secret : "<add a secret string here>",
    resave: false,
    saveUninitialized: true
  }));

  app.engine('handlebars',
    exphbs({
      defaultLayout: 'main',

    }));
  // initialise the flash middleware
  app.use(flash());

  app.set('view engine', 'handlebars');
  //bodyParser process or converting html data sent to the server
  app.use(bodyParser.urlencoded({
    extended: false
  }))
  app.use(bodyParser.json());
  app.use(express.static('public'));


  const services = Services(pool);
  const plateRoute = Routes(services);
 
 
  app.get('/', plateRoute.home);
  //   res.render('home', {Numbers:reg.displayReg()});
  // });

  app.post('/registration', plateRoute.reporting) 


//     const textinput = req.body.nums;
//     const addTown = req.body.selectTown;

// console.log(reg.addedNumbers(textinput));
// console.log(reg.displayReg());

//     let checkReg = reg.addedNumbers(textinput);
//     let dropdown = reg.townFilter(addTown);
    
//    res.render('home', {checkReg,dropdown,Numbers:reg.displayReg()});

//     });

  app.get('/addFlash', function (req, res) {
    req.flash('info', 'Flash Message Added');
    res.redirect('/');
  });

app.post('/registration', function (req,res){


})
  const PORT = process.env.PORT || 3001;

  app.listen(PORT, function () {
      console.log("started on: ", this.address().port);
  });
