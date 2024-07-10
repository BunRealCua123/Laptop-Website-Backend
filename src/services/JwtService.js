const jwt = require("jsonwebtoken");
const dotenv = require('dotenv')
dotenv.config()
const reneralAccessToken = (payload)=>{
    const accesstoken = jwt.sign({payload},process.env.ACCESS_TOKEN,{expiresIn:'1h'})
    return accesstoken
}
const reneralRefreshToken = (payload)=>{
    const refreshtoken = jwt.sign({payload},process.env.REFRESH_TOKEN,{expiresIn:'300d'})
    return refreshtoken
}

// Sử dụng để xác thực quyền người dùng: admin, user
//  Xử lý sau
// Sẽ xử lý việc tạo accesstoken mới sau
module.exports={
    reneralAccessToken,
    reneralRefreshToken
}
