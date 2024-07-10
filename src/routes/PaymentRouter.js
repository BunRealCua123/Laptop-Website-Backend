const express = require("express");
const router = express.Router()
const dotenv = require('dotenv');
dotenv.config()


router.get('/config', (req, res) => {
  return res.status(200).json({
    status: 'OK',
    data: 'Ae8hcW8Cd8AG094746xmuRaqGD4tKyo6inqQrLvprgkLSOaKOtt7I58ksxGFTE8dDDAREJGAXH_r6Te9'
  })
})


module.exports = router