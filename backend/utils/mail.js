import nodemailer from "nodemailer"



// Create a transporter using SMTP configuration for Gmail.
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'clifford.rath22@ethereal.email',
        pass: 'kcW52BFUrngcwWejzS'
    }
});




// Send an email using async/await
const sendOtpMail = async (to,OTP) => {
// console.log("EMAIL:", process.env.EMAIL);
// console.log("PASS:", process.env.EMAIL_PASS);
  const info = await transporter.sendMail({
    from: "nitigya",
    to:"nitigyaaswani@gmail.com", // key and value same
    subject: "Reset your password",
    text: "Hello world?", // Plain-text version of the message
    html: `<p>Your otp for password reset is ${OTP}</p>`, // HTML version of the message
  });

  console.log("Message sent:", info.messageId);
}

export default sendOtpMail