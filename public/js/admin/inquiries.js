const cardsContainer = $("#inquiryCards");

//function to display inquiries
const displayInquiries = (inquiries) => {
  inquiries.forEach((i) => {
    if (i.active) {
      const card = document.createElement("div");
      card.setAttribute("id", `${i.id}`);
      card.classList.add("inquiryCard");
      card.innerHTML = `
                    <p>ID: ${i.id}</p>
                    <p>Inquiry Date: ${i.createdAt.slice(0, 10)}</p>
                    <p>Event Date: ${i.date}</p>
                    <p>Name: ${i.name}</p>
                    <p>Email: ${i.email}</p>
                    <p>Phone: ${i.phone}</p>
                    <p>Package: ${i.package}</p>
                    <p>Comm: ${i.commMethod}</p>
                    <p>Message: ${i.message}</p>
                    <p>Responded to: ${i.responded}</p>
                    <button class="deleteInquiryBtn btn text-light">Delete Inquiry</button>
                    `;
      if (!i.responded) {
        card.innerHTML +=
          '<button class="respondBtn btn text-light">Mark Responded</button>';
        console.log(card.innerHTML);
      }
      console.log(card);
      cardsContainer.append(card);
    }
  });
};

// get inquiry data and display
const data = fetch("/api/inquiries/")
  .then((data) => {
    return data.json();
  })
  .then((inquiries) => {
    console.log(inquiries);
    displayInquiries(inquiries);
  });

//Mark Responded
$("#inquiryCards").on("click", ".respondBtn", async (e) => {
  const response = await fetch(`/api/inquiries/${e.target.parentElement.id}`, {
    method: "PUT",
    body: JSON.stringify({
      responded: true,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    window.location.reload();
  } else {
    alert("Something went wrong...we're sorry, please try again later.");
  }
});

//Delete inquiry
$("#inquiryCards").on("click", ".deleteInquiryBtn", async (e) => {
  const response = await fetch(`/api/inquiries/${e.target.parentElement.id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    window.location.reload();
  } else {
    alert("Something went wrong...we're sorry, please try again later.");
  }
});
