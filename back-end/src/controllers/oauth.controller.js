const { OAuth2Client } = require("google-auth-library");
const ApiError = require("../utils/apiError");

exports.AuthenticationGoogle = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Referrer-Policy", "no-referrer-when-downgrade");

  const redirectURL = "http://localhost:3000/api/oauth/information";

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

exports.loginWithGoogle = async (req, res, next) => {
  const code = req.query.code;

  console.log(code);
  try {
    const redirectURL = "http://127.0.0.1:3000/oauth";
    const oAuth2Client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      redirectURL
    );
    const r = await oAuth2Client.getToken(code);

    await oAuth2Client.setCredentials(r.tokens);
    console.info("Tokens acquired.");

    const user = oAuth2Client.credentials;
    console.log("credentials", user);
    await getUserData(oAuth2Client.credentials.access_token);
  } catch (err) {
    return next(new ApiError(400, "Error logging in with OAuth2 user"));
  }
  res.redirect(303, "http://localhost:4200/home");
};

async function getUserDataGoogle(access_token) {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
  );
  const data = await response.json();
  console.log("data", data);
}
