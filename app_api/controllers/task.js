var mongoose = require('mongoose');
var Task = mongoose.model('Task');

var sendJSONresponse = function(res, status, content) {
  return res.status(status).json(content);
};

module.exports.addingTask = function(req, res) {
  if(!req.body.name || !req.body.description || !req.body.category || !req.body.url) {
    return sendJSONresponse(res, 400, {
      "message": "All fields required"
    });
    return;
  }

  var task = new Task();
  
  task.name = req.body.name;
  task.description = req.body.description;
  task.category = req.body.category;
  task.url = req.body.url;


  task.save(function(err) {
    if (err) {
      sendJSONresponse(res, 404, err);
    } else {
      sendJSONresponse(res, 200, {
        data: {
        "task": task,
        }
      }); 
    }
  });
};

module.exports.getTasks = function(req, res) {
    
  Task.find()
  .exec(
      function(err, tasks) {
          if (!tasks) {
              sendJSONresponse(res, 404, {
                  "message": "Tasks not found"
                });
          } else {
              sendJSONresponse(res, 200, tasks);
          }
        }
  )
};
