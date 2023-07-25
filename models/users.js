const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    type: {
        type: String,
        default: "user",
        enum: ["user", "admin", "super-admin"]
    },
    wallet: {
        type: String,
        default: null
    },
    photo: {
        type: String,
        default: null
    },
    referral: {
        code: {
            type: String,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId
        }
    },
    referrer_code: {
        type: String,
        unique: true
    },
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
});

module.exports = mongoose.model("User", schema, "users");