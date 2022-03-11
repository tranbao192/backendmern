const express = require("express");
const router = express.Router();
const {verifyToken,verifyAdmin} = require("../middleware/auth")
const User = require('../models/User')
const mongoose = require('mongoose')


// Tìm tất cả user
router.get("/all", verifyToken, verifyAdmin, async (req, res) => {
    try {
        const users = await User.find();
        return res.json({ success: true, users });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
});
// Admin cập nhật người dùng
router.put("/all/:id", verifyToken,verifyAdmin, async (req, res) => {
    const { fullname, address, email, phonenumber,role } = req.body;
    const id = req.params.id;
    try {
      const user = await User.findOneAndUpdate(
        { _id: id },
        { $set: { fullname: fullname, address: address, email: email,phonenumber:phonenumber,role:role } },
        { new: true }
      );
      return res.json({ success: true, user });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
});
//Lấy thông tin cá nhân
router.get("/", verifyToken, async (req, res) => {
    try {
      const user = await User.findById(req.userId);
      if (!user) {
        return res.json({ success: false, message: "User not found" });
      }
      return res.json({ success: true, user });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ success: false, message: error.message });
    }
  });
// Admin xem số tài khoản đc tạo
router.get("/stats", verifyToken, verifyAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  
    try {
      const data = await User.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json(err);
    }
  });
//Xóa user
router.delete("/:id", verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      try {
        const user = await User.findByIdAndDelete(mongoose.Types.ObjectId(id));
        return res.json({ success: true, user });
      } catch (error) {
        return res.json({ success: false, message: error.message });
      }
});
//Sửa quyền người dùng
// router.put("/:id", verifyToken, verifyAdmin, async (req, res) => {
//     const { role } = req.body;
//     const { id } = req.params;
//     try {
//       const userUpdate = await User.findOneAndUpdate(
//         { _id: mongoose.Types.ObjectId(id) },
//         {
    //           $set: {
        //             role: role,
        //           },
        //         },
//         {
    //           new: true,
    //         }
    //       );
    //       return res.json({ success: true, userUpdate });
    //     } catch (error) {
        //       return res.json({ success: false, message: error.message });
//     }
//   });


//Sửa thông tin người dùng
router.put("/:id", verifyToken, async (req, res) => {
      const { fullname, address, email, phonenumber } = req.body;
      const id = req.userId;
      try {
        const user = await User.findOneAndUpdate(
          { _id: id },
          { $set: { fullname: fullname, address: address, email: email,phonenumber:phonenumber } },
          { new: true }
        );
        return res.json({ success: true, user });
      } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
      }
});

  module.exports = router;
