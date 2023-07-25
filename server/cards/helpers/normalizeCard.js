const generateBizNumber = require("./generateBizNumber");

const normalizeCard = async (rawCard, userID) => {
  /* console.log(userID); */
  const image = {
    url:
      rawCard.image.url ||
      "https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649_960_720.jpg",
    alt: rawCard.image.alt || "business card picture",
  };
  return {
    ...rawCard,
    image,
    address: { ...rawCard.address, state: rawCard.address.state || "" },
    bizNumber: rawCard.bizNumber || (await generateBizNumber()),

    user_id: rawCard.user_id || userID,
  };
};
module.exports = normalizeCard;
