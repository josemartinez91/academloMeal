const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model");
const dotenv = require("dotenv");
const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util");

dotenv.config({ path: "./config.env" });

const protectSession = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  console.log(token);

  if (!token) {
    return next(new AppError("The token was invalid", 403));
  }

  //check the token

  const decode = jwt.verify(token, process.env.JWT_SECRET);

  // verify the token owner's

  const user = await User.findOne({
    where: { id: decode.id, status: "active" },
  });

  if (!user) {
    return next(
      new AppError("The owner of the session is not longer active", 403)
    );
  }
  req.sessionUser = user;
  next();
});

const protectUsersAccount = (req,res, next)=>{
  const {sessionUser, user} = req

  if(sessionUser.id !== user.id){
    return next (new AppError('You are not the owner of this account', 403))
  }

  next()
}

const ProctectAdminUser = (req, res, next)=>{
  const {sessionUser} = req

  if(sessionUser.status === 'admin'){
    return next(new AppError("Ypu dont have the permission to do this", 403))
  }
  next()
}

const proctectReviewOwner = (req,res,next)=>{
  const {sessionUser, review} = req

  if(sessionUser.id !== review.userId){
    return next(new AppError('You are not the owner of this review', 403))
  }

  next()
}

module.exports = { protectSession, protectUsersAccount,ProctectAdminUser, proctectReviewOwner };
