class Reciepts {
  constructor(
    Store,
    Datetime,
    RecieptNumber,
    CashRegister,
    Cashier,
    Product,
    ProductName,
    Amount
  ) {
    this.Store = Store;
    this.Datetime = Datetime;
    this.RecieptNumber = RecieptNumber;
    this.CashRegister = CashRegister;
    this.Cashier = Cashier;
    this.Product = Product;
    this.ProductName = ProductName;
    this.Amount = Amount;
  }
}

module.exports = Reciepts;
