const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, 'required']
    },
    last_name: {
        type: String,
        required: [true, 'required']
    },
    display_name: {
        type: String,
    },
    avartar: {
        type: String,
    },
    email: {
        type: String,
        required: [true, 'Please enter a valid mail!'],
        unique: [true, 'Email already exists'],
        validate: {
            validator: function(v) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    phone_number: {
        type: Number,
        sparse: true,
        unique: [true, 'Phone number already exists'],
    },
    age: { type: Number, default: 1 },
    is_active: {
        type: Boolean,
        default: true
    },
    password: {
        type: String,
        required: [true, 'required']
    },
    password_old: {
        type: String,
    },
    refresh_token: {
        type: String,
    },
    token_email: {
        type: String,
    },
    request_chat: {
        type: [String],
    },
    friends: {
        type: [String],
    },
    groups: {
        type: [String],
    },
    friends: {
        type: [String],
    },
}, { timestamps: true });

const User = mongoose.model('user', userSchema);

module.exports = User;