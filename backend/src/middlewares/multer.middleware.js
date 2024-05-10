import multer from "multer";

const generateUniqueSuffix = () => {
  return Date.now() + "-" + Math.round(Math.random() * 1e9);
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (_, file, cb) {
    const uniqueSuffix = generateUniqueSuffix();
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

export const upload = multer({ storage });
