const multer = require("multer");

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        if (file) {
            const splitFile = file.originalname.split(".");
            const originalFilename = splitFile[0];
            const extensionFilename = splitFile[1];
            cb(null, originalFilename + "_" + new Date().getTime() + "." + extensionFilename);
        }
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

module.exports = multer({storage: fileStorage, fileFilter: fileFilter}).single("image");