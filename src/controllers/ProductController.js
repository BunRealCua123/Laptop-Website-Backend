const ProductService = require('../services/ProductService')

const createProduct = async (req,res)=>{
    try{
        const {name,image,type,producer,price,countInStock,cpu,ram,screen,description,selled} = req.body
        if(!name||!image||!type|| !producer||!price||!countInStock){
            return res.status(200).json({
                status:"ERR",
                message:"Thiếu thông tin"
            })
        }
        const res1 = await ProductService.createProduct(req.body)
        return res.status(200).json(res1)
    }catch(e){
        return res.status(404).json({
            // status:"ERR",
            message:e
        })
    }
}

const updateProduct = async (req,res)=>{
    try{
        const id = req.params.id
        const data = req.body
        const res1 = await ProductService.updateProduct(id,data)
        return res.status(200).json(res1)
    }catch(e){
        return res.status(404).json({
            // status:"ERR",
            message:e
        })
    }
}

const deleteProduct = async (req,res)=>{
    try{
        const id = req.params.id
        const res1 = await ProductService.deleteProduct(id)
        return res.status(200).json(res1)
    }catch(e){
        return res.status(404).json({
            // status:"ERR",
            message:e
        })
    }
}

const getAllProduct = async (req,res)=>{
    try{
        console.log(req.query)
        const {name,type,producer,price1,price2,sort} = req.query
        // console.log(name,type,producer)
        const res1 = await ProductService.getAllProduct(req.query)
        return res.status(200).json(res1)
    }catch(e){
        return res.status(404).json({
            // status:"ERR",
            message:e
        })
    }
}

const getDetailProduct = async (req,res)=>{
    try{
        const id = req.params.id
        const res1 = await ProductService.getDetailProduct(id)
        return res.status(200).json(res1)
    }catch(e){
        return res.status(404).json({
            // status:"ERR",
            message:e
        })
    }
}
module.exports = {createProduct,updateProduct,deleteProduct,getAllProduct,getDetailProduct}