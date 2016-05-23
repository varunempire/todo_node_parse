var express  = require('express');
var app      = express();          
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var Parse = require('parse/node');

app.use(morgan('dev'));     
app.use(bodyParser.urlencoded({extended: true}));     
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

Parse.initialize("20FgbCzAOMXlecBcAPHojaQPPHiW4ny8BpITdPvg","flNgiQnpmEdEicxjyALua2EmAImRFtFCPhdWOvqO");
var jsonParser = bodyParser.json();


app.use(express.static(__dirname));
app.get('/', function(request, response){
    response.sendFile("./index.html");
    
});

app.post('/', function(request, response){
    
});
    
app.post('/api/todos', jsonParser, function(request, response) {
    console.log(request.query.text);
    console.log('post call');
    var Todo = Parse.Object.extend("Todo");
    var todoContent = new Todo();
    todoContent.save("todoContent", request.query.text);
    todoContent.save("isDone", false);
    var Todo = Parse.Object.extend("Todo");
    var query = new Parse.Query(Todo);
    query.find({
      success: function(results) {
        console.log(results);
      response.send(results);
      },
    
      error: function(error) {

      }
    });
    
});
app.get('/api/todos', function(request, response) {
var Todo = Parse.Object.extend("Todo");
var query = new Parse.Query(Todo);
query.find({
  success: function(results) {
    console.log(results);
    results.forEach(function(value, index){
      console.log(value.get('isDone'));
      console.log(value.get('todoContent'));
    });
   response.send(results);
  },

  error: function(error) {
    // error is an instance of Parse.Error.
  }
});
});

app.post('/api/todosUpdate', jsonParser, function(request, response) {
    console.log(request.query);
    console.log('post call');
    var Todo = Parse.Object.extend("Todo");
    var todoContent = new Todo();
    todoContent.save({
      objectId: request.query.id,
      isDone: Boolean(request.query.isDone) 
    }, {
      success: function(results) {
        
        response.send(results);
      },
      error: function(results, error) {
        console.log(error);
      }
    }); 
});

app.post('/api/todosDelete', jsonParser, function(request, response) {
    console.log(request.query);
    console.log('post call');
    var Todo = Parse.Object.extend("Todo");
    var todoContent = new Todo();
    todoContent.destory({
      objectId: request.query.id
    }, {
      success: function(results) {
        
        response.send(results);
      },
      error: function(results, error) {
        console.log(error);
      }
    });    
});

app.listen(8080);
console.log("App listening on port 8080");
 