let leads = JSON.parse(localStorage.getItem("leads")) || [];

function addLead() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const source = document.getElementById("source").value;
  const notes = document.getElementById("notes").value;

  if (!name || !email) {
    alert("Please fill required fields");
    return;
  }

  leads.push({
    name,
    email,
    source,
    notes,
    status: "new"
  });

  saveData();
  displayLeads();
}

function displayLeads() {
  const list = document.getElementById("list");

  list.innerHTML = leads.map((lead, index) => `
    <div class="card">
      <b>${lead.name}</b><br>
      📧 ${lead.email}<br>
      📍 ${lead.source}<br>
      📝 ${lead.notes}<br>

      Status:
      <select onchange="updateStatus(${index}, this.value)">
        <option ${lead.status==="new"?"selected":""}>new</option>
        <option ${lead.status==="contacted"?"selected":""}>contacted</option>
        <option ${lead.status==="converted"?"selected":""}>converted</option>
      </select>

      <br><br>
      <button onclick="deleteLead(${index})">Delete</button>
    </div>
  `).join("");
}

function updateStatus(index, status) {
  leads[index].status = status;
  saveData();
}

function deleteLead(index) {
  leads.splice(index, 1);
  saveData();
  displayLeads();
}

function saveData() {
  localStorage.setItem("leads", JSON.stringify(leads));
}

displayLeads();
