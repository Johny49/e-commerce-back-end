const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
// GET all tags with products
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET tag by id with products
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create new tag
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    console.log(tagData.get({ plain: true}));
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update tag by id
router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
  });
  if (!tagData[0]) { 
    res.status(404).json({ message: 'No tag found with this id' });
    return;
  }
  res.status(200).json(tagData);
} catch (err) {
    res.status(500).json(err);
  }
});

// DELETE tag by id
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
  
    if (!tagData) {
      res.status(404).json({ message: 'No category found with that id' });
      return;
    }
  
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
