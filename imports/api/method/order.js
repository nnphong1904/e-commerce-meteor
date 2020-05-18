import OrderCollection from '../order';
import nodemailer from 'nodemailer';
export const addOrder = async (order)=>{
  const result = await OrderCollection.insert(order);
  return result
}
export const sendEmailToSeller = async ({orderId, orderDetails})=>{
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nnphong1904@gmail.com',
      pass: 'BBC1941999'
    }
  });
  
  const mailOptions = {
    to: 'nnphong1904@gmail.com',
    subject: `New order : ${orderId}`,
    text: orderDetails
  };
  
  transporter.sendMail(mailOptions, (error, info)=>{
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}