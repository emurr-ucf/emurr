import fs from 'fs';
const nodemailer = require('nodemailer');
const handlebars = require('handlebars');

export default function sendEmail(firstName:string, email:string, token:string, emailType: string) {
    let subject: string = "";
    let destination: string = "";
    let replacements = {};

    // Error: Name was not sent.
    if(!firstName || typeof(firstName) !== 'string')
        return ("Error: Name is empty.");
    
    // Error: Email was not sent.
    if(!email || typeof(email) !== 'string')
        return ("Error: Email was not sent.");
    
    // Error: Token was not sent.
    if(!token || typeof(token) !== 'string')
        return ("Error: Token was not sent.");
    
    // Error: Email type was not sent.
    if(!emailType || typeof(emailType) !== 'string')
        return ("Error: Email type not sent.");

    // Sets up aspects for email verifcation.        
    if (emailType === "Verify") {
        subject = "Thank You For Registering!";
        destination = "src/components/VerifyEmail.handlebars";
        replacements = {
            firstName: firstName,
            emailToken: token
        };
    }
    // Sets up aspects for forgot password.
    else if(emailType === "Forgot") {
        subject = "Reset Password";
        destination = "src/components/ForgotPasswordEmail.handlebars";
        replacements = {
            resPassToken: token
        };
    }        

    // Sends email.
    if (subject) {
        // Fills in template.
        const source = fs.readFileSync(destination, 'utf-8').toString();
        const template = handlebars.compile(source);
        const htmlToSend = template(replacements);

        // Sets up email authentication.
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            
            auth: {
                user: 'donotreply.emurr@gmail.com',
                pass: process.env.NODEMAILER_KEY
            },
        });
        // Fills in email.
        var mailOptions = {
            from: 'donotreply.emurr@gmail.com',
            to: email,
            subject: subject,
            html: htmlToSend 
        };
        // Sends email.
        transporter.sendMail(mailOptions, function(error:any, info:any){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}