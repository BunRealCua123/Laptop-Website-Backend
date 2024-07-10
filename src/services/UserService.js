const User = require('../models/UserModel')
const bcrypt =require('bcrypt')
const Token = require('./JwtService')

// Đăng ký tài khoản
const createUser =  (newUser)=>{
    return new Promise(async (resolve,reject)=>{
        const {name,email,password,confirmPassword,phone} = newUser
        try{
            const checkEmail = await User.findOne({email:email})
            if(checkEmail !== null){
                resolve({
                    status:'ERR',
                    message:'Email đã tồn tại'
                })
            }
            const hash = bcrypt.hashSync(password,10)
            // console.log('hash:',hash)
            const createdUser = await User.create({
                name,email,password:hash,phone
            })
            if(createdUser){
                resolve({
                    status:'OK',
                    message:'tạo tài khoản thành công',
                    data: createdUser
                })
            }
            
        }catch(e){
            reject(e)
        }
    })
}

// Đăng nhập tài khoản
const loginUser =  (user)=>{
    return new Promise(async (resolve,reject)=>{
        const {email,password} = user
        try{
            const checkEmail = await User.findOne({email:email})
            if(!checkEmail){
                resolve({
                    status:'ERR',
                    message:'Tài khoản hoặc mật khẩu không chính xác'
                })
            }
            // const hash = bcrypt.hashSync(password,10)
            // console.log('hash:',hash)
            if(!bcrypt.compareSync(password,checkEmail.password)){
                resolve({
                    status:'ERR',
                    message:'Tài khoản hoặc mật khẩu không chính xác'
                })
            }
            else{
                // const access_token =  Token.reneralAccessToken({
                //     id:checkEmail._id,
                //     isAdmin: checkEmail.isAdmin
                // })
                // const refresh_token =  Token.reneralRefreshToken({
                //     id:checkEmail._id,
                //     isAdmin: checkEmail.isAdmin
                // })
                resolve({
                    status:'OK',
                    message:'Đăng nhập thành công',
                    data: {id:checkEmail._id,admin:checkEmail.isAdmin}
                    // access_token:access_token,
                    // refresh_token:refresh_token
                })
            }
            
        }catch(e){
            reject(e)
        }
    })
}

// Cập nhật thông tin người dùng
const updateUser =  (id, data)=>{
    return new Promise(async (resolve,reject)=>{
        try{
            const checkUser = await User.findOne({_id:id})
            if(!checkUser){
                resolve({
                    status:'ERR',
                    message:'Không tìm thấy tài khoản'
                })
            }
            if(data.password){
                const hash = bcrypt.hashSync(data.password,10)
                data.password=hash
            }
            const update = await User.findByIdAndUpdate(id,data,{new:true})
            resolve({
                status:'OK',
                message:'Cập nhật thông tin thành công',
                data: update
            })
            
        }catch(e){
            reject(e)
        }
    })
}

const deleteUser =  (id)=>{
    return new Promise(async (resolve,reject)=>{
        try{
            const checkUser = await User.findOne({_id:id})
            if(!checkUser){
                resolve({
                    status:'ERR',
                    message:'Không tìm thấy tài khoản'
                })
            }
            await User.findByIdAndDelete(id)
            resolve({
                status:'OK',
                message:'Xóa user thành công',
            })
            
        }catch(e){
            reject(e)
        }
    })
}

const getAllUser =  ()=>{
    return new Promise(async (resolve,reject)=>{
        try{
            const allUser = await User.find()
            resolve({
                status:'OK',
                message:'SUCESS',
                data:allUser
            })
            
        }catch(e){
            reject(e)
        }
    })
}

const getDetailUser =  (id)=>{
    return new Promise(async (resolve,reject)=>{
        try{
            const detailUser = await User.findOne({_id:id})
            if(!detailUser){
                resolve({
                    status:'ERR',
                    message:'Không tìm thấy tài khoản'
                })
            }
            resolve({
                status:'OK',
                message:'SUCCESS',
                data:detailUser
            })
            
        }catch(e){
            reject(e)
        }
    })
}
module.exports = {createUser,loginUser,updateUser,deleteUser,getAllUser,getDetailUser}