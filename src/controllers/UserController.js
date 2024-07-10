const UserService = require('../services/UserService')

const createUser = async (req,res)=>{
    try{
        const {name,email,password,confirmPassword,phone} = req.body;
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const checkMail = reg.test(email)
        if(!email || !password||!confirmPassword){
            return res.status(200).json({
                status:'ERR',
                message:'Nhập đầy đủ thông tin'
            })
        }
        if(!checkMail){
            return res.status(200).json({
                status:'ERR',
                message:'Email không hợp lệ'
            })
        }
        if(password!==confirmPassword){
            return res.status(200).json({
                status:'ERR',
                message:'Xác nhận mật khẩu không khớp'
            })
        }
        const res1 = await UserService.createUser(req.body)
        return res.status(200).json(res1)
    } catch(e){
        return res.status(404).json({
            message:e
        })
    }

}

const loginUser = async (req,res)=>{
    try{
        const {email,password} = req.body;
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const checkMail = reg.test(email)
        if(!email || !password){
            return res.status(200).json({
                status:'ERR',
                message:'Nhập đầy đủ thông tin'
            })
        }
        if(!checkMail){
            return res.status(200).json({
                status:'ERR',
                message:'Tài khoản hoặc mật khẩu không chính xác'
            })
        }
        const res1 = await UserService.loginUser(req.body)
        return res.status(200).json(res1)
    } catch(e){
        return res.status(404).json({
            message:e
        })
    }

}

const updateUser = async (req,res)=>{
    try{
        const id = req.params.id
        const data = req.body
        console.log(id)
        if(!id){
            return res.status(200).json({
                status:'ERR',
                message:'Không tìm thấy ID'
            })
        }
        const res1 = await UserService.updateUser(id,data)
        return res.status(200).json(res1)
    } catch(e){
        return res.status(404).json({
            message:e
        })
    }

}

const deleteUser = async (req,res)=>{
    try{
        const id = req.params.id
        // const data = req.body
        console.log(id)
        if(!id){
            return res.status(200).json({
                status:'ERR',
                message:'Không tìm thấy ID'
            })
        }
        const res1 = await UserService.deleteUser(id)
        return res.status(200).json(res1)
    } catch(e){
        return res.status(404).json({
            message:e
        })
    }

}

const getAllUser = async (req,res)=>{
    try{
        const res1 = await UserService.getAllUser()
        return res.status(200).json(res1)
    } catch(e){
        return res.status(404).json({
            message:e
        })
    }

}

const getDetailUser = async (req,res)=>{
    try{
        const id = req.params.id
        const res1 = await UserService.getDetailUser(id)
        return res.status(200).json(res1)
    } catch(e){
        return res.status(404).json({
            message:e
        })
    }

}
module.exports = {createUser,loginUser,updateUser,deleteUser,getAllUser,getDetailUser}