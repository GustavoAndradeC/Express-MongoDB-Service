const User = require('../models/userModel');

exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Password is required to create a user.' });
    }

    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.searchUsers = async (req, res) => {
  try {
    const { id, name, email } = req.query;
    const query = {
      ...(id && { id: id }),
      ...(name && { name: { $regex: new RegExp(name, 'i') } }),
      ...(email && { email: { $regex: new RegExp(email, 'i') } })
    };

    if (Object.keys(query).length === 0) {
      return res.status(400).json({ error: 'At least one parameter (id, name, or email) is required' });
    }

    const users = await User.find(query);

    if (users.length === 0) {
      return res.status(404).json({ error: 'No users found' });
    }

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({ error: 'Invalid user ID format' });
    }

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User successfully deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};