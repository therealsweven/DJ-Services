const formEl = $("#contactForm");

const getUserInput = async () => {
  const name = $("#inputName").val();
  const email = $("#inputEmail").val().trim();
  const phone = $("#inputPhone").val();
  const message = $("#inputMessage").val();
  const phoneCheck = $("#phoneSelect").val();
  const emailCheck = $("#emailSelect").val();
  if (phoneCheck === "on") {
    commMethod = "phone";
  } else if (emailCheck === "on") {
    commMethod = "email";
  }

  const inquiry = {
    name: name,
    email: email,
    phone: phone,
    message: message,
    commMethod: commMethod,
  };
  //console.log(inquiry);

  const response = await fetch("/api/inquiries/", {
    method: "POST",
    body: JSON.stringify(inquiry),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    console.log("sent to db");
  } else {
    alert("Something went wrong...we're sorry, please try again later.");
  }
};

formEl.on("submit", (event) => {
  event.preventDefault();
  getUserInput();
});
