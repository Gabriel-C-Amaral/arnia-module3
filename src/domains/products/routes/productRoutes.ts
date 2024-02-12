import { Router } from 'express'
// import productController from '../controller/productController'
const productController = require('../controller/productController')
import { authenticateToken } from '../../../middlewares/tokenHandler'
import isAdminMiddleware from '../../../middlewares/isAdmin'
import { storageMiddleware } from '../../../middlewares/uploadImage'
import { createProduct } from '../repository/productRepository'
import { Request, Response } from 'express'

export const productRoutes = Router()


productRoutes.post('/newproduct', authenticateToken, isAdminMiddleware, storageMiddleware.single("image"),  productController.newProduct)
productRoutes.get('/listproducts',authenticateToken, productController.getAllProducts)

