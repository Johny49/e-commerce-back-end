const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// GET all products
router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll({
      include: [{ model: Category }, { model: Tag }]
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET one product
router.get('/:id', async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag }]
    });

    if (!productData) {
      res.status(404).json({ message: 'No product found with that id' });
      return;
    }
    res.status(200).json(productData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Create new product
router.post('/', async (req, res) => {
  try {
    const productData = await Product.create(req.body);
    if (req.body.tagIds.length) {
      await productData.setTags(req.body.tagIds);
      await productData.save();
    }
    console.log(productData.get({ plain: true }));
    res.status(200).json(productData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Update product by id
router.put('/:id', async (req, res) => {
  try {
    const productData = await Product.findOne({
      where: {
        id: req.params.id,
      },
      include: [Tag],
      returning: true
    });
    await productData.update(req.body);
    await productData.setTags(req.body.tagIds);
    await productData.save();
    res.status(200).json(productData)
  }
  catch (err) {
    res.status(500).json(err);
  }
})

// DELETE tag by id
router.delete('/:id', async (req, res) => {
  try {
    const productData = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!productData) {
      res.status(404).json({ message: 'No product found with that id' });
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
