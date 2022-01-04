const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
// GET all categories
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }

});

// GET category by id
router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
});

//POST to create a new category
router.post('/', (req, res) => {
  // create a new category
});

// PUT to update a category by id
router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

//DELETE a category by id
router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
