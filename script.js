const API = "http://localhost:5000";

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

// Add Lead
async function addLead() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const status = document.getElementById("status").value;

  await fetch(`${API}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, status })
  });

  alert("Lead Added!");
  getLeads();
}

// Get Leads
async function getLeads() {
  const res = await fetch(`${API}/leads`);
  allLeads = await res.json();

  displayLeads(allLeads);
  updateStats();
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
      <p>Status: ${lead.status}</p>
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

// Filter
function filterLeads() {
  const text = document.getElementById("search").value.toLowerCase();

  const filtered = allLeads.filter(l =>
    l.name.toLowerCase().includes(text) ||
    l.email.toLowerCase().includes(text)
  );

  displayLeads(filtered);
}

// Stats
function updateStats() {
  document.getElementById("total").innerText = allLeads.length;

  document.getElementById("hot").innerText =
    allLeads.filter(l => l.status === "Hot").length;

  document.getElementById("converted").innerText =
    allLeads.filter(l => l.status === "Converted").length;
}

// Load on start
window.onload = getLeads;
