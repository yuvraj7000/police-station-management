import User from '../models/user.model.js';

const registerUser = async (req, res) => {
    const { name, username, password,email } = req.body;
  
    if (!name || !username || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    const isUserExist = await User.findOne({ username: username.toLowerCase() });
    if (isUserExist) {
      return res.status(400).json({ message: 'Username already exists' });
    }
  
  
    const user = new User({
      name,
      username: username.toLowerCase(),
      password,
      email,
    });
  
    await user.save();
    const createdUser = await User.findById(user._id);
  
    if (!createdUser) {
      return res.status(400).json({ message: 'User not created' });
    }
  
    return res.status(200).json({ message: 'User created successfully', user: createdUser });
  };

  const getAllUsers = async (req, res) => {
    try {
      const users = await User.find({});
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error });
    }
  };
  const deleteUserByUsername = async (req, res) => {
    const { username } = req.body;
  
    try {
      const user = await User.findOneAndDelete({ username: username.toLowerCase() });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error });
    }
  };


  export { registerUser, getAllUsers, deleteUserByUsername };