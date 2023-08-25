const { ObjectId } = require("mongodb")

// CREATE username
const createUser = async (req, res) => {
    console.log(req.body, 'CREATE USER')
    const { username, password, role } = req.body;

    const user = await req.db.collection('users').insertOne({
      username,
      password,
      role,
    });
  
    res.status(200).json({
      message: 'Create username success',
      data: user,
    });
  }

// READ all users
const getAllUsers = async (req, res) => {
    const users = await req.db.collection('users').find({ is_deleted: { $exists: false } }).toArray()

    res.status(200).json({
        message: 'Read all users Success',
        data: users
    })
}

// UPDATE user by id
const changePassword = async (req, res) => {
    const id= req.params.id
    const { password } = req.body
    console.log(req,query, 'Query')

    const user = await req.db.collection('users').updateOne({ _id: new ObjectId(id) }, { $set: { password } })

    res.status(200).json({
        message: 'Change password success',
        data: user
    })
}

// DELETE (soft) by ID
const deleteUser = async (req, res) => {
    const id = req.params.id
    console.log(`ID = ${id} is deleted`);

    const user = await req.db.collection('users').findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { is_deleted: true } })

    res.status(204).json({
        message: `ID = ${id} is deleted`,
        data: user
    })
}

module.exports ={
    createUser,
    getAllUsers,
    changePassword,
    deleteUser
}