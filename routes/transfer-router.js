const { Router } = require('express')
const { getAllTransfer, createTransfer, transferApproval } = require('../service/transfer-service.js')
const { authorizationApprover, authorizationAll } = require('../middleware/authorization-middleware.js')

const transferRouter = Router()

transferRouter.get('/', getAllTransfer)
transferRouter.post('/', authorizationAll, createTransfer)
transferRouter.patch('/:id', authorizationApprover, transferApproval)

module.exports = transferRouter