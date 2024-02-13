import { Router } from 'express'
import { authenticateToken } from '../../../middlewares/tokenHandler'
import isAdminMiddleware from '../../../middlewares/isAdmin'
import { storageMiddleware } from '../../../middlewares/uploadImage'
import { Request, Response } from 'express'
import { loginUserController, addToWallet, purchaseProduct} from '../controller/userController'



export const userRoutes = Router()

userRoutes.post('/login', loginUserController)
userRoutes.post('/addjewel', authenticateToken, isAdminMiddleware, addToWallet);
userRoutes.post('/redeemproduct', authenticateToken, purchaseProduct);

