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
        required: [true, 'required'],
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
        required: [true, 'required'],
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
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;