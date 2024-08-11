const { OAuth2Client } = require("google-auth-library");
const ApiError = require("../utils/apiError");
const oAuthService = require("../services/oauth.service");
const jwt = require("jsonwebtoken");

exports.AuthenticationGoogle = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Referrer-Policy", "no-referrer-when-downgrade");

  const redirectURL = "http://localhost:3000/api/oauth/information/google";

  const client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    redirectURL
  );

  const url = client.generateAuthUrl({
    access_type: "offline",
    scope: ["profile", "email", "openid"],
    prompt: "consent",
  });

  res.json({ url });
};

async function getUserDataGoogle(access_token) {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
  );
  const data = await response.json();

  const token = await oAuthService.CheckUserAndRegister(data);
  if (!token) {
    return new ApiError(401, "User not found or registered");
  }
  return token;
}

exports.loginWithGoogle = async (req, res, next) => {
  const code = req.query.code;

  try {
    const redirectURL = "http://localhost:3000/api/oauth/information/google";
    const oAuth2Client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      redirectURL
    );
    const r = await oAuth2Client.getToken(code);

    await oAuth2Client.setCredentials(r.tokens);
    console.info("Tokens acquired.");

    const user = oAuth2Client.credentials;
    // console.log("credentials", user);
    const token = await getUserDataGoogle(
      oAuth2Client.credentials.access_token
    );
    res.cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: false,
      sameSite: "strict",
    });
  } catch (err) {
    return next(new ApiError(400, err.message));
  }
  res.redirect(303, "http://localhost:4200/");
};

exports.UpdateRequiredInformation = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    var userInfor = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (userInfor?.username) {
      throw new ApiError(
        401,
        "Tài khoản đã có tên đăng nhập không thể cập nhật"
      );
    }
    const user = await oAuthService.UpdateRequiredInformation(
      userInfor._id,
      req.body
    );
    res.status(200).json(user);
  } catch (error) {
    return next(new ApiError(error.statusCode, error.message));
  }
};
