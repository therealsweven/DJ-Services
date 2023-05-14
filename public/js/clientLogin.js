const loginModal = $("#loginModal");

// Get the button that opens the modal
var loginBtn = $(".clientLogin");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
loginBtn.on("click", function () {
  loginModal.show();
  $("#loginInputEmail").val("");
  $("#loginInputPassword").val("");
  $("#forgotPWEmailInput").val("");
});

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  loginModal.hide();
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == loginModal) {
    loginModal.hide();
  }
};

// password check
$("#clientLoginBtn").click(async (event) => {
  console.log("boop");
  event.preventDefault();
  const email = $("#loginInputEmail").val();
  const password = $("#loginInputPassword").val();
  if (password) {
    const response = await fetch("/api/client/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(response);
    if (response.ok) {
      window.location.replace("/ClientPortal");
    } else {
      alert("Failed to log in. Email or password incorrect.");
    }
  }
});

//display forgot pw form
$("#forgotPasswordBtn").click(async () => {
  $("#loginForm").hide();
  $("#forgotPasswordForm").show();
});

//back to login form
$("#backToLogin").click(async () => {
  $("#loginForm").show();
  $("#forgotPasswordForm").hide();
});

// send temp pw
$("#sendTempPWBtn").click(async (event) => {
  event.preventDefault();
  const email = $("#forgotPWEmailInput").val();
  if (email) {
    const response = await fetch("/api/client/forgotPassword", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(response);
    if (response.ok) {
      $("#forgotPasswordForm").hide();
      $("#pwResetSuccessMsg").show();
      $("#forgotPWEmailInput").val("");
      setTimeout(() => {
        $("#pwResetSuccessMsg").hide();
        $("#loginForm").show();
      }, 3000);
    } else {
      alert("No account exists with that email.");
    }
  }
});
