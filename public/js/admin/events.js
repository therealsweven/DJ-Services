$("#createEventBtn").click(async (event) => {
  event.preventDefault();
  const clientId = $("#eventClient").val();
  const date = $("#eventDate").val();
  const description = $("#eventDescription").val();
  const location = $("#eventLocation").val();
  const time = $("#eventTime").val();
  const notes = $("#eventNotes").val();

  if (clientId && date && description && location) {
    const response = await fetch("/api/event/", {
      method: "POST",
      body: JSON.stringify({
        clientId,
        date,
        description,
        location,
        time,
        notes,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      $("#eventClient").val("");
      $("#eventDate").val("");
      $("#eventDescription").val("");
      $("#eventLocation").val("");
      $("#eventNotes").val("");
      $("#eventTime").val("");
      $("#createEventSuccess").show();
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } else {
      alert("Try again!");
    }
  }
});
