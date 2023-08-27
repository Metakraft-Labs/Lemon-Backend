const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    approved: {
        type: Boolean,
        default: true
    },
    comments: {
        type: String
    },
    approved_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    status: {
        type: String,
        default: "pending",
        enum: ["pending", "active", "rejected"],
    },
    slug: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ["game", "metaverse", "ai"]
    },
    images: [
        {
            type: String
        }
    ],
    thumbnail: {
        type: String,
        required: true,
    },
    zip: {
        type: String
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    link: {
        type: String,
    },
    iframe: {
        type: String,
    },
    socials: {
        telegram: {
            type: String,
        },
        twitter: {
            type: String,
        },
        instagram: {
            type: String,
        },
        facebook: {
            type: String,
        },
        twitch: {
            type: String,
        },
        youtube: {
            type: String,
        },
        threads: {
            type: String,
        }
    }
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
});

module.exports = mongoose.model("Entity", schema, "entities");