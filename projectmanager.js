const modal = document.getElementById("modal");
const addBtn = document.getElementById("addProjectBtn");
const closeBtn = document.getElementById("closeModal");
const saveBtn = document.getElementById("saveProject");

const table = document.getElementById("projectTable");

let projects = [];

/* Open Modal */
addBtn.onclick = () => modal.style.display = "flex";

/* Close Modal */
closeBtn.onclick = () => modal.style.display = "none";

/* Save Project */
saveBtn.onclick = () => {
    const name = document.getElementById("projectName").value;
    const date = document.getElementById("projectDate").value;
    const status = document.getElementById("projectStatus").value;

    if (name === "" || date === "") return alert("Fill all fields");

    projects.push({ name, date, status });
    modal.style.display = "none";

    document.getElementById("projectName").value = "";
    renderProjects();
};

/* Render */
function renderProjects() {
    table.innerHTML = "";

    let active = 0;
    let completed = 0;

    projects.forEach((p, index) => {
        if (p.status === "Active") active++;
        else completed++;

        table.innerHTML += `
            <tr>
                <td>${p.name}</td>
                <td>${p.status}</td>
                <td>${p.date}</td>
                <td><button class="delete" onclick="deleteProject(${index})">Delete</button></td>
            </tr>
        `;
    });

    document.getElementById("totalProjects").innerText = projects.length;
    document.getElementById("activeProjects").innerText = active;
    document.getElementById("completedProjects").innerText = completed;
}

/* Delete */
function deleteProject(i) {
    projects.splice(i, 1);
    renderProjects();
}

/* Navigation Logic */
const navItems = document.querySelectorAll(".sidebar li");
const sections = document.querySelectorAll(".content-section");
const pageHeader = document.getElementById("page-header");

navItems.forEach(item => {
    item.addEventListener("click", () => {
        // Handle Sidebar Active State
        navItems.forEach(nav => nav.classList.remove("active"));
        item.classList.add("active");

        // Switch Views
        const target = item.getAttribute("data-target");
        sections.forEach(section => {
            section.style.display = section.id === target ? "block" : "none";
        });

        // Update Header & Button Visibility
        if (pageHeader) pageHeader.innerText = item.innerText;
        addBtn.style.display = (target === "dashboard") ? "block" : "none";
    });
});
