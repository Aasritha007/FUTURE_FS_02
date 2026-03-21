let leads = [];

function addLead() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  leads.push({ name, email });

  displayLeads();
}

function displayLeads() {
  const list = document.getElementById("list");

  list.innerHTML = leads.map(l => `
    <div>
      <b>${l.name}</b><br>
      ${l.email}
    </div>
  `).join("");
}