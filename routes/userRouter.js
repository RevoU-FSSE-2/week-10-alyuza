const { Router } = require('express');
const userService = require ('../service/userService');

const userRouter = Router()

userRouter.use((use,req,next)=>{
    console.log('user middleware')
    next()
})

// Create username
userRouter.post('/', userService.createUser)
// Get all user
userRouter.get('/', userService.getAllUsers)
// Update user
userRouter.put('/:id', userService.updateUser)
// Delete user
userRouter.delete('/:id', userService.deleteUser)

module.exports = userRouter