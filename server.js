const path = require("path");

const express = require("express");
const app = express();

const sendEmail = require("./utils/sendEmail");

app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("contact");
});

app.get("/sent", (req, res) => {
  res.render("sent");
});

const sendMail = (to, from, subject, text) => {
  sendEmail(to, from, subject, text);
};

app.post("/sendemail", (req, res) => {
  const { name, phone, email } = req.body;

  const from = "viveknishad99999@gmail.com";

  const toServer = "viveknishad99999@gmail.com";
  const toClient = email;

  const serverSubject = "New Contact Request";
  const clientSubject = "Thank you for getting in touch!";

  const clientOutput = `
    <p>I have received your message and would like to thank you for writing to me. I will be in touch with you shortly. </p>
    </br>
    <p>Have a great day! </p>

  `;
  const serverOutput = `
    <p>You have a new Contact Request</p>
    <h3>Contact Details</h3>
    <ul>
      <li>Name: ${name}</li>
      <li>Phone Number: ${phone}</li>
      <li>Email: ${email}</li>
    </ul>
  `;

  sendMail(toClient, from, clientSubject, clientOutput);
  sendMail(toServer, from, serverSubject, serverOutput);
  res.redirect("/sent");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// ---------------------------------------------- XXX -----------------------------------------------//
// // const sgMail = require("@sendGrid/mail");

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// // const msg = {
// //   to: "viveknishad9999@gmail.com",
// //   from: "viveknishad99999@gmail.com",
// //   subject: "Testing Node Email Service",
// //   text: "wow! It works.",
// // };

// // sgMail.send(msg, function (err, info) {
// //   if (err) {
// //     console.error("Email Not Sent" + " => " + err);
// //   } else {
// //     console.log("Email send Successfully");
// //   }
// // });

// const path = require("path");

// const express = require("express");
// const app = express();

// const sendEmail = require("./utils/sendEmail");

// app.use(express.urlencoded({ extended: false }));
// app.use("./public", express.static(path.join(__dirname, "public")));
// app.set("view engine", "ejs");

// app.get("/", (req, res) => {
//   res.render("contact");
// });

// app.get("/sent", (req, res) => {
//   res.render("sent");
// });

// app.post("/sendemail", (req, res) => {
//   const { name, surname, email } = req.body;

//   const from = "viveknishad99999@gmail.com";
//   const to = email;

//   const subject = "xyz";

//   const output = `
//   <p>Thanks for reaching out</p>
//   <h3>Your Details</h3>
//   <ul>
//   <li>Name:${name}</li>
//   <li>Surname:${surname}</li>
//   <li>Email:${email}</li>
//   </ul>
//   `;

//   sendEmail(to, from, subject, output);
//   res.redirect("/sent");
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
