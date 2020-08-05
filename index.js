const express = require('express');
const bodyParser= require('body-parser');
const nodemailer= require('nodemailer');

const app= express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.post('/api/form',(req,res)=>{
 
nodemailer.createTestAccount((err,acc)=>{
    const htmlEmail = `
    <h3>Contact Details</h3>
    <ul>
    <li>Name: ${req.body.name} </li>
    <li>Email: ${req.body.email} </li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
    `

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: "dummybadman@gmail.com", 
          pass: "09295089159", 
        },
      });
      let mailOptions={
          from:"dummybadman@gmail.com",
          to: "johnchristian1899@gmail.com",
          replyTo:"johnchristian1899@gmail.com",
          subject: 'New Message',
          
          text: req.body.message,
          html: htmlEmail
      }
      transporter.sendMail(mailOptions,(err,info)=>{
          if(err){
              return console.log(err)
          }
          console.log('Message Sent: %s',info )
          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      })
      res.writeHead(301, { Location: 'index.html' });
      res.end();

}

)

} )

const PORT = process.env.PORT || 3001

app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`)
})
if (process.env.NODE_ENV === 'production') {
    // Exprees will serve up production assets
    app.use(express.static('portfolio-john/build'));
  
    // Express serve up index.html file if it doesn't recognize route
    const path = require('path');
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'portfolio-john', 'build', 'index.html'));
    });
  }