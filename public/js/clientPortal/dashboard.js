const showContactForm = () => {
  console.log("hello");
  $("#updateContactForm").show();
  $("#contactInfo").hide();
  $("#contactUpdateBtn").hide();
};
const showPasswordForm = () => {
  console.log("hello");
  $("#updatePasswordForm").show();
  $("#changePasswordBtn").hide();
};

$("#contactUpdateBtn").click(showContactForm);

$("#updateContactSubmitBtn").click(async (e) => {
  e.preventDefault();
  const email = $("#contactEmail").val().trim();
  const phone = $("#contactPhone").val();
  const street = $("#contactStreet").val();
  const city = $("#contactCity").val();
  const state = $("#contactState").val();
  const zip = $("#contactZip").val();
  //   console.log({ email, phone, street, city, state, zip });
  const response = await fetch(`/api/client/`, {
    method: "PUT",
    body: JSON.stringify({ email, phone, street, city, state, zip }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    $("#updateContactForm").hide();
    $("#contactInfo").show();
    $("#contactUpdateBtn").show();
    $("#contactUpdateSuccessMsg").show();
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  } else {
    alert("Something went wrong...we're sorry, please try again later.");
  }
});

$("#changePasswordBtn").click(showPasswordForm);

$("#updatePWSubmitBtn").click(async (e) => {
  e.preventDefault();

  const password = $("#newPassword").val();

  const response = await fetch(`/api/client/`, {
    method: "PUT",
    body: JSON.stringify({ password }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    $("#changePasswordBtn").show();
    $("#updatePasswordForm").hide();
    $("#passwordUpdateSuccessMsg").show();
    setTimeout(() => {
      $("#passwordUpdateSuccessMsg").hide();
    }, 5000);
  } else {
    alert("Something went wrong...we're sorry, please try again later.");
  }
});
