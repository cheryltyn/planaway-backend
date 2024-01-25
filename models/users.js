const { urlencoded } = require("express");
const { User: usersDao, validateUser } = require("../daos/user");
const utilSecurity = require("../util/security");

module.exports = {
  getUsers,
  getLoginDetails,
  loginUser,
  createUser,
  logoutUser,
};

function getUsers(queryFields) {
  return usersDao.find(queryFields);
}

async function getLoginDetails(queryFields) {
  const loginFields = {
    userName: 1,
    salt: 1,
    iterations: 1,
  };
  if (!queryFields.hasOwnProperty("email")) {
    return { success: false, error: "missing email" };
  }
  // url decode email '@' -> %40
  const userEmail = decodeURIComponent(queryFields.email);
  const loginFieldsRes = await usersDao.findOne(
    { email: userEmail },
    loginFields
  );
  return { success: true, data: loginFieldsRes };
}

async function loginUser(body) {
  if (!body.hasOwnProperty("email")) {
    return { success: false, error: "missing email" };
  }
  if (!body.hasOwnProperty("password")) {
    return { success: false, error: "missing password" };
  }

  const user = await usersDao.findOne({
    email: body.email,
    password: body.password,
  });
  if (user == null || Object.keys(user).length == 0) {
    return { success: false, error: "Invalid email/password" };
  }

  const jwtPayload = {
    user: user.userName,
    email: user.email,
    // is_admin: user.is_admin,
  };
  const token = utilSecurity.createJWT(jwtPayload);
  const expiry = utilSecurity.getExpiry(token);
  console.log("token to store:", token);
  console.log("expiry to store:", expiry);

  const result = await usersDao.updateOne(
    { email: body.email },
    { token: token, expire_at: expiry }
  );

  if (result.modifiedCount > 0) {
    console.log("Update successful!");
  } else {
    console.log("No document was modified.");
  }

  return { success: true, data: token };
}

async function createUser(body) {
  //
  const user = await usersDao.findOne({ email: body.email });
  console.log(user);
  if (user) {
    return { success: false, error: "user already exist" };
  }
  const newUser = await usersDao.create(body);
  return { success: true, data: newUser };
}

async function logoutUser(body) {
  if (!body.hasOwnProperty("email")) {
    return { success: false, error: "missing email" };
  }
  const result = await usersDao.updateOne(
    { email: body.email },
    { token: null, expire_at: null }
  );
  if (result.modifiedCount > 0) {
    console.log("Update successful!");
  } else {
    console.log("No document was modified.");
  }
  return { success: true };
}
