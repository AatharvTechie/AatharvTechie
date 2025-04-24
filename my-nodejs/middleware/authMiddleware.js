require("dotenv").config();
const User = (req, res, next) => {
  const token = req.header("Authorization");

  // if token not found
  if (!token)
    return res
      .status(402)
      .json({ message: "Unauthorized User, access Denied" });

  // if token found
  try {
    const isVerified = jwt.verify(token, process.env.JWT_SECRET);
    console.log(isVerified);
    // req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

const authMiddleware = async (req, res, next) => {
  const token = await req.header("Authorization");

  if (!token) {
    return res
      .status(402)
      .json({ message: "Unauthorized User, access Denied" });
  }
  console.log(token);

  //  if token found
  jwtToken = token.replace("Bearer ", "").trim(); // to remove "Bearer "

  try {
    const isVerified = await jwt.verify(jwtToken, process.env.JWT_SECRET);
    console.log(isVerified);
    req.user = isVerified;
    res.status(200).json({ message: req.user });
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { User, authMiddleware };
