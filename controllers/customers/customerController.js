const con = require("../../config/db");
const bcrypt = require("bcrypt");
module.exports.getCustomers = async (req, res) => {
  try {
    let sqlQuery = `SELECT * FROM customers`;
    let result = await con.query(sqlQuery, (err, result) => {
      res.status(200).json(result);
    });
    console.log(result);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports.createCustomer = async (req, res) => {
  const { Name, Email, Cardnumber, PhoneNumber } = req.body;
  const CardNumberEncrypt = bcrypt.hashSync(Cardnumber, 10);
  await con.query(
    `INSERT INTO customers (Name,Email,Card,Phonenumber)
     VALUES ('${Name}', '${Email}','${CardNumberEncrypt}','${PhoneNumber}')`
  );

  res.status(200).json({ message: "Customer Created" });
};

module.exports.updateCustomer = async (req, res) => {
  const { Name, Email, Cardnumber, phone } = req.body;
  console.log(Name, Email, Cardnumber, phone);
  const CardNumberEncrypt = bcrypt.hashSync(Cardnumber, 10);
  try {
    await con.query(
      `UPDATE customers SET Name = '${Name}', Email = '${Email}' , Card = '${CardNumberEncrypt}' , Phonenumber = '${phone}' WHERE id = ${req.params.id}
      `
    );
  } catch (err) {
    res.status(500).json("message:internal server error");
  }

  return res.status(200).json({ message: "Customr updated" });
};
module.exports.DeleteCustomer = async (req, res) => {
  await con.query(
    `DELETE FROM customers WHERE id = ${req.params.id}
    `
  );
  return res.status(200).json({ message: "Customer Deleted" });
};
