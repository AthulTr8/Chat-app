const sgMail = require("@sendgrid/mail")

sgMail.setApiKey(process.env.SG_KEY)

const sendSGMail = async ({ recipient, sender,html,text, subject, content, attachments }) => {

    try {

        const from = sender || "someemail@gmail.com"

        const msg = {
            to: recipient,
            from: from,
            subject,
            html: html,
            text,
            attachments
        }

        return sgMail.send(msg)


    } catch (error) {
        console.log(error)
    }
}

exports.sendEmail = async (args) => {
    if (process.env.NODE_ENV === "development") {
        return new Promise.resolve()
    } else {
        return sendSGMail(args)
    }
} 