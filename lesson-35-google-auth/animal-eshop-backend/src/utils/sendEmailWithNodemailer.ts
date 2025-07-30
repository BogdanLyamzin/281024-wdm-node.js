import nodemailer from "nodemailer";

const {UKR_NET_PASSWORD, UKR_NET_EMAIL} = process.env;

const nodemailerConfig = {
    host: "smtp.ukr.net",
    post: 465, // 25, 887, 2525
    secure: true,
    auth: {
        user: UKR_NET_EMAIL,
        pass: UKR_NET_PASSWORD
    }
};

const transport = nodemailer.createTransport(nodemailerConfig);

interface IEmailData {
    to: string[] | string;
    subject: string;
    text?: string;
    html: string;
}

const sendEmailWithNodemailer = (data: IEmailData) => {
    const email = {...data, from: UKR_NET_EMAIL};
    return transport.sendMail(email);
}

export default sendEmailWithNodemailer;