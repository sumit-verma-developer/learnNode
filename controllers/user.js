const { model } = require("mongoose");
const User = require("../models/user");

async function handleGetAllUser(req, res) {
  const allDbUsers = await User.find({});
  return res.json(allDbUsers);
}

async function handlegetUserById(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "user not found" });
  return res.json(user);
}
async function handleUpdateUserById(req, res) {
  await User.findByIdAndUpdate(req.params.id, { lastName: "rohan" });
  return res.json({ status: "success" });
}

async function handleDeleteUserById(req, res) {
  await User.findByIdAndDelete(req.params.id);
  return res.json({ status: "success" });
}

 // or wherever your model is defined

async function handleCreateNewUser(req, res) {
  try {
    const body = req.body;
    console.log("body", body);

    const newUser = new User({
      firstName: body['First Name'],
      lastName: body['Last Name'],
      email: body.Email,
      gender: body.Gender,
      jobTitle: body.jobtitle,
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      message: 'User created successfully',
      user: savedUser,
    });

  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}


module.exports = {
  handleGetAllUser,
  handlegetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
};
