const mongoose = require('mongoose');

const zoomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'required']
    },
    avartar: {
        type: String,
    },
    describe: {
        type: String,
    },
    users: {
        type: [String],
    },
    admin_user: {
        type: [String],
    },
    blockUsers: {
        type: [String],
    },
    creator: {
        type: String,
    },
    is_active: {
        type: Boolean,
        default: true
    },
    is_group: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Zooms = mongoose.model('zooms', zoomSchema);

module.exports = Zooms;