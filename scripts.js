// Fetch the JSON data
fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    // Get the container where job listings will be displayed
    const jobListingsContainer = document.querySelector(".job-listings");

    // Loop through the data and create HTML for each job listing
    data.forEach((job) => {
      // Create job item container
      const jobItem = document.createElement("div");
      jobItem.classList.add("job-item");

      // Create job logo
      const logo = document.createElement("div");
      logo.classList.add("image");
      const logoImg = document.createElement("img");
      logoImg.src = job.logo;
      logoImg.alt = job.company;
      logo.appendChild(logoImg);

      // Create new/featured section
      const newFeatured = document.createElement("div");
      newFeatured.classList.add("new-featured");
      if (job.new) {
        const newSpan = document.createElement("span");
        newSpan.classList.add("new");
        newSpan.textContent = "NEW!";
        newFeatured.appendChild(newSpan);
      }
      if (job.featured) {
        const featuredSpan = document.createElement("span");
        featuredSpan.classList.add("featured");
        featuredSpan.textContent = "FEATURED";
        newFeatured.appendChild(featuredSpan);
      }

      // Create job details
      const details = document.createElement("div");
      details.classList.add("details");
      const position = document.createElement("div");
      position.classList.add("position");
      position.textContent = job.position;
      const posted = document.createElement("span");
      posted.classList.add("posted");
      posted.textContent = job.postedAt;
      const contract = document.createElement("span");
      contract.classList.add("contract");
      contract.textContent = job.contract;
      const location = document.createElement("span");
      location.classList.add("location");
      location.textContent = job.location;
      details.appendChild(position);
      details.appendChild(posted);
      details.appendChild(contract);
      details.appendChild(location);

      // Create job tags
      const tags = document.createElement("div");
      tags.classList.add("tags");
      job.languages.forEach((language) => {
        const tag = document.createElement("span");
        tag.textContent = language;
        tags.appendChild(tag);
      });
      job.tools.forEach((tool) => {
        const tag = document.createElement("span");
        tag.textContent = tool;
        tags.appendChild(tag);
      });

      // Append all elements to job item container
      jobItem.appendChild(logo);
      jobItem.appendChild(newFeatured);
      jobItem.appendChild(details);
      jobItem.appendChild(tags);

      // Append job item container to job listings container
      jobListingsContainer.appendChild(jobItem);
    });
  })
  .catch((error) => console.error("Error fetching data:", error));
