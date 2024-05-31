// Global Selectors
const output = document.getElementById("allSections");
const filterBar = document.getElementById("filterBar");
const clear = document.getElementById("clear");

// Global Variables
let filtersAdded = {};
let filterContent = "";

// Uses data.json to implement dynamicly html code.
async function fetchData() {
  return fetch("data.json").then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return response.json();
  });
}

fetchData()
  .then((data) => {
    // Create a DocumentFragment to hold the new HTML elements for more optimisation
    const fragment = document.createDocumentFragment();

    data.map((e) => {
      let {
        company,
        contract,
        featured,
        id,
        languages,
        level,
        location,
        logo,
        recent,
        position,
        postedAt,
        role,
        tools,
      } = e;

      let language = languages
        .map((i) => `<span class="lang filter">${i}</span>`)
        .join("");
      let tool = tools
        .map((i) => `<span class="tool filter">${i}</span>`)
        .join("");

      //   // Create a new section element and set its innerHTML to the generated HTML string
      //   const section = document.createElement("section");
      //   section.className = "section";
      //   section.id = id;
      //   section.innerHTML = `
      //             <img class="logo" src="${logo}" alt="logo">
      //             <div class="flex-row-column">
      //                 <div class="line-one">
      //                     <span class="company">${company}</span>
      //                     ${recent ? '<span class="new">NEW!</span>' : ""}
      //                     ${
      //                       featured
      //                         ? '<span class="featured">FEATURED</span>'
      //                         : ""
      //                     }
      //                 </div>
      //                 <h1 class="position">${position}</h1>
      //                 <div class="line-two">
      //                     <span class="posted-at">${postedAt}</span>
      //                     <span class="contract">${contract}</span>
      //                     <span class="location">${location}</span>
      //                 </div>
      //             </div>
      //             <div class="border"></div>
      //             <div class="box">
      //               <span class="role filter">${role}</span>
      //               <span class="level filter">${level}</span>
      //               ${language}
      //               ${tool}
      //             </div>
      //           `;

      //   // Append the new section element to the fragment
      //   fragment.append(section);
    });
    // Append the fragment, which contains all the new section elements, to the output element
    output.append(fragment);

    // Interactions with filter tablets and filter bar in which filter tablets appear when clicked.
    const filterTablets = document.querySelectorAll(".filter");
    const allSections = document.querySelectorAll(".section");

    // functions
    function showFilterBar() {
      filterBar.style.display = "flex";
      clear.style.display = "flex";
    }

    function hideFilterBar() {
      filterBar.style.display = "none";
      clear.style.display = "none";
    }

    function allSectionsAppear() {
      allSections.forEach((e) => (e.style.display = "flex"));
    }

    // A clicked filter button triggers filter bar in which appears filter button content with a remove icon
    filterTablets.forEach((e) => {
      e.addEventListener("click", (i) => {
        showFilterBar();
        filterContent = i.target.textContent;
        if (!filtersAdded[filterContent]) {
          filtersAdded[filterContent] = true;
          addFilterTablet(filterContent);
          filterSections();
        }
      });
    });

    // Creates filter in filter bar
    function addFilterTablet(filterContent) {
      const filterTablet = document.createElement("span");
      filterTablet.setAttribute("class", "filter-button");
      filterTablet.innerHTML = `${filterContent}<img class="remove-icon" src="images/icon-remove.svg" alt="remove icon">`;
      filterBar.insertAdjacentElement("beforeend", filterTablet);
      const removeButton = filterTablet.querySelector(".remove-icon");
      removeFilterTablet(removeButton);
    }

    // Filters all sections whether thay include filter.
    function filterSections() {
      const filterContents = Object.keys(filtersAdded);
      allSections.forEach((section) => {
        const sectionContent = section.textContent;
        const shouldShowSection = filterContents.every((filterContent) =>
          sectionContent.includes(filterContent)
        );
        section.style.display = shouldShowSection ? "flex" : "none";
      });
    }

    // Removes filter buttons. If no filter button remained, clears all.
    function removeFilterTablet(removeButton) {
      removeButton.addEventListener("click", (e) => {
        const filterTablet = e.target.parentNode;
        const removedfilterContent = filterTablet.textContent
          .trim()
          .replace("×", "");
        delete filtersAdded[removedfilterContent];
        filterTablet.remove();
        filterBar.textContent.trim() === "Clear" ? clearAllFilters() : null;
        filterSections();
      });
    }

    // 'clearAllFilters' function clears all elements within the 'filterBar'.
    function clearAllFilters() {
      const elementsToClear = document.querySelectorAll(
        "#filterBar > :not(#clear)"
      );
      elementsToClear.forEach((element) => element.remove());
      filtersAdded = {};
      hideFilterBar();
      allSectionsAppear();
    }

    // Clear button activates clearAllFilters function which clears all elements within the filterBar.
    clear.addEventListener("click", (e) => {
      e.preventDefault();
      clearAllFilters();
    });
  })
  .catch((error) => {
    console.error(error);
  });

// // Fetch the JSON data
// fetch("data.json")
//   .then((response) => response.json())
//   .then((data) => {
//     // Get the container where job listings will be displayed
//     const jobListingsContainer = document.querySelector(".job-listings");

//     // Loop through the data and create HTML for each job listing
//     data.forEach((job) => {
//       // Create job item container
//       const jobItem = document.createElement("div");
//       jobItem.classList.add("job-item");

//       // Create job logo
//       const logo = document.createElement("div");
//       logo.classList.add("image");
//       const logoImg = document.createElement("img");
//       logoImg.src = job.logo;
//       logoImg.alt = job.company;
//       logo.appendChild(logoImg);

//       // Create new/featured section
//       const newFeatured = document.createElement("div");
//       newFeatured.classList.add("new-featured");
//       if (job.new) {
//         const newSpan = document.createElement("span");
//         newSpan.classList.add("new");
//         newSpan.textContent = "NEW!";
//         newFeatured.appendChild(newSpan);
//       }
//       if (job.featured) {
//         const featuredSpan = document.createElement("span");
//         featuredSpan.classList.add("featured");
//         featuredSpan.textContent = "FEATURED";
//         newFeatured.appendChild(featuredSpan);
//       }

//       // Create job details
//       const details = document.createElement("div");
//       details.classList.add("details");
//       const position = document.createElement("div");
//       position.classList.add("position");
//       position.textContent = job.position;
//       const posted = document.createElement("span");
//       posted.classList.add("posted");
//       posted.textContent = job.postedAt;
//       const contract = document.createElement("span");
//       contract.classList.add("contract");
//       contract.textContent = job.contract;
//       const location = document.createElement("span");
//       location.classList.add("location");
//       location.textContent = job.location;
//       details.appendChild(position);
//       details.appendChild(posted);
//       details.appendChild(contract);
//       details.appendChild(location);

//       // Create job tags
//       const tags = document.createElement("div");
//       tags.classList.add("tags");
//       job.languages.forEach((language) => {
//         const tag = document.createElement("span");
//         tag.textContent = language;
//         tags.appendChild(tag);
//       });
//       job.tools.forEach((tool) => {
//         const tag = document.createElement("span");
//         tag.textContent = tool;
//         tags.appendChild(tag);
//       });

//       // Append all elements to job item container
//       jobItem.appendChild(logo);
//       jobItem.appendChild(newFeatured);
//       jobItem.appendChild(details);
//       jobItem.appendChild(tags);

//       // Append job item container to job listings container
//       jobListingsContainer.appendChild(jobItem);
//     });
//   })
//   .catch((error) => console.error("Error fetching data:", error));
