const mongoose=require('mongoose');
const nodemailer=require('nodemailer');
const fileschema=new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    imageUrl:{
        type:String
    },
    tags:{
        type:String
    }

});
fileschema.post('save',async function(doc){
     try{
        let transporter=nodemailer.createTransport({
           host:process.env.MAIL_HOST,
           auth:{
            user:process.env.MAIL_USER,
            pass:process.env.MAIL_PASS,
           },
        });
        let info= await transporter.sendMail({
            from:`Kaushik`,
            to:doc.email,
            subject:"New file uploaded",
            html:`<h2>Hello jee</h2><p>your file has been uploaded view here:
                  <a href="${doc.imageUrl}">Click to see </a><br><br>
                  <img src="${doc.imageUrl}" alt="image" width="200" height="200">`
            })
            console.log("info",info);
     }
     catch(err){
         console.error(err);
     }
})

module.exports=mongoose.model('File',fileschema);