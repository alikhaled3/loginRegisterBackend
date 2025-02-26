import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authMiddleware = (context) => {
  const authHeader = context.req.headers.authorization;
  if (!authHeader) throw new Error("Authorization token required");

  try {
    const user = jwt.verify(authHeader, process.env.JWT_SECRET);
    return user;
  } catch (error) {
    throw new Error("Invalid/Expired token");
  }
};
import multer from "multer"


 const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null,  file.fieldname+ '-' + uniqueSuffix +file.originalname)
    }
  })

const upload = multer({ storage: storage })
  


export default authMiddleware;
