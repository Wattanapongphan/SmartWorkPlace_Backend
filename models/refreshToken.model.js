const mongoose = require('mongoose');

const refreshTokenSchema = new mongoose.Schema({
    token: { type: String, required: true},
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    expires_at: { type: Date, required: true },
    created_at: { type: Date, default: Date.now },
    revoked: { type: Boolean, default: false }
}, {
    timestamps: true,
});

module.exports = mongoose.model('RefreshToken', refreshTokenSchema);