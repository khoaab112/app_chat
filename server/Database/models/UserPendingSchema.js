const mongoose = require('mongoose');

const UserPendingSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, 'required']
    },
    last_name: {
        type: String,
        required: [true, 'required']
    },
    email: {
        type: String,
        required: [true, 'Please enter a valid mail!'],
        unique: [true, 'Check email !'],
        validate: {
            validator: function(v) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    password: {
        type: String,
        required: [true, 'required']
    },
    token: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 10800 // 10800 s
    }
});

const UserPending = mongoose.model('user_pending', UserPendingSchema);

module.exports = UserPending;