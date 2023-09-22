const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");

const defaultPath = "public/images";
const fileTypes = ["jpg", "jpeg", "png", "gif", "webp", "svg"];
const maxSize = 1 * 1024 * 1024; // 1Mb

async function createDir(path) {
    const isDirExist = fs.existsSync(path);
    if (!isDirExist) {
        await fs.promises.mkdir(path, {
            recursive: true,
        });
    }
}

function getType(file) {
    return file.mimetype.split("/")[1];
}

const storage = multer.diskStorage({
    destination: async function (req, file, cb) {
        const folder = file.fieldname === "thumbnail" ? "blog" : file.fieldname;
        const path = `${defaultPath}/${folder}`;
        await createDir(path);
        cb(null, path);
    },
    filename: function (req, file, cb) {
        const fileType = getType(file);
        const fileName = `${uuidv4()}.${fileType}`;
        cb(null, fileName);
    },
});

function fileFilter(req, file, cb) {
    const fileType = getType(file);
    const fileSize = parseInt(req.headers["content-length"]) // get the size
    if (!fileTypes.includes(fileType)) return cb(new Error("Invalid file format"));
    if (fileSize > maxSize) return cb(new Error("File too large, max 1 MB"));
    return cb(null, true);
}

module.exports = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: maxSize,
    },
});
