var mongoose = require('mongoose');
var Promise = require('mongoose').Promise;
var User = mongoose.model('User');
var Task = mongoose.model('Task');
var UserTasks = mongoose.model('UserTasks');

var ObjectId = mongoose.Types.ObjectId;

var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.getUser = function (req, res, callback) {

    if (!req.params.userId) {
        sendJSONresponse(res, 404, {
            "message": "User not found"
        });
        return;
    }
    User.findOne({
            _id: req.params.userId
        })
        .exec(
            function (err, user) {
                if (!user) {
                    sendJSONresponse(res, 404, {
                        "message": "User not found"
                    });
                } else {
                    sendJSONresponse(res, 200, user);
                }
            }
        )
};

module.exports.getUserTasks = function (req, res, callback) {

    if (!req.params.userId) {
        sendJSONresponse(res, 404, {
            "message": "User not found"
        });
        return;
    }
    User.findOne({
            _id: req.params.userId
        })
        .then(user => {
            let minDate = new Date(1970, 1, 1)
            if (user.tasks.length > 0) {
                minDate = user.tasks[user.tasks.length - 1].created_at
            }
            return Promise.resolve(minDate)
        }).then(minDate => {
            return Task.find({
                created_at: {
                    $gt: minDate
                }
            })
        }).then(newTasks => {
            User.findOneAndUpdate({ _id: req.params.userId }, {
                    $push: {
                        tasks: {
                            $each: newTasks
                        }
                    }
                }, {
                    new: true
                })
                .then(user => {
                    sendJSONresponse(res, 200, user.tasks);
                })
        })
        .catch(function (err) {
            sendJSONresponse(res, 404, {
                "message": "Tasks not found"
            });
        })
};


module.exports.updateTaskStatus = function (req, res, callback) {

    if (!req.params.userId) {
        sendJSONresponse(res, 404, {
            "message": "User not found"
        });
        return;
    }
    User.findById(req.params.userId)
    .then(data => {
        data.tasks.id(req.params.taskId).status = "Progress";
        data.save();
       return data.tasks.id(req.params.taskId)
    })
    .then(task => {
        sendJSONresponse(res, 200, task);
    })
    .catch(function (err) {
        sendJSONresponse(res, 404, {
            "message": "Tasks not found"
        });
    })
};


module.exports.getTaskData = function (req, res, callback) {

    if (!req.params.userId) {
        sendJSONresponse(res, 404, {
            "message": "User not found"
        });
        return;
    }
    User.findOne({_id: req.params.userId}, 'tasks')
        .then(data => {
               return data.tasks.id(req.params.taskId)
        })
        .then(task => {
            sendJSONresponse(res, 200, task);
        })
        .catch(function (err) {
            sendJSONresponse(res, 404, {
                "message": "Tasks not found"
            });
        })

};

module.exports.updateTaskData = function (req, res, callback) {
    if (!req.params.userId) {
        sendJSONresponse(res, 404, {
            "message": "User not found"
        });
        return;
    }
    User.findOne({_id: req.params.userId}, 'tasks')
        .then(user => {
            const data = req.body
            user.tasks.id(req.params.taskId).data = {data};
            user.tasks.id(req.params.taskId).markModified('data')
            user.save();
            return user.tasks.id(req.params.taskId).data
        })
        .then(data => {
            sendJSONresponse(res, 200, data);
        })
        .catch(function (err) {
            sendJSONresponse(res, 404, {
                "message": "Tasks not found"
            });
        })

};
