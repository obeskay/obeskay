import axios from "axios";

const options = {
  method: "POST",
  url: "https://api.brevo.com/v3/smtp/email",
  headers: {
    accept: "application/json",
    "content-type": "application/json",
    "api-key": process.env.EMAIL_API_KEY,
  },
};

export const sendEmail = async (
  to: {
    email: string;
    name: string;
  },
  subject: string,
  htmlContent: string
) => {
  axios
    .request({
      ...options,
      data: {
        subject: subject,
        sender: {
          email: "noresponder@stickycovers.com",
          name: "Sticky Covers",
        },
        replyTo: { email: "stickycoversmx@gmail.com", name: "Sticky Covers" },
        to: [
          { email: to.email, name: to.name },
          {
            email: "obeskay.mail@gmail.com",
          },
        ],

        htmlContent: htmlContent,
      },
    })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
};
