const API = "https://backend-crm-6nox.onrender.com";

let allLeads = [];

// Navigation
function showSection(id) {
  document.querySelectorAll(".section").forEach(sec => {
    sec.classList.remove("active");
  });

  document.querySelectorAll(".sidebar li").forEach(li => {
    li.classList.remove("active");
  });

  document.getElementById(id).classList.add("active");
  event.target.classList.add("active");
}

// Add Client
async function addLead() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const company = document.getElementById("company").value;
  const notes = document.getElementById("notes").value;

  await fetch(`${API}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, phone, company, notes })
  });

  alert("Client Added!");
  getLeads();
}

// Get Clients
async function getLeads() {
  const res = await fetch(`${API}/leads`);
  allLeads = await res.json();

  displayLeads(allLeads);
  document.getElementById("total").innerText = allLeads.length;
}

// Display
function displayLeads(data) {
  const list = document.getElementById("leadList");
  list.innerHTML = "";

  data.forEach(lead => {
    const div = document.createElement("div");
    div.className = "lead";

    div.innerHTML = `
      <p><b>${lead.name}</b></p>
      <p>${lead.email}</p>
      <p>${lead.phone || ""}</p>
      <p>${lead.company || ""}</p>
      <p>${lead.notes || ""}</p>
      <button onclick="deleteLead('${lead._id}')">Delete</button>
    `;

    list.appendChild(div);
  });
}

// Delete
async function deleteLead(id) {
  await fetch(`${API}/delete/${id}`, { method: "DELETE" });
  getLeads();
}

// Search
function filterLeads() {
  const text = document.getElementById("search").value.toLowerCase();

  const filtered = allLeads.filter(l =>
    l.name.toLowerCase().includes(text) ||
    l.email.toLowerCase().includes(text)
  );

  displayLeads(filtered);
}

// Load
window.onload = getLeads;
