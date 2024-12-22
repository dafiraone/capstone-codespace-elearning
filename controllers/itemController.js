const Course = require('../models/Course');

const getAllItems = async (req, res) => {
  try {
    const items = await Course.findAll();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
};

const getItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Course.findByPk(id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
};

const createItem = async (req, res) => {
  const { name, description } = req.body;
  try {
    await Course.create({ name, description });
    res.status(201).json({ message: 'Item created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error creating item' });
  }
};

const updateItem = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const item = await Course.findByPk(id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    await item.update({ name, description });
    res.json({ message: 'Item updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating item' });
  }
};

const deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Course.findByPk(id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    await item.destroy();
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting item' });
  }
};

module.exports = { getAllItems, getItemById, createItem, updateItem, deleteItem };