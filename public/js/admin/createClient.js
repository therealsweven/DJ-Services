$("#createClientBtn").click(async (e) => {
  e.preventDefault();
  const first = $("#firstNameInput").val().trim();
  const last = $("#lastNameInput").val().trim();
  const email = $("#clientEmailInput").val();
  const phone = $("#clientPhoneInput").val();
  if (first && last && email) {
    const response = await fetch("/api/client/create", {
      method: "POST",
      body: JSON.stringify({ first, last, email, phone }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      $("#firstNameInput").val("");
      $("#lastNameInput").val("");
      $("#clientEmailInput").val("");
      $("#clientPhoneInput").val("");
      $("#createClientSuccess").show();
    } else {
      alert("Try again!");
    }
  }
});
