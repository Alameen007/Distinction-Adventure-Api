var mongoose = require( 'mongoose' );


var taskSchema = new mongoose.Schema({
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
},
{
    timestamps: { 
        createdAt: 'created_at', 
        updatedAt: 'updated_at',
    }
}
);



mongoose.model('Task', taskSchema); 
