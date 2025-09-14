import nodemailer from 'nodemailer';
import { authLogger, serviceLogger } from '../logger/index.js';


let mailTransporter =
    nodemailer.createTransport(
        {
            service: 'gmail',
            auth: {
                user: 'thangaakilan2@gmail.com',
                pass: 'eguymjkryscwmspq'
            }
        }
    );


export const sendMail = (mailTO, status) => {

if(!(mailTO && status)){
    throw new Error("Invalid credentials")
}
let mailDetails = {
    from: 'thangaakilan2@gmail.com',
    to: mailTO,
    subject: `Approval ${status}`,
    text: `Your request for user registration in CDW Connect has been ${status}`
};

mailTransporter
    .sendMail(mailDetails,
        function (err, data) {
            if (err) {
                serviceLogger.error('Error Occured in sending mail');
            } else {
                serviceLogger.info(`Email sent successfully to ${mailTO}`);
            }
        });
}


