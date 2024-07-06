const nodemailer = require("nodemailer");
const emailOrder = require("../templates/emailOrder");
const Order = require("../models/Order");

const sendEmail = async (emailData) => {
  // Create a transporter using the SMTP transport
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "bvphap.tk@gmail.com", // Replace with your Gmail email address
      pass: "pwmt pulz ovtp xvpy", // Replace with your Gmail password or app password
    },
  });
  const html = emailOrder(
    emailData.name,
    emailData.phonenumber,
    emailData.address,
    emailData.listItem,
    emailData.subTotal
  );

  // Set up email data with sender, receiver, subject, and message
  const mailOptions = {
    from: "bvphap.tk@gmail.com", // Replace with your Gmail email address
    to: emailData.to,
    subject: emailData.subject,
    html: html,
  };

  // Send the email
  try {
    const info = await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
const sendEmailOrder = async (orderId) => {
  try {
    const currentOrder = await Order.findById(orderId)
      .populate(["userId", "items.productId"])
      .exec();

    if (!currentOrder) throw new Error("Order not found");

    //init emailData
    const emailData = {
      to: currentOrder.userId.email,
      subject: "Order result",
      name: currentOrder.userId.fullName,
      listItem: currentOrder.items,
      address: currentOrder.userId.address,
      phonenumber: currentOrder.userId.phonenumber,
      subTotal: currentOrder.total,
    };

    sendEmail(emailData);
  } catch (error) {
    throw error;
  }
};

module.exports = sendEmailOrder;
