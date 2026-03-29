const API = "http://localhost:5000";

// Tabs
function openTab(tabId) {
  document.querySelectorAll(".tab-content").forEach(tab => {
    tab.classList.remove("active");
  });

  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.classList.remove("active");
  });

  document.getElementById(tabId).classList.add("active");
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
}

// Get Leads
async function getLeads() {
  const res = await fetch(`${API}/leads`);
  const data = await res.json();

  const list = document.getElementById("leadList");
  list.innerHTML = "";

  data.forEach(lead => {
    const div = document.createElement("div");
    div.className = "lead";
    div.innerHTML = `
      <p><b>Name:</b> ${lead.name}</p>
      <p><b>Email:</b> ${lead.email}</p>
      <p><b>Status:</b> ${lead.status}</p>
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
