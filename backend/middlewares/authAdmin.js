import jwt from 'jsonwebtoken';

const authAdmin = async (req, res, next) => {
  try {
    const atoken = req.headers['atoken'];

    if (!atoken) {
      return res.json({ success: false, message: "Not authorized" });
    }

    const decoded = jwt.verify(atoken, process.env.JWT_SECRET);

    if (decoded.email !== process.env.ADMIN_EMAIL) {
      return res.json({ success: false, message: "Not authorized" });
    }

    next();

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export default authAdmin;