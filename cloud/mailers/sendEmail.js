Moralis.Cloud.define("sendEmailToUser", function (request) {
  Moralis.Cloud.sendEmail({
    to: request.params.email,
    templateId: 'd-18dc6f1c3ccb45d783a986e0ba28efc4',
    dynamic_template_data: {
      name: 'Happy User'
    }
  });
});