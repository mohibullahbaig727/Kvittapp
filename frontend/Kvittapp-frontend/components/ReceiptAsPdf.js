import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

const createReceipt = (data) => {
  let totalAmount25 = 0;
  let totalAmount12 = 0;
  let totalVatAmount25 = 0;
  let totalVatAmount12 = 0;
  const itemsHtml = data
    .map((item) => {
      const itemAmount = item.Unit_price_excl_VAT * item.Quantity;
      const itemVatAmount = item.VAT_Amount * item.Quantity;
      if (item.VAT_Percentage === 25) {
        totalAmount25 += itemAmount;
        totalVatAmount25 += itemVatAmount;
      } else if (item.VAT_Percentage === 12) {
        totalAmount12 += itemAmount;
        totalVatAmount12 += itemVatAmount;
      }

      return `
              <tr>
                <td>${item.Product_name}</td>
                <td>${item.Unit_price_excl_VAT.toFixed(2)} kr</td>
                <td>${itemVatAmount.toFixed(2)} kr</td>
                <td>${itemAmount.toFixed(2)} kr</td>
              </tr>
            `;
    })
    .join("");

  const receiptHtml = `
        <div style="display: flex; flex-direction: column; align-items: center;">
          <h1>${data[0].Store_Name}</h1>
          <table style="border-collapse: collapse;">
            <thead>
              <tr>
                <th>Article</th>
                <th>Price</th>
                <th>Paid</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>
          <div style="border-top: 1px solid black; margin-top: 10px; margin-bottom: 10px;"></div>
          <div style="display: flex; flex-direction: column; align-items: center;">
            <h2>Total</h2>
            <div style="display: flex; justify-content: space-between; width: 100%;">
              <div>${data[0].ID_Bank}</div>
              <div style="text-align: right;">${data[0].Total_Amount.toFixed(
                2
              )} kr</div>
            </div>
          </div>
          <div style="border-top: 1px solid black; margin-top: 10px; margin-bottom: 10px;"></div>
          <table style="border-collapse: collapse;">
            <thead>
              <tr>
                <th>MOMS%</th>
                <th>MOMS</th>
                <th>NET</th>
                <th>GROSS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>25%</td>
                <td>${totalVatAmount25.toFixed(2)} kr</td>
                <td>${totalAmount25.toFixed(2)} kr</td>
                <td>${(totalAmount25 + totalVatAmount25).toFixed(2)} kr</td>
              </tr>
              <tr>
                <td>12%</td>
                <td>${totalVatAmount12.toFixed(2)} kr</td>
                <td>${totalAmount12.toFixed(2)} kr</td>
                <td>${(totalAmount12 + totalVatAmount12).toFixed(2)} kr</td>
              </tr>
            </tbody>
          </table>
        </div>
      `;

  return receiptHtml;
};

export const handleDownloadReceipt = async (receiptData) => {
  const receiptHtml = createReceipt(receiptData);
  const pdf = await Print.printToFileAsync({ html: receiptHtml });
  Sharing.shareAsync(pdf.uri);
};

export const handleEmailReceipt = async (receiptData) => {
  const receiptHtml = createReceipt(receiptData);
  const pdf = await Print.printToFileAsync({ html: receiptHtml });
  Sharing.shareAsync(pdf.uri, {
    mimeType: "application/pdf",
    dialogTitle: "Send receipt",
  });
};
