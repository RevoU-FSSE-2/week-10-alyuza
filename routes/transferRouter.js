const { Router } = require('express')
const transferService = require ('../service/transferService')

const transferRouter = Router()

transferRouter.use((req, res, next) => {
    console.log('transfer middleware')
    next()
})

// POST transfer
transferRouter.post ("/", transferService.createTransfer)
// READ all transfers
transferRouter.get ("/", transferService.getAllTransfer)
// UPDATE transfer by ID
transferRouter.put ("/:id", transferService.updateTransfer)
// UPDATE transfer status by ID
transferRouter.put ("/:id", transferService.updateTransferStatus)
// DELETE all transfers
transferRouter.delete ("/:id", transferService.deleteTransfer)

module.exports = transferRouter