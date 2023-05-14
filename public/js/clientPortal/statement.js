const invoiceContainer = $("#statementContainer");

const displayInvoices = (invoices) => {
  let totalBalance = 0;
  invoices.forEach((i) => {
    const card = document.createElement("div");
    card.setAttribute("id", `${i.id}`);
    const invoiceTotal = i.amount - i.discount;
    totalBalance = totalBalance + invoiceTotal;
    card.classList.add("invoiceCard");
    card.classList.add("d-flex");
    card.classList.add("mb-3");
    card.innerHTML = `<div class="d-flex flex-column w-50">
                      <p>${i.createdAt.slice(0, 10)}</p>
                      <p>Date of Event: ${i.dateOfEvent}</p>
                      <p>Description: ${i.package}</p>
                      </div>
                      <div class="d-flex flex-column w-50 justify-content-center">
                        <table class="text-center">
                            <tr>
                                <th class="text-center">
                                    Amount
                                </th>
                                <td class="text-center">
                                    $${i.amount}
                                </td>
                            </tr>
                            <tr>
                                <th class="text-center">
                                    Discount
                                </th>
                                <td class="text-center">
                                    -$${i.discount}
                                </td>
                            </tr>
                            <tr class="border-top">
                                <th class="text-center">
                                    Total
                                </th>
                                <td class="text-center">
                                    $${invoiceTotal}
                                </td>
                            </tr>
                        </table>
                        <div class="text-center">
                        
                        </div>
                        </div>
                      `;
    console.log(card);
    invoiceContainer.append(card);
    $("#totalBalance").text("$" + totalBalance);
  });
};

// get invoice data
fetch("/api/invoice/client")
  .then((data) => {
    return data.json();
  })
  .then((invoices) => {
    console.log(invoices);
    displayInvoices(invoices);
    return;
  });
