const Product = require('../models/ProductModel')

const createProduct = (newProduct)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            const {name,image,type,producer,price,countInStock,cpu,ram,screen,description,selled} = newProduct
            const checkProduct = await Product.findOne({name:name})
            if(checkProduct !== null){
                resolve({
                    status:"ERR",
                    message:"Sản phâm dã tồn tại"
                })
            }
            const createdProduct = await Product.create(newProduct)
            resolve({
                status:"OK",
                message:"Tạo sản phẩm thành công",
                data:createdProduct
            })
        }catch(e){
            reject(e)
        }
    })
}

const updateProduct = (id,data)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            const checkProduct = await Product.findOne({_id:id})
            if(!checkProduct){
                resolve({
                    status:"ERR",
                    message:"Sản phâm không tồn tại"
                })
            }
            const update = await Product.findByIdAndUpdate(id,data,{new:true})
            resolve({
                status:"OK",
                message:"Cập nhật thông tin sản phẩm thành công",
                data:update
            })
        }catch(e){
            reject(e)
        }
    })
}

const deleteProduct = (id)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            const checkProduct = await Product.findOne({_id:id})
            if(!checkProduct){
                resolve({
                    status:"ERR",
                    message:"Sản phâm không tồn tại"
                })
            }
            await Product.findByIdAndDelete(id)
            resolve({
                status:"OK",
                message:"Xóa thành công sản phẩm",
            })
        }catch(e){
            reject(e)
        }
    })
}

const getAllProduct = (Filter)=>{
    return new Promise(async(resolve,reject)=>{
        const {limit,name,type,producer,price1,price2,ram,sort} = Filter
        const filter ={}
        let limit1 = 10000
        if(limit){limit1 = limit}
        // if(page){page1 = page}
        // console.log(limit1,page1)
        if(name){
            filter.name = {'$regex': name,$options: 'i'}
        }
        if(type){
            filter.type = type
        }
        if(producer){
            filter.producer ={'$regex': producer}
        }
        if(price1&&price2){
            filter.price = {$gte: price1, $lte: price2}
        }
        if(ram){
            filter.ram ={'$regex':`^${ram}`}
        }
        try{
            let allProduct = await Product.find(filter).limit(limit1)//{ price: { $gte: 7000000, $lte: 8500000 }}
            resolve({
                status:"OK",
                message:"Thông tin tất cả sản phẩm",
                data:allProduct
            })
        }catch(e){
            reject(e)
        }
    })
}

const getDetailProduct = (id)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            const detailProduct = await Product.findOne({_id:id})
            if(!detailProduct){
                resolve({
                    status:"ERR",
                    message:"sản phẩm không tồn tại"
                })
            }
            resolve({
                status:"OK",
                message:"Thông tin của sản phẩm",
                data:detailProduct
            })
        }catch(e){
            reject(e)
        }
    })
}
module.exports = {createProduct,updateProduct,deleteProduct,getAllProduct,getDetailProduct}