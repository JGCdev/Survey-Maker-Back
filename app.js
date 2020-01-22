var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    cors            = require("cors");
    mongoose        = require('mongoose');

const environment = process.env.NODE_ENV || 'development';

// Connection to DB
mongoose.connect("mongodb://localhost:27017/surveys",{ useUnifiedTopology: true, useNewUrlParser: true}).then( () => {
  console.log('DB Connected!');
}).catch( (err) => {
  console.log(err);
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (environment === 'development') {
  app.use(cors());
}

// Import Models and controllers
var models     = require('./models/encuesta')(app, mongoose);
var EncuestaCtrl = require('./controllers/encuesta');

// Example Route
var router = express.Router();
router.get('/api/surveymaker/', function(req, res) {
  res.send("<h2>Surveymaker API Works!</h2>");
});
app.use(router);

// API routes
var encuestas = express.Router();

encuestas.route('/encuestas')
  .get(EncuestaCtrl.findAllEncuestas)
  .post(EncuestaCtrl.addEncuesta);

encuestas.route('/encuestas/:id')
  .get(EncuestaCtrl.findById)
  .put(EncuestaCtrl.updateEncuesta)
  .delete(EncuestaCtrl.deleteEncuesta);

encuestas.route('/usuario/encuestas/:email')
  .get(EncuestaCtrl.findByEmail);

app.use('/api/surveymaker/', encuestas);

// Start server
app.listen(3001, function() {
  console.log("Node server running on http://localhost:3001");
});
