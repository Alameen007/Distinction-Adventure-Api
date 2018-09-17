var mongoose = require( 'mongoose' );


var userTaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
       required: true,
    },
    url: {
        type: String,
       required: true,
    },
    status: {
        type: String,
        "default": "prospect"
    },
    point: {
        type: Number,
        "default": 0
    },
    data: mongoose.Schema.Types.Mixed,
},
{
    timestamps: { 
        createdAt: 'created_at', 
        updatedAt: 'updated_at',
    }
}
);



mongoose.model('UserTasks', userTaskSchema);

module.exports = userTaskSchema