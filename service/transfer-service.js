const { ObjectId } = require('mongodb')

// GET all transfer
const getAllTransfer = async (req, res) => {
  try {
    const transfers = await req.db.collection('transfers').find().toArray()

    res.status(200).json({
      message: 'All users and roles',
      data: transfers
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// CREATE transfer
const createTransfer = async (req, res) => {
  const { amount, sourceAccount, destinationAccount } = req.body
  console.log(amount, sourceAccount, destinationAccount, `<=================== TRANSFERS ==================`);

  try {
    const newTransfer = await req.db.collection('transfers').insertOne({
      amount,
      sourceAccount,
      destinationAccount,
      status: "pending"
    })

    res.status(200).json({
      message: 'Transfer successfully created',
      data: newTransfer
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Patch or transfer Approval
const transferApproval = async (req, res) => {
  const id = req.params.id
  const { status } = req.body
  console.log(req.query, `<=================== STATUS ==================`);

  const statusUpdate = await db.collection('transfers').updateOne({ _id: new ObjectId(id) }, { $set: { status: status } })

  res.status(200).json({
    message: 'success',
    data: statusUpdate
  })
}

module.exports = {
  getAllTransfer,
  createTransfer,
  transferApproval
}