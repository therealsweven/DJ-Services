$("#createInvoiceBtn").click(async (e) => {
  e.preventDefault();
  const clientId = $("#clientNameInput").val();
  const amount = $("#amount").val();
  const discount = $("#discount").val();
  const dateOfEvent = $("#dateOfEvent").val();
  const package = $("#invoicePackage").val();
  const notes = $("#invoiceNotes").val();
  if (clientId && amount && discount && dateOfEvent) {
    const response = await fetch("/api/invoice/", {
      method: "POST",
      body: JSON.stringify({
        clientId,
        amount,
        discount,
        dateOfEvent,
        package,
        notes,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      $("#clientNameInput").val("");
      $("#amount").val("");
      $("#discount").val("");
      $("#dateOfEvent").val("");
      $("#invoicePackage").val("");
      $("#invoiceNotes").val("");
      $("#createInvoiceSuccess").show();
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } else {
      alert("Try again!");
    }
  }
});
