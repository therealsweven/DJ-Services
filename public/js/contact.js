const formEl = $("#contactForm");
const instruct = $("#instruct");
const formBody = $("#formBody");
const msg = $("#successMessage");

const getUserInput = async () => {
  const name = $("#inputName").val();
  const email = $("#inputEmail").val().trim();
  const phone = $("#inputPhone").val();
  const date = $("#inputDate").val();
  const message = $("#inputMessage").val();
  const phoneCheck = $("#phoneSelect").is(":checked");
  if (phoneCheck) {
    commMethod = "phone";
  } else {
    commMethod = "email";
  }

  const inquiry = {
    name: name,
    email: email,
    date: date,
    phone: phone,
    message: message,
    commMethod: commMethod,
  };
  console.log(inquiry);

  const response = await fetch("/api/inquiries/", {
    method: "POST",
    body: JSON.stringify(inquiry),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    console.log("sent to db", "email sent");
    instruct.hide();
    formBody.hide();
    msg.show();
  } else {
    alert("Something went wrong...we're sorry, please try again later.");
  }
};

formEl.on("submit", (event) => {
  event.preventDefault();
  getUserInput();
});
