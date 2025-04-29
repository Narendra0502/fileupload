const File = require('../models/file');
const cloudinary = require("cloudinary").v2;

exports.localfileupload = async (req, res) => {
    try {
        const file = req.files.file;
        console.log("file aa gayi", file);
        let path = __dirname + "/files/" + Date.now()+`.${file.name.split('.')[1]}`;
        file.mv(path, (err) => {
            console.log(err);
        });
        res.json({
            success: true,
            message: "local file uploaded successfully"
        });
    } catch (err) {
        console.log("file upload failed on server");
        console.log(err);
    }
};

function issupported(type, supported) {
    return supported.includes(type);
}

async function uploadfile(file, folder,quality) {
    const options = { folder };
  
    options.resource_type = "auto";
    if (quality) {
        options.quality = quality;
    }
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageupload = async (req, res) => {
    try {
        const { name, email, tags } = req.body;
        const file = req.files.imagefile; // Corrected key to access the file
        // validation
        console.log("file", file);
        console.log("file", req.files.name);
        // console.log("file", req.files);
        const supported = ["jpg", "jpeg", "png"];
        const filetype = file.name.split('.')[1].toLowerCase();
        if (!issupported(filetype, supported)) {
            return res.status(400).json({
                success: false,
                message: 'file format not supported',
            });
        }
        console.log("file", filetype);
        const response = await uploadfile(file, "codehelp");
        console.log("response", response);
        const filedata = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        });
        
        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "file uploaded at server successfully"
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({
            success: false,
            message: 'something went wrong'
        });
    }
};
exports.videoUpload = async (req, res) => {
    try {
        const { name, email, tags } = req.body;
        console.log(name, email, tags);
        const file = req.files.videofile;
        const supported = ["mp4", "mov"];
        const filetype = file.name.split('.').pop().toLowerCase();
        if (!issupported(filetype, supported)) {
            return res.status(400).json({
                success: false,
                message: 'file format not supported',
            });
        }
        const response = await uploadfile(file, "codehelp");
        const filedata = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
            
        });
        console.log("filedata->>>>>", filedata);
        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "file uploaded at server successfully"
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({
            success: false,
            message: 'something went wrong'
        });
    }
};

exports.imagesizereducer = async (req, res) => {
    try {
        const { name, email, tags } = req.body;
        const file = req.files.imagefile;
        // validation
        const supported = ["jpg", "jpeg", "png"];
        const filetype = file.name.split('.').pop().toLowerCase();
        if (!issupported(filetype, supported)) {
            return res.status(400).json({
                success: false,
                message: 'file format not supported',
            });
        }
        const response = await uploadfile(file, "codehelp", 30);
        const filedata = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        });
        res.json({
            success: true,
            message: "file uploaded successfully"
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({
            success: false,
            message: 'something went wrong'
        });
    }
};