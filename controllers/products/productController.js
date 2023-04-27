const con = require("../../config/db");
module.exports.getProducts = async (req, res) => {
  const Sqlquery = `SELECT * FROM products LEFT JOIN categories ON products.category_id = categories.category_id`;
  await con.query(Sqlquery, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json(result);
    }
  });
};
module.exports.getCategories = async (req, res) => {
  const sqlquery = `SELECT * FROM categories `;
  await con.query(sqlquery, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json(result);
    }
  });
};
module.exports.createProduct = async (req, res) => {
  const {
    product_name,
    product_price,
    product_stock,
    product_active,
    category,
  } = req.body;
  if (!product_name || !product_price || !product_active || !category) {
    res.status(400).json({ message: "All Fields are required" });
  } else {
    await con.query(
      `INSERT INTO products (product_name, product_price,product_stock,product_active,category_id)
       VALUES ('${product_name}', '${product_price}','${product_stock}',
       '${product_active}','${category}')`
    );

    return res.status(200).json({ message: "Proudct Created" });
  }
};

module.exports.updateProduct = async (req, res) => {
  const {
    product_name,
    product_price,
    product_stock,
    product_active,
    category,
    updated_at,
  } = req.body;
  const Sqlquery = `UPDATE products SET product_name = '${product_name}' ,product_price = '${product_price}',
  product_stock = '${product_stock}',
  product_active = '${product_active}',
  category_id = '${category}' WHERE id = ${req.params.id}
  `;
  await con.query(Sqlquery, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
  await con.query(
    `SELECT * FROM products LEFT JOIN categories ON products.category_id = categories.category_id WHERE id = ${req.params.id}`,
    (err, result) => {
      res.status(200).json(result);
    }
  );
};
module.exports.DeleteProduct = async (req, res) => {
  let re = await con.query(
    `SELECT COUNT(id) as count FROM products WHERE id = ${req.params.id}`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if (result[0].count > 0) {
          const sqlQuery = `DELETE FROM products WHERE id = ${req.params.id}`;
          con.query(sqlQuery);
          res.status(204).json({ message: "Product Deleted sucessfully" });
        } else {
          res.status(500).json({ Err: "Product Not Found" });
        }
      }
    }
  );
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
        res.status(200).json(result[0]);
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
        res.status(200).json(result[0]);
      }
    }
  );
};
