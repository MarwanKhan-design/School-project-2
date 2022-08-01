import React from "react";

const InvoiceTable = ({ invoices }) => {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <td>When</td>
            <td>Amount</td>
          </tr>
        </thead>
        <tbody>
          {invoices &&
            invoices.map((invoice) => (
              <tr key={invoice._id}>
                <td>{invoice.when}</td>
                <td>{invoice.amount}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceTable;
