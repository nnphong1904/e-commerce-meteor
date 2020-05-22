import OrderCollection from '../order';
import nodemailer from 'nodemailer';
export const addOrder = async (order)=>{
  const result = await OrderCollection.insert(order);
  return result
}
export const sendEmailToSeller = async ({orderId, orderDetails=''})=>{
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nnphong1904@gmail.com',
      pass: 'BBC1941999'
    }
  });
  
  let mailOptions = {
    to: 'nnphong1904@gmail.com',
    subject: `New order : ${orderId}`,
    text: orderDetails
  };
  if(orderDetails !== ''){
    mailOptions = {
      to: 'nnphong1904@gmail.com',
      subject: `New order : ${orderId}`,
      text: orderDetails
    };
  }
  else {
    mailOptions = {
      to: 'nnphong1904@gmail.com',
      subject: `Canceled Order`,
      text: `Order ${orderId} was canceled`
    };
  }
  transporter.sendMail(mailOptions, (error, info)=>{
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

export const fetchOrder = async (userEmail)=>{
  const result = await OrderCollection.find({userEmail:userEmail}).fetch();
  console.log(userEmail);
  if (!result){
    return {success: false, data:[]};
  }
  return {success: true, data: [...result]};
}
export const fetchAllOrders = async ({})=>{
  const result = await OrderCollection.find({}).fetch();
  if (!result){
    return {success: false, data:[]};
  }
  else {
    return {success: true, data: [...result]};
  }
}
export const canceledOrder = async (orderId)=>{
  const response = await OrderCollection.remove({orderId: orderId});
  console.log(response);
}