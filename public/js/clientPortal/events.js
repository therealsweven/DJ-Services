const eventContainer = $("#eventContainer");

const displayEvents = (events) => {
  events.forEach((i) => {
    const card = document.createElement("div");
    card.setAttribute("id", `${i.id}`);
    card.classList.add("invoiceCard");
    card.classList.add("d-flex");
    card.classList.add("my-3");
    card.innerHTML = `<div class="d-flex flex-column align-items-center px-3 w-100">
                      <h3 class="text-center">${i.date}</h3>
                      <div class="text-left w-100">
                      <h4>Description: ${i.description}</h4>
                      <h4>Location:  ${i.location}</h4>
                      <h4>Time: ${i.time}</h4>
                      </div>
                      </div>
                      `;
    console.log(card);
    eventContainer.append(card);
  });
};

fetch("/api/event/")
  .then((data) => {
    return data.json();
  })
  .then((events) => {
    console.log(events);
    displayEvents(events);
  });
