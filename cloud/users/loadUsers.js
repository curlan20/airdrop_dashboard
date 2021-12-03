Moralis.Cloud.define("loadUsers", async (request) => {
  const query = new Moralis.Query("User");
  query.withCount();
  //
  const results = await query.find({useMasterKey:true});
  return results;
});