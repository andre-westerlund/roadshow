const nodemailer = require('nodemailer');
  
  sendAsyncEmail = async function(email, attachments){
    return new Promise((resolve, reject)=> {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.NODEMAILER_EMAIL,
          pass: process.env.NODEMAILER_PW 
        }
      });

      const mailOptions = {
          from: process.env.NODEMAILER_EMAIL,
          to: process.env.M_TALA_EMAIL_ADDRESS,
          subject: 'Roadshow App - M-Tala Registration ('+ new Date().getTime() +')',
          text: email,
          attachments : attachments
        };
        transporter.sendMail(mailOptions,function(error, info){
          if (error) {
            console.log(error);
            resolve(false);
          } else {
            console.log('Email sent: ' + info.response);
            resolve(true)
          }
        });
    })
    
  }

  exports.sendEmail = async function(email,attachments){
    let response = await sendAsyncEmail(email,attachments);
    return response;
  }

  exports.getEmailMessageFromActivity = async function(activity){
    const email = 
        `
        Date of Registration: ${activity.date}
        Date of Birth: ${activity.details.customer.dob}
        Customer: ${activity.details.customer.firstName} ${activity.details.customer.lastName}
        Customer Id: ${activity.details.customer.id}

        CONTACT INFO
        ******************************
        Mobile Number: ${activity.details.newVodafoneNumber}
        ******************************
        
        
        IDENTIFICATION
        ******************************
        ID Photo: Attached
        Digital Signature: Attached
        ******************************
        
        AGENT: ${activity.agentName}
        
        -
        This is an automated email from the Roadshow App Server
        `;

        //add attachments
    const attachments = [
        {
            filename:'Id'+new Date().getTime()+".jpg",
            path: activity.details.photoId
        },
        {
            filename:'DigitalSignature'+new Date().getTime()+".jpg",
            path: activity.details.signature
        }
    ]

    return {email, attachments}

  }

  const moment = require("moment");


exports.isLegalAge = (dob) => {
    const age = moment().diff(dob, 'years');
    return age >= 18;
}
