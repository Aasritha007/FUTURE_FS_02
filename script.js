async function loadLeads() {
  const res = await fetch("http://localhost:5000/leads");
  const data = await res.json();

  document.getElementById("list").innerHTML = data.map(lead => `
    <div class="card">
      <b>${lead.name}</b><br>
      📧 ${lead.email}<br>
      📍 ${lead.source}<br>
      📝 ${lead.notes}<br>

      Status:
      <select onchange="updateStatus('${lead._id}', this.value)">
        <option ${lead.status==="new"?"selected":""}>new</option>
        <option ${lead.status==="contacted"?"selected":""}>contacted</option>
        <option ${lead.status==="converted"?"selected":""}>converted</option>
      </select>

      <button onclick="deleteLead('${lead._id}')">Delete</button>
    </div>
  `).join("");
}

async function addLead() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const source = document.getElementById("source").value;
  const notes = document.getElementById("notes").value;

  await fetch("http://localhost:5000/add", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ name, email, source, notes })
  });

  loadLeads();
}

async function updateStatus(id, status) {
  await fetch(`http://localhost:5000/update/${id}`, {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ status })
  });

  loadLeads();
}

async function deleteLead(id) {
  await fetch(`http://localhost:5000/delete/${id}`, {
    method: "DELETE"
  });

  loadLeads();
}

loadLeads();
