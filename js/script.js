const jobContainer = document.getElementById("jobContainer");

function displayJobs(jobList) {

    jobContainer.innerHTML = "";
    if (jobList.length === 0) {
        jobContainer.innerHTML = "<h2>No jobs found</h2>";
        return;
    }


    jobList.forEach(job => {

        const jobCard = document.createElement("div");

        jobCard.classList.add("job-card");

        jobCard.innerHTML = `
            <h3>${job.title}</h3>
            <p><strong>Company:</strong> ${job.company}</p>
            <p><strong>Location:</strong> ${job.location}</p>
            <p><strong>Salary:</strong> ${job.salary}</p>
<button onclick="viewDetails(${job.id})">
    View Details
</button>
<button onclick="saveJob(${job.id})">
    Save Job
</button>        `;

        jobContainer.appendChild(jobCard);
    });
}

displayJobs(jobs);
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {

    const searchText = searchInput.value.toLowerCase();

    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(searchText) ||
        job.company.toLowerCase().includes(searchText) ||
        job.location.toLowerCase().includes(searchText)
    );

    displayJobs(filteredJobs);
});
const locationFilter = document.getElementById("locationFilter");

locationFilter.addEventListener("change", () => {

    const selectedLocation = locationFilter.value;

    if(selectedLocation === ""){
        displayJobs(jobs);
        return;
    }

    const filteredJobs = jobs.filter(job =>
        job.location === selectedLocation
    );

    displayJobs(filteredJobs);
});
function saveJob(jobId){

    let savedJobs =
        JSON.parse(localStorage.getItem("savedJobs")) || [];

    if(!savedJobs.includes(jobId)){

        savedJobs.push(jobId);

        localStorage.setItem(
            "savedJobs",
            JSON.stringify(savedJobs)
        );
         updateSavedCount();
        alert("Job Saved Successfully!");
    }
    else{
        alert("Job Already Saved!");
    }
}
function updateSavedCount(){

    let savedJobs =
        JSON.parse(localStorage.getItem("savedJobs")) || [];

    document.getElementById("savedCount")
        .textContent =
        `Saved Jobs (${savedJobs.length})`;
}
updateSavedCount();
function viewDetails(jobId){

    const job = jobs.find(job => job.id === jobId);

    console.log(job.description);

    document.getElementById("modalTitle").textContent = job.title;
    document.getElementById("modalCompany").textContent = "Company: " + job.company;
    document.getElementById("modalLocation").textContent = "Location: " + job.location;
    document.getElementById("modalSalary").textContent = "Salary: " + job.salary;
const descElement = document.getElementById("modalDescription");

console.log(descElement);
console.log(job.description);

descElement.textContent = "Description: " + job.description;    document.getElementById("jobModal").style.display = "block";
}
document.getElementById("closeModal")
.addEventListener("click", () => {
    document.getElementById("jobModal").style.display = "none";
});
window.addEventListener("click", (event) => {

    const modal = document.getElementById("jobModal");

    if(event.target === modal){
        modal.style.display = "none";
    }

});