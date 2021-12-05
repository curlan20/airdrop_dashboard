Moralis.Cloud.beforeSave("User", async (request) => {
  const email = request.object.get('notificationEmail')

  if (email) {
    Moralis.Cloud.sendEmail({
      to: 'pbrudny@gmail.com',
      subject: `User ${email} has set notification email`,
      html: "Awesome. One more!"
    });
  }
});

Moralis.Cloud.define("userApplied", function (request) {
  Moralis.Cloud.sendEmail({
    to: 'pbrudny@gmail.com',
    subject: `User ${request.params.userEmail} applied for J4IT`,
    html: "<h2>Awesome. One more!</h2>" +
      "<p>User's account: " + request.params.userAccount + "</p>"
  });
});

