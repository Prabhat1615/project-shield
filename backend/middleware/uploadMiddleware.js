const multer = require("multer");
const fs = require("fs");
const path = require("path");

const uploadDirectory = path.join(__dirname, "../uploads/logs");
fs.mkdirSync(uploadDirectory, { recursive: true });

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, uploadDirectory);
    },

    filename: function(req,file,cb){
        const safeName = path.basename(file.originalname).replace(/[^a-zA-Z0-9._-]/g, "_");
        cb(null, `${Date.now()}-${safeName}`);
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024,
        files: 1,
    },
    fileFilter: function(req, file, cb) {
        const extension = path.extname(file.originalname).toLowerCase();
        const allowedMimeTypes = ["text/csv", "application/csv", "application/vnd.ms-excel"];

        if (extension !== ".csv" || !allowedMimeTypes.includes(file.mimetype)) {
            const error = new Error("Only CSV files up to 5 MB are accepted");
            error.status = 400;
            return cb(error);
        }

        cb(null, true);
    },
});

module.exports = upload;
