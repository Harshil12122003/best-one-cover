const dotenv = require('dotenv');
dotenv.config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../../models/user/user");

// Register a New user
module.exports.registerUser = async (data) => {
    const { password, cpassword } = data;
    if (password === cpassword) {
        try {
            //  Find old user 
            const oldUser = await UserModel.findOne({ email: data.email });
            if (oldUser)
                return { status: false, code: 400, error: "User already exists!!" };

            // const myCloud = await cloudinary.v2.uploader.upload(data.avatar, {
            //     folder: "avatars",
            //     width: 150,
            //     crope: "scale"
            // })

            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            data.password = hashPassword;
            // data.avatar = {
            //     public_id: myCloud.public_id,
            //     url: myCloud.secure_url,
            // }
            const newUser = new UserModel(data);
            const user = await newUser.save();

            // Generate token
            const token = jwt.sign(
                { user: { id: user._id, email: user.email} },
                process.env.JWT_KEY,
                // { expiresIn: "24h" }
            );

            return { status: true, result: {user, token} };

        } catch (error) {
            return { status: false, code: 500, error: error.message };
        }
    } else {
        return { status: false, code: 500, error: "Password Is Not Matched" };
    }
}

// Login User   
module.exports.loginUser = async (data) => {
    const { email, password } = data;

    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return { status: false, code:400, error: "User does not exist!" };
        }

        const isMatchPassword = await bcrypt.compare(password, user.password);

        if (isMatchPassword) {
            // Generate token
            const token = jwt.sign(
                { user: { id: user._id, email: user.email } },
                process.env.JWT_KEY,
                // { expiresIn: "24h" }
            );
            return { status: true, result: {user, token} };
        } else {
            return { status: false, code: 400, error: "Username or Password is not Match" };
        }
    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}