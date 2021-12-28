Moralis.Cloud.define("getNFT", async (request) => {
  const query = new Moralis.Query("NFT");
  query.equalTo("nft_id", parseInt(request.params.id));
  //
  const results = await query.first();
  logger.info(results);
  return results;
});
