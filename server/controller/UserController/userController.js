const dotenv = require('dotenv');
dotenv.config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../../models/user/user");
const cloudinary = require("cloudinary");
const TokenModel = require("../../models/user/passwordToken");
const crypto = require("crypto");
const sendMail = require('../../utils/sendEmail');

// Get all user   
module.exports.getUsers = async (req) => {
    try {
        const { username } = req.query;

        const filter = {};

        if (username) {
            const words = username.split(' ') || "";

            if (words.length === 1) {
                filter.$or = [
                    { "fname": { $regex: words.join('|'), $options: 'i' } },
                    { "lname": { $regex: words.join('|'), $options: 'i' } }
                ];
            } else {
                filter.$and = [
                    { "fname": { $regex: words.join('|'), $options: 'i' } },
                    { "lname": { $regex: words.join('|'), $options: 'i' } }
                ];
            }
        }

        const users = await UserModel.find(filter).select("-password").sort({ createdAt: "-1" });

        if (!users) {
            return ({ status: false, error: "Users Does Not Exist!!" });
        }
        return ({ status: true, result: users });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}

// Get user profile
module.exports.getUserProfile = async (id) => {
    try {
        const user = await UserModel.findById(id).select("-password");
        if (!user) {
            return ({ status: false, error: "User Does Not Exist!!" });
        }
        return ({ status: true, result: user });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}

// Get single user details by admin
module.exports.getSingleUserDetails = async (id) => {
    try {
        const user = await UserModel.findById(id).select("-password");
        if (!user) {
            return ({ status: false, error: "User Does Not Exist!!" });
        }
        return ({ status: true, result: user });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}

// Update user profile   
module.exports.updateUserProfile = async (id, data) => {
    try {
        const user = await UserModel.findById(id);
        if (!user) {
            return ({ status: false, error: "User Does Not Exist!!" });
        }

        const imageId = user.avatar.public_id;
        // await cloudinary.v2.uploader.destroy(imageId);

        // const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        //     folder: "avatars",
        //     width: 150,
        //     crop: "scale",
        // });

        // req.body.avatar = {
        //     public_id: myCloud.public_id,
        //     url: myCloud.secure_url,
        // };
        //   }

        const updatedUser = await UserModel.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }).select("-password");

        return ({ status: true, result: updatedUser });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}

// Update user password   
module.exports.updateUserPassword = async (id, data) => {
    try {
        const user = await UserModel.findById(id);
        if (!user) {
            return ({ status: false, error: "User Does Not Exist!!" });
        }
        const isMatchPassword = await bcrypt.compare(data.oldPassword, user.password);

        if (!isMatchPassword) {
            return ({ status: false, error: "Old password is incorrect" });
        }

        if (data.newPassword !== data.cPassword) {
            return ({ status: false, error: "Password does not match" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(data.newPassword, salt);
        user.password = hashPassword;

        await user.save();

        // // Generate token
        // const token = jwt.sign(
        //     { user: { id: user._id, email: user.email } },
        //     process.env.JWT_KEY,
        //     { expiresIn: "24h" }
        // );
        return ({ status: true, result: user });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}

// Delete user by admin   
module.exports.deleteUser = async (id) => {
    try {
        const user = await UserModel.findByIdAndDelete(id);
        if (!user) {
            return ({ status: false, error: "User Does Not Exist!!" });
        }

        return ({ status: true, result: user });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}

// Upload user profile image   
module.exports.uploadProfileImage = async (id, data) => {
    try {

        const user = await UserModel.findById(id);
        if (!user) {
            return ({ status: false, error: "User Does Not Exist!!" });
        }

        if (user.avatar.public_id) {
            const imageId = user.avatar.public_id;
            await cloudinary.v2.uploader.destroy(imageId);
        }

        const myCloud = await cloudinary.v2.uploader.upload(data.avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale",
        });
        
        req.body.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        };
        const updatedUser = await UserModel.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });

        return ({ status: true, result: { user: updatedUser } });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}

// Update user password   
module.exports.setPasswordToken = async (data) => {
    try {
        const user = await UserModel.findOne({email: data.email});
        if (!user) {
            return ({ status: false, error: "User Does Not Exist!!" });
        }

        let token = await TokenModel.findOne({ userId: user._id });
        if (!token) {
            token = await TokenModel.create({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            });
            // token = await new TokenModel({
            //     userId: user._id,
            //     token: crypto.randomBytes(32).toString("hex"),
            // }).save();
        }

        const text = `<p style="font-weight: 700;">Hii ${user.fname + " " + user.lname},</p><br />
                  <p style="font-weight: 700;">We're sending you this email because you requested a password reset. Click on this link to create a new password</p>
                  <br />
                  <a href='http://localhost:3000/password-reset/${user._id.toString()}/${token.token}'><button style="padding: 10px; border: none; outline: none; background-color: #000000; border-radius: 8px; color: #fff;">Reset your password</button></a>
                  <br /><br />
                  <p style="font-weight: 500;">If you didn't request a password reset, you can ignore this email. Your password will not be changed.</p>
                  <br /><br /> <h5>Thanks, <br /> The Best 1 Cover House Team.</h5>`;

        sendMail(data.email, "Reset Your Password", text);
        return ({ status: true, result: text });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}

// Update user password   
module.exports.resetPassword = async (params, data) => {
    try {
        const user = await UserModel.findById(params.userId);
        if (!user) {
            return ({ status: false, error: "User Does Not Exist!!" });
        }
        let token = await TokenModel.findOne({
            userId: user._id,
            token: params.token
        });
        if (!token) {
            return ({ status: false, error: "Invalid link or expired" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(data.newPassword, salt);
        user.password = hashPassword;

        await user.save();
        await token.delete();

        // // Generate token
        // const token = jwt.sign(
        //     { user: { id: user._id, email: user.email } },
        //     process.env.JWT_KEY,
        //     { expiresIn: "24h" }
        // );
        return ({ status: true, result: user });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}

// Update user password   
module.exports.validResetPasswordToken = async (params, data) => {
    try {
        const user = await UserModel.findById(params.userId);
        if (!user) {
            return ({ status: false, error: "User Does Not Exist!!" });
        }

        let token = await TokenModel.findOne({
            userId: user._id,
            token: params.token
        });
        if (!token || new Date() - new Date(token.createdAt) > 10 * 60 * 1000) {
            token && await token.delete();
            return ({ status: false, error: "Invalid link or expired" });
        }

        // // Generate token
        // const token = jwt.sign(
        //     { user: { id: user._id, email: user.email } },
        //     process.env.JWT_KEY,
        //     { expiresIn: "24h" }
        // );
        return ({ status: true, result: user });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}