const inquiryModal = $("#inquiryModal");

// Get the button that opens the inquiry modal
var inquiryBtn = $(".services-inquire");

// Get the <span> element that closes the modal
var span2 = document.getElementsByClassName("close2")[0];

// When the user clicks on the button, open the modal
inquiryBtn.on("click", function () {
  inquiryModal.show();
});

//When the user clicks on <span> (x), close the modal
span2.onclick = function () {
  inquiryModal.hide();
};

//When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == loginModal) {
    inquiryModal.hide();
  }
};

// inquiry modal form

const formEl = $("#inquiryForm");

const getUserInput = async () => {
  const name = $("#inputName").val();
  const email = $("#inputEmail").val().trim();
  const phone = $("#inputPhone").val();
  const package = $("#inputPackage").val();
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
    package: package,
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
    $("#inquiryForm").hide();
    $("#submitMessage").show();
  } else {
    alert("Something went wrong...we're sorry, please try again later.");
  }
};

formEl.on("submit", (event) => {
  event.preventDefault();
  getUserInput();
});