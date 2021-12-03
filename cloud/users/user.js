Moralis.Cloud.afterSave("User", (request) => {
  Moralis.Cloud.userRegistered();
});