// password check
$("#adminLoginBtn").click(async (event) => {
  console.log("boop");
  event.preventDefault();
  const email = $("#adminEmail").val();
  const password = $("#adminPassword").val();
  if (password) {
    const response = await fetch("/api/admin/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      window.location.reload();
    } else {
      alert("Failed to log in.");
    }
  }
});
