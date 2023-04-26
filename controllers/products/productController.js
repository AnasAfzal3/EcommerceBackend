const con = require("../../config/db");
module.exports.getProducts = (req, res) => {
  return res.status(200).json({ message: "Get All customers" });
};
module.exports.createProduct = async (req, res) => {
  const {
    product_name,
    product_price,
    product_stock,
    product_active,
    category,
    created_at,
  } = req.body;
  await con.query(
    `INSERT INTO products (product_name, product_price,product_stock,product_active,category,created_at)
     VALUES ('${product_name}', '${product_price}','${product_stock}',
     '${product_active}','${category}', '${created_at}')`
  );

  return res.status(200).json({ message: "Proudct Created" });
};

module.exports.updateProduct = (req, res) => {
  return res.status(200).json({ message: "Proudct updated" });
};
module.exports.DeleteProduct = (req, res) => {
  return res.status(204).json({ message: "Product has been deleted" });
};

module.exports.mostPopularProducts = async (req, res) => {
  let result = await con.query(
    `    
    SELECT c.categoryName AS categoryName, (COUNT(o.id) / (SELECT COUNT(*) FROM orders) * 100) AS order_percentage
    FROM orders as o
    LEFT JOIN products p ON o.product_id = p.id
    LEFT JOIN categories c ON p.category_id = c.id
    GROUP BY c.id
    `,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(result);
      }
    }
  );
};
module.exports.topSellingProducts = async (req, res) => {
  let result = await con.query(
    `    
    SELECT p.product_name ,(COUNT(o.id) / (SELECT COUNT(*) FROM orders) * 100) AS order_percentage
    FROM orders as o
    LEFT JOIN products p ON o.product_id = p.id
   
    GROUP BY p.id ORDER BY order_percentage DESC
    `,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(result);
      }
    }
  );
};
