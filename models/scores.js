const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    entity_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Entity",
    },
    timesplayed: [
        {
            time: {
                type: Number,
            },
            date: {
                type: Date
            }
        }
    ],
    scores: [
        {
            score: {
                type: Number,
            },
            date: {
                type: Date
            }
        }
    ]
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
});

module.exports = mongoose.model("Score", schema, "scores");