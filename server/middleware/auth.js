const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const authHeader =  req.header('Authorization');
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Access Token not found" });
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.userId = decoded.userId;
    
    req.role = decoded.role;
    // if (decoded.exp > Date.now()) {
    //   return res.json({ success: false, message: "Token not found" });
    // }
    next();
  } catch (error) {
    console.log(error)
    return res
      .status(403)
      .json({ success: false, message: 'Invalid token'});
  }
};
const verifyAdmin = async (req, res, next) => {
  const role = req.role;
  if (role !== "admin") {
    return res.json({
      success: false,
      message: "Không có quyền để vào trang này",
    });
    
  }
  
  next();
};

// const verifyAuthorization = (req, res, next) => {

//     if (req.userId === req.params.id || req.role=="admin") {
//       next();
//     } else {
//       res.status(403).json("Không có quyền để vào trang này");
//     }
  
// };

module.exports = {verifyToken,verifyAdmin};
