import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        },
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        // select: false // Exclude password from queries by default
    }
}, {
    timestamps: true // Automatically manage createdAt and updatedAt fields
});

userSchema.pre('save', function hashPassword(next) {
    const user = this;
    const SALT_ROUNDS = 10;
    const hashPassword = bcrypt.hashSync(user.password, SALT_ROUNDS);
    user.password = hashPassword;
    next();
})

const User = mongoose.model("User", userSchema);

export default User;