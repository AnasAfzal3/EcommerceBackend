module.exports.getProducts((req, res) => {
  return res.status(200).json({ message: "Get All customers" });
});
module.exports.createProduct((req, res) => {
  return res.status(200).json({ message: "Proudct Created" });
});

module.exports.updateProduct((req, res) => {
  return res.status(200).json({ message: "Proudct updated" });
});
module.exports.DeleteProduct((req, res) => {
  return res.status(204).json({ message: "Product has been deleted" });
});
