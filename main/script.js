
const API = "http://localhost:8000";

// Search users by skill
function searchBySkill() {
  const skill = document.getElementById("skillInput").value;
  const list = document.getElementById("usersList");
  list.innerHTML = "";

  fetch(`${API}/api/users?skill=${skill}`)
    .then(res => res.json())
    .then(users => {
      if (users.length === 0) {
        list.innerHTML = "<li>No users found</li>";
        return;
      }

      users.forEach(user => {
        const li = document.createElement("li");
        li.textContent = `${user.name} - ${user.skills.join(", ")}`;
        list.appendChild(li);
      });
    })
    .catch(err => {
      console.error(err);
      list.innerHTML = "<li>Error fetching users</li>";
    });
}

// Load projects
function loadProjects() {
  const list = document.getElementById("projectsList");
  list.innerHTML = "";

  fetch(`${API}/api/projects`)
    .then(res => res.json())
    .then(projects => {
      projects.forEach(p => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${p.title}</strong>: ${p.description}`;
        list.appendChild(li);
      });
    })
    .catch(err => {
      console.error(err);
      list.innerHTML = "<li>Error loading projects</li>";
    });
}

// Load profile
function loadProfile() {
  const div = document.getElementById("profile");
  div.innerHTML = "Loading...";

  fetch(`${API}/api/v1/profile`)
    .then(res => res.json())
    .then(profile => {
      div.innerHTML = `
        <h3>${profile.name}</h3>
        <p>${profile.bio}</p>
        <p><strong>Skills:</strong> ${profile.skills.join(", ")}</p>
        <a href="${profile.resume}" target="_blank">View Resume</a>
      `;
    })
    .catch(err => {
      console.error(err);
      div.innerHTML = "Error loading profile";
    });
}
