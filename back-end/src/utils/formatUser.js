exports.maskEmail = (email) => {
  console.log(email);
  const match = email.match(/([^@]+)@(.+)/);
  if (!match) {
    return "";
  }

  const username = match[1];
  const domain = match[2];

  const maskedUsername =
    username.slice(0, 3) + "*".repeat(Math.max(0, username.length - 3));

  return `${maskedUsername}@${domain}`;
};

exports.maskPhone = (phone) => {
  if (phone.length !== 10 || !/^\d+$/.test(phone)) {
    return "";
  }

  const firstTwo = phone.slice(0, 2);
  const lastTwo = phone.slice(8, 10);

  return `${firstTwo}******${lastTwo}`;
};
