const config = require("config");
const { verifyToken } = require("./providers/jwt");
const { handleError } = require("../utils/errorHandler");

const tokenGenerator = config.get("TOKEN_GENERATOR") || "jwt";

const auth = (req, res, next) => {
  if (tokenGenerator === "jwt") {
    try {
      const tokenFromClient = req.header("x-auth-token");
      if (!tokenFromClient)
        throw new Error("authentication Error: please login");

      const userInfo = verifyToken(tokenFromClient);
      if (!userInfo) throw new Error("authentication Error: unauthorize user");
      req.user = userInfo;
      return next();
    } catch (error) {
      return handleError(res, 401, error.message);
    }
  }
  if (tokenGenerator === "not_jwt")
    return handleError(res, 500, "you don't use jet");
};

module.exports = auth;
