import express from 'express'
import UsersCtrl from './user.controller.js'
const router = express.Router()

router.route('/').get(UsersCtrl.apiGetUsers)
    .post(UsersCtrl.apiPostUser)
    .delete(UsersCtrl.apiDeleteUser)
router.route('/id/:id').get(UsersCtrl.apiGetUserById)

export default router