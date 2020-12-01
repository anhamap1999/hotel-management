const Product = require('./product.model');
const { Error } = require('../../utils/Error');
const { Success } = require('../../utils/Success');
const utils = require('../../commons/utils');
const User = require('../users/user.model');

exports.getProduct = async (req, res) => {
  const products = await Product.find({});
  res.send(products);
};
exports.getProductdetails = async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found.' });
  }
};
exports.saveProduct = async (req, res) => {
  const product = new Product({
    name: req.body.name,
    image: req.body.image,
    brand: req.body.brand,
    price: req.body.price,
    rating: req.body.rating,
    description: req.body.description,
    stock: req.body.stock,
    numReviews: req.body.numReviews,
  });

  const newProduct = await product.save();
  if (newProduct) {
    return res
      .status(201)
      .send({ message: 'new product created', data: newProduct });
  } else {
    return res.status(401).send({ message: 'failed' });
  }
};
exports.updateProduct = async (req, res) => {
  const productId = req.params.id;
  console.log('a');
  console.log('ID', productId);
  console.log('BODY', req.body);
  const product = await Product.findById(productId);
  if (product) {
    product.name = req.body.name;
    product.image = req.body.image;
    product.brand = req.body.brand;
    product.price = req.body.price;
    product.description = req.body.description;
    product.stock = req.body.stock;

    const updateproduct = await product.save();

    if (updateproduct) {
      return res
        .status(200)
        .send({ message: 'Product updated', data: updateproduct });
    }
  }
  return res.status(500).send({ message: 'failed' });
};
exports.deteleProduct = async (req, res) => {
  const deletepro = await Product.findById(req.params.id);
  if (deletepro) {
    await deletepro.remove();
    res.send({ msg: 'deleted' });
  } else {
    res.send({ msg: 'failed' });
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const { select, sort, page, limit, ...query } = req.query;
    const options = {
      select: select ? select : '',
      sort: sort ? sort : '-createdAt',
      page: page && page >= 1 ? page : 1,
      limit: limit && limit >= 10 ? limit : 10,
    };

    const success = new Success({});
    await Product.paginate({ ...query, status: 'approved' }, options)
      .then((result) => {
        if (result.totalDocs && result.totalDocs > 0) {
          success
            .addField('data', result.docs)
            .addField('total_page', result.totalPages)
            .addField('page', result.page)
            .addField('total', result.totalDocs);
        } else {
          success.addField('data', []);
        }
      })
      .catch((error) => {
        next(error);
      });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

exports.getProductsByAdmin = async (req, res, next) => {
  try {
    const { select, sort, page, limit, ...query } = req.query;
    const options = {
      select: select ? select : '',
      sort: sort ? sort : '-createdAt',
      page: page && page >= 1 ? page : 1,
      limit: limit && limit >= 10 ? limit : 10,
    };
    const success = new Success({});
    await Product.paginate(query, options)
      .then((result) => {
        if (result.totalDocs && result.totalDocs > 0) {
          success
            .addField('data', result.docs)
            .addField('total_page', result.totalPages)
            .addField('page', result.page)
            .addField('total', result.totalDocs);
        } else {
          success.addField('data', []);
        }
      })
      .catch((error) => {
        next(error);
      });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const { select } = req.query;
    const { id } = req.params;

    const product = await Product.findOne({
      _id: id,
      status: 'approved',
    }).select(select);

    if (!product) {
      throw new Error({
        statusCode: 404,
        message: 'product.notFound',
        error: 'product not found',
      });
    }
    const success = new Success({ data: product });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

exports.adminGetProductById = async (req, res, next) => {
  try {
    const { select } = req.query;
    const { id } = req.params;

    const product = await Product.findById(id).select(select);

    if (!product) {
      throw new Error({
        statusCode: 404,
        message: 'product.notFound',
        error: 'product not found',
      });
    }
    const success = new Success({ data: product });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const product = new Product(req.body);
    product.user_id = req.user._id;
    product.status = 'pending';
    product.pure_name = utils.removeAccents(product.name);
    const result = await product.save();
    const success = new Success({ data: result });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      throw new Error({
        statusCode: 404,
        message: 'product.notFound',
        error: 'product not found',
      });
    }
    product = { ...product._doc, ...req.body };
    product.pure_name = utils.removeAccents(product.name);
    await Product.findByIdAndUpdate(req.params.id, product);
    const success = new Success({ data: product });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

exports.updateStatusProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      throw new Error({
        statusCode: 404,
        message: 'product.notFound',
        error: 'product not found',
      });
    }
    product.status = req.body.status;
    await Product.findByIdAndUpdate(req.params.id, product);
    const success = new Success({ data: product });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};

exports.likeProduct = async (req, res, next) => {
  try {
    const { id, state } = req.body;
    const product = await Product.findById(id);
    const user = await User.findById(req.user._id);
    if (!product) {
      throw new Error({
        statusCode: 404,
        message: 'product.notFound',
        error: 'product not found',
      });
    }
    if (state === 'like') {
      product.likes_count++;
      user.like_product.push(id);
    } else if (state === 'unlike' && product.likes_count > 0) {
      product.likes_count--;
      user.like_product = user.like_product.filter((item) => item !== id);
    }
    await Product.findByIdAndUpdate(id, product);
    await User.findByIdAndUpdate(id, user);
    req.user = user;
    const success = new Success({ data: product });
    res.status(200).send(success);
  } catch (error) {
    next(error);
  }
};
