const {ObjectId} = require ('mongodb')

// CREATE transfer
const createTransfer = async (req, res) => {
    console.log(req.body, 'Crate Transfer')
    const { ammount, sourceAccount, destinationAccount } = req.body;

    const transfer = await req.db.collection('transfers').insertOne({
      ammount,
      sourceAccount,
      destinationAccount,
      status : 'pending'
    });
  
    res.status(200).json({
      message: 'success',
      data: transfer,
    });
  }

// READ all transfer
const getAllTransfer = async (req, res) => {
    const transfers = await req.db.collection('transfers').find({ is_deleted: { $exists: false } }).toArray()

    res.status(200).json({
        message: 'Read all users Success',
        data: transfers
    });
}

// UPDATE transfer
const updateTransfer = async (req, res) => {
    const id = req.params.id;
    const { amount, sourceAccount, destinationAccount } = req.body;
  
    const transfer = await req.db.collection('transfers').updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          amount,
          sourceAccount,
          destinationAccount,
        },
      }
    );

    res.status(200).json ({
        message : 'Success',
        data : transfer
    });
}

// UPDATE transfer status
const updateTransferStatus = async (req, res) => {
    const id = req.params.id;
    const { status } = req.body;
  
    const transferStatus = await req.db.collection('transfers').updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
            status,
        },
      }
    );

    res.status(200).json ({
        message : 'Success',
        data : transferStatus
    });
}

// DELETE (soft) by ID
const deleteTransfer = async (req, res) => {
    const id = req.params.id
    console.log(`Transaction ID = ${id} is deleted`);

    const transfer = await req.db.collection('users').findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { is_deleted: true } })

    res.status(204).json({
        message: `Transaction ID = ${id} is deleted`,
        data: transfer
    })
}

module.exports ={
    createTransfer,
    getAllTransfer,
    updateTransfer,
    updateTransferStatus,
    deleteTransfer
}