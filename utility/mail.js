import nodemailer from "nodemailer";

/**
 * Account activation Mail
 */
export const accountActivationMail = async (to, data) => {
  try {
    const transport = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PASS,
      },
    });

    transport.sendMail({
      from: `Register ${process.env.MAIL_ID}`,
      to: to,
      subject: "Account activation",
      text: "Please activate your account",
      html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
                <style>
                    * {
                        margin: 0px;
                        padding: 0px;
                        font-family: serif;
                    }
            
                    ul {
                        margin: 0px;
                        padding: 0px;
                    }
            
                    li {
                        list-style: none;
                    }
            
                    .main-wraper {
                        background-color: #ccc;
                        height: 100vh;
                        width: 100%;
                        overflow: hidden;
                    }
            
                    .wraper {
                        background-color: #fff;
                        width: 500px;
                        padding: 30px;
                        margin: 80px auto;
                    }
            
                    .message-body {
                        padding: 20px 0px;
                    }
            
                    .message-body h2 {
                        font-size: 18px;
                        margin-bottom: 10px;
                    }
            
                    .message-body p {
                        font-size: 14px;
                        padding-bottom: 10px;
                    }
            
                    .message-body a {
                        font-size: 14px;
                        margin-top: 20px;
                        background-color: #FF4800;
                        display: inline-block;
                        padding: 15px 40px;
                        text-decoration: none;
                        color: #fff;
                        text-transform: uppercase;
                    }
            
                    .footer span {
                        display: block;
                        padding: 10px 0px;
                    }
            
                    .footer .social ul {
                        display: flex;
                        gap: 10px;
                    }
            
                </style>
            </head>
            <body>
                
                <div class="main-wraper">
                    <div class="wraper">
                        <div class="header">
                            <img src="https://ci4.googleusercontent.com/proxy/w_M9vu0lAfENq7dpybhGWDCFxvFzYzWenAsa3aO2ZtEhYLRxAc_URJiVipM_kmgebwTXsoMpUPa8MdFs1xT2eOfdXLExqkBUROLnH3xym9P380VQx3sQq8Jh1LNuhQ=s0-d-e1-ft#https://pubs.payoneer.com/EmailSender/Payoneer/img/Default/partner-logo.png" alt="">                
                        </div>
                        <hr>
                        <div class="message-body">
                            <h2>Dear ${data.name}</h2>
                            <p>You recently requested to reset your Payoneer password. To select a new password, click on the button below:</p>
                            <a href="${data.link}">Verify Now</a>
                        </div>
                        <div class="footer">
                            <span>Your account cell : ${data.phone}</span>
                            <div class="social">
                                <ul>
                                    <li><a href="#"></a><img src="https://ci5.googleusercontent.com/proxy/Hp1tHwpZJplBQHTr-WRQujyXVO54yAQdUwALRHoIu3TW_4YDZ6B6Ls74s-w-3MEDpMW9F5Bc8V4B2IT49EMXsm4X1qqiK8IjzmNO4S_OfAs-tByTjpOe2-uS3s3hY3HTf5w=s0-d-e1-ft#http://pubs.payoneer.com/EmailSender/Payoneer/img/Default/BlocksTemplate/fb.jpg" alt=""></li>
                                    <li><a href="#"><img src="https://ci6.googleusercontent.com/proxy/IrEOgUYJAxNOXCfkCzRhp3Pr5plttxi_SK_vo7HZtMFa9MnD5KZqMxD0PxnsIjARnAifRp7OuUYYY20Bx98L__qgfC-G266Bqx7WcwKAYkekf1hLO0pZhaVmV4UfPbaFNGY=s0-d-e1-ft#http://pubs.payoneer.com/EmailSender/Payoneer/img/Default/BlocksTemplate/tw.jpg" alt=""></a></li>
                                    <li><a href="#"><img src="https://ci6.googleusercontent.com/proxy/BBjsFigvYDp0PT-b94ETYc7WSfGfoM6FGTJqeLE4twWSHEMs_hzt4NjPmtA_RkcJUPXv2xZI6yLiYsgSEpldVZ49jzuRngt2mFvNZCkGxGhGitIl9O7XVqsilGoehTQNH9c=s0-d-e1-ft#http://pubs.payoneer.com/EmailSender/Payoneer/img/Default/BlocksTemplate/gp.jpg" alt=""></a></li>
                                    <li><a href="#"><img src="https://ci6.googleusercontent.com/proxy/KSBDtD0zHbN5XeL5qH34sW3-l80xoG-w0BBfwWJAKOpm5TzMSQdySc4IybYGoQHKjT_Wo3UDUSeCtTIWDxoIky3CVQs4NQ208Te17XQNfgN2coi-_NX4ppd5lt40uL9B-LE=s0-d-e1-ft#http://pubs.payoneer.com/EmailSender/Payoneer/img/Default/BlocksTemplate/li.jpg" alt=""></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                
            
            </body>
            </html>
            `,
    });
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * Password Reset Mail
 */
export const passwordResetMail = async (to, data) => {
  try {
    const transport = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PASS,
      },
    });

    transport.sendMail({
      from: `Register ${process.env.MAIL_ID}`,
      to: to,
      subject: "Reset Password",
      html: `
              <!DOCTYPE html>
              <html lang="en">
              <head>
                  <meta charset="UTF-8">
                  <meta http-equiv="X-UA-Compatible" content="IE=edge">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Document</title>
                  <style>
                      * {
                          margin: 0px;
                          padding: 0px;
                          font-family: serif;
                      }
              
                      ul {
                          margin: 0px;
                          padding: 0px;
                      }
              
                      li {
                          list-style: none;
                      }
              
                      .main-wraper {
                          background-color: #ccc;
                          height: 100vh;
                          width: 100%;
                          overflow: hidden;
                      }
              
                      .wraper {
                          background-color: #fff;
                          width: 500px;
                          padding: 30px;
                          margin: 80px auto;
                      }
              
                      .message-body {
                          padding: 20px 0px;
                      }
              
                      .message-body h2 {
                          font-size: 18px;
                          margin-bottom: 10px;
                      }
              
                      .message-body p {
                          font-size: 14px;
                          padding-bottom: 10px;
                      }
              
                      .message-body a {
                          font-size: 14px;
                          margin-top: 20px;
                          background-color: #FF4800;
                          display: inline-block;
                          padding: 15px 40px;
                          text-decoration: none;
                          color: #fff;
                          text-transform: uppercase;
                      }
              
                      .footer span {
                          display: block;
                          padding: 10px 0px;
                      }
              
                      .footer .social ul {
                          display: flex;
                          gap: 10px;
                      }
              
                  </style>
              </head>
              <body>
                  
                  <div class="main-wraper">
                      <div class="wraper">
                          <div class="header">
                              <img src="https://ci4.googleusercontent.com/proxy/w_M9vu0lAfENq7dpybhGWDCFxvFzYzWenAsa3aO2ZtEhYLRxAc_URJiVipM_kmgebwTXsoMpUPa8MdFs1xT2eOfdXLExqkBUROLnH3xym9P380VQx3sQq8Jh1LNuhQ=s0-d-e1-ft#https://pubs.payoneer.com/EmailSender/Payoneer/img/Default/partner-logo.png" alt="">                
                          </div>
                          <hr>
                          <div class="message-body">
                              <h2>Dear ${data.name}</h2>
                              <p>You recently requested to reset your Payoneer password. To select a new password, click on the button below:</p>
                              <a href="${data.link}">Reset password</a>
                          </div>
                          <div class="footer">
                              <span>Your account cell : ${data.phone}</span>
                              <div class="social">
                                  <ul>
                                      <li><a href="#"></a><img src="https://ci5.googleusercontent.com/proxy/Hp1tHwpZJplBQHTr-WRQujyXVO54yAQdUwALRHoIu3TW_4YDZ6B6Ls74s-w-3MEDpMW9F5Bc8V4B2IT49EMXsm4X1qqiK8IjzmNO4S_OfAs-tByTjpOe2-uS3s3hY3HTf5w=s0-d-e1-ft#http://pubs.payoneer.com/EmailSender/Payoneer/img/Default/BlocksTemplate/fb.jpg" alt=""></li>
                                      <li><a href="#"><img src="https://ci6.googleusercontent.com/proxy/IrEOgUYJAxNOXCfkCzRhp3Pr5plttxi_SK_vo7HZtMFa9MnD5KZqMxD0PxnsIjARnAifRp7OuUYYY20Bx98L__qgfC-G266Bqx7WcwKAYkekf1hLO0pZhaVmV4UfPbaFNGY=s0-d-e1-ft#http://pubs.payoneer.com/EmailSender/Payoneer/img/Default/BlocksTemplate/tw.jpg" alt=""></a></li>
                                      <li><a href="#"><img src="https://ci6.googleusercontent.com/proxy/BBjsFigvYDp0PT-b94ETYc7WSfGfoM6FGTJqeLE4twWSHEMs_hzt4NjPmtA_RkcJUPXv2xZI6yLiYsgSEpldVZ49jzuRngt2mFvNZCkGxGhGitIl9O7XVqsilGoehTQNH9c=s0-d-e1-ft#http://pubs.payoneer.com/EmailSender/Payoneer/img/Default/BlocksTemplate/gp.jpg" alt=""></a></li>
                                      <li><a href="#"><img src="https://ci6.googleusercontent.com/proxy/KSBDtD0zHbN5XeL5qH34sW3-l80xoG-w0BBfwWJAKOpm5TzMSQdySc4IybYGoQHKjT_Wo3UDUSeCtTIWDxoIky3CVQs4NQ208Te17XQNfgN2coi-_NX4ppd5lt40uL9B-LE=s0-d-e1-ft#http://pubs.payoneer.com/EmailSender/Payoneer/img/Default/BlocksTemplate/li.jpg" alt=""></a></li>
                                  </ul>
                              </div>
                          </div>
                      </div>
                  </div>
                  
              
              </body>
              </html>
              `,
    });
  } catch (error) {
    console.log(error.message);
  }
};
