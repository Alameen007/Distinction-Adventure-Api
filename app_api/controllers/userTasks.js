var mongoose = require('mongoose');
var UserTasks = mongoose.model('UserTasks');
var Task = mongoose.model('Task');

var sendJSONresponse = function(res, status, content) {
  return res.status(status).json(content);
};

module.exports.addingUserTask = function(req, res) {
  if(!req.body.name || !req.body.description || !req.body.category || !req.body.url || !req.body.status) {
    return sendJSONresponse(res, 400, {
      "message": "All fields required"
    });
    return;
  }

  var task = new UserTasks();
  
  task.name = req.body.name;
  task.description = req.body.description;
  task.category = req.body.category;
  task.url = req.body.url;
  task.status = req.body.status;


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
  .then(function(tasks) {
    console.log('hey')
    sendJSONresponse(res, 200, tasks);
  })
  .catch(function(err) {
    sendJSONresponse(res, 404, {
      "message": "Tasks not found"
    });
  })
  
};


// .exec(
//   function(err, tasks) {
//       if (!tasks) {
//           sendJSONresponse(res, 404, {
//               "message": "Tasks not found"
//             });
//       } else {
//           sendJSONresponse(res, 200, tasks);
//       }
//     }
// )