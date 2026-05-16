const dotenv = require('dotenv');
dotenv.config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AdminModel = require("../../models/user/admin");
const TokenModel = require("../../models/user/passwordToken");
const crypto = require("crypto");
const sendMail = require('../../utils/sendEmail');

// Get all admin
module.exports.getAdmins = async (req) => {
    try {
        const { username, role } = req.query;

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

        if (role) {
            filter.role = role;
        }

        const admins = await AdminModel.find(filter).select("-password").populate("shop");
        if (!admins) {
            return ({ status: false, error: "Admins Does Not Exist!!" });
        }
        return ({ status: true, result: admins });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}

// Get admin profile
module.exports.getAdminProfile = async (id) => {
    try {
        const admin = await AdminModel.findById(id).select("-password");
        if (!admin) {
            return ({ status: false, error: "Admin Does Not Exist!!" });
        }
        return ({ status: true, result: admin });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}

// Get single admin details
module.exports.getSingleAdminDetails = async (id) => {
    try {
        const admin = await AdminModel.findById(id).select("-password");
        if (!admin) {
            return ({ status: false, error: "Admin Does Not Exist!!" });
        }
        return ({ status: true, result: admin });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}

// Update admin profile
module.exports.updateAdminProfile = async (id, data) => {
    try {
        const admin = await AdminModel.findById(id);
        if (!admin) {
            return ({ status: false, error: "Admin Does Not Exist!!" });
        }

        const imageId = admin.avatar.public_id;
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

        const updatedAdmin = await AdminModel.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }).select("-password");

        return ({ status: true, result: updatedAdmin });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}

// Update admin password
module.exports.updateAdminPassword = async (id, data) => {
    try {
        const admin = await AdminModel.findById(id);
        if (!admin) {
            return ({ status: false, error: "Admin Does Not Exist!!" });
        }
        const isMatchPassword = await bcrypt.compare(data.oldPassword, admin.password);

        if (!isMatchPassword) {
            return ({ status: false, error: "Old password is incorrect" });
        }

        if (data.newPassword !== data.cPassword) {
            return ({ status: false, error: "Password does not match" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(data.newPassword, salt);
        admin.password = hashPassword;

        await admin.save();

        // // Generate token
        // const token = jwt.sign(
        //     { user: { id: user._id, email: user.email } },
        //     process.env.JWT_KEY,
        //     { expiresIn: "24h" }
        // );
        return ({ status: true, result: admin });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}

// Delete admin by super admin
module.exports.deleteAdmin = async (id) => {
    try {
        const admin = await AdminModel.findByIdAndDelete(id);
        if (!admin) {
            return ({ status: false, error: "Admin Does Not Exist!!" });
        }

        return ({ status: true, result: admin });

    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}


// Create new admin by super admin
module.exports.createAdmin = async (data) => {
    const { password, cpassword } = data;
    
    if (password === cpassword) {
        try {
            //  Find old user 
            const oldAdmin = await AdminModel.findOne({ email: data.email });
            if (oldAdmin)
                return { status: false, code: 400, error: "Admin already exists!!" };

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
            const newAdmin = new AdminModel(data);
            const admin = await newAdmin.save();

            // Generate token
            const token = jwt.sign(
                { admin: { id: admin._id, email: admin.email} },
                process.env.JWT_KEY,
                { expiresIn: "24h" }
            );

            return { status: true, result: {admin, token} };

        } catch (error) {
            return { status: false, code: 500, error: error.message };
        }
    } else {
        return { status: false, code: 500, error: "Password Is Not Matched" };
    }
}

// Login admin   
module.exports.loginAdmin = async (data) => {
    const { email, password } = data;

    try {
        const admin = await AdminModel.findOne({ email });
        if (!admin) {
            return { status: false, code:400, error: "Admin does not exist!" };
        }

        const isMatchPassword = await bcrypt.compare(password, admin.password);

        if (isMatchPassword) {
            // Generate token
            const token = jwt.sign(
                { user: admin },
                process.env.JWT_KEY,
                { expiresIn: "48h" }
            );
            return { status: true, result: {admin, token} };
            
        } else {
            return { status: false, code: 400, error: "Username or Password is not Match" };
        }
    } catch (error) {
        return { status: false, code: 500, error: error.message };
    }
}


// Update user password   
module.exports.setPasswordToken = async (data) => {
    try {
        const user = await AdminModel.findOne({email: data.email});
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
                  <a href='http://localhost:3000/password-reset/${user._id.toString()}/${token.token}'><button style="padding: 10px; border: none; outline: none; background-color: #065606; border-radius: 8px; color: #fff;">Reset your password</button></a>
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
        const user = await AdminModel.findById(params.userId);
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
        const user = await AdminModel.findById(params.userId);
        if (!user) {
            return ({ status: false, error: "User Does Not Exist!!" });
        }

        let token = await TokenModel.findOne({
            userId: user._id,
            token: params.token
        });
        if (!token || (new Date() - new Date(token.createdAt) > 10 * 60 * 1000)) {
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