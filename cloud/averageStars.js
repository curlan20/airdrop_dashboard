Moralis.Cloud.define("averageStars", async (request) => {
  const query = new Moralis.Query("Review");
  query.equalTo("movie", request.params.movie);
  const results = await query.find();
  let sum = 0;
  for (let i = 0; i < results.length; ++i) {
    sum += results[i].get("stars");
  }
  return sum / results.length;
},{
  fields : ['movie'],
  requireUser: true
});