//show inquiries
$("#adminInquiriesBtn").click(() => {
  $("#inquiriesContainer").show();
  $("#createClientAndInvoiceContainer").removeClass("d-flex");
  $("#createClientAndInvoiceContainer").hide();
  $("#invoicesContainer").hide();
  $("#eventsContainer").hide();
});

//show db ops
$("#adminDBOpsBtn").click(() => {
  $("#inquiriesContainer").hide();
  $("#createClientAndInvoiceContainer").show();
  $("#createClientAndInvoiceContainer").addClass("d-flex");
  $("#invoicesContainer").hide();
  $("#eventsContainer").hide();
});

// show active invoices
$("#adminInvoicesBtn").click(() => {
  $("#inquiriesContainer").hide();
  $("#createClientAndInvoiceContainer").removeClass("d-flex");
  $("#createClientAndInvoiceContainer").hide();
  $("#invoicesContainer").show();
  $("#eventsContainer").hide();
});

// show upcoming events
$("#adminEventsBtn").click(() => {
  $("#inquiriesContainer").hide();
  $("#createClientAndInvoiceContainer").removeClass("d-flex");
  $("#createClientAndInvoiceContainer").hide();
  $("#invoicesContainer").hide();
  $("#eventsContainer").show();
});
