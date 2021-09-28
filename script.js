//---------------------------------------------------

//All Dom elemets required

const domElement = {
  inputFeild: document.querySelector("#name"),
  displayError: document.querySelector("#display-error"),
  form: document.querySelector("#searchForm"),
  grid: document.querySelector("#grid"),
};

//--------------------------------------------------

// Async Funtion used to fetch Data

const getGitResult = async function (query, domElement) {
  try {
    const res = await fetch(`https://api.github.com/search/users?q=${query}`);
    if (!res.ok)
      throw new Error("No Profile Found or Value was Blank. Please Try Again");
    const data = await res.json();
    if (data.total_count === 0)
      throw new Error("No Profile Found for the given name. Please Try Again");

    data.items.forEach(function (show) {
      if (show.rated === "Rx") return;
      const card = getCard(show);

      domElement.grid.insertAdjacentHTML("beforeend", card);
    });
  } catch (error) {
    domElement.displayError.insertAdjacentText("afterbegin", error.message);
  }
};
//--------------------------------------------------------------

//This Funtion gives the code to render card
const getCard = function (data) {
  return ` <div class="col">
    <div class="card " style="width: 18rem">
        <img height='250rem'
          src="${data.avatar_url}"
          class="card-img-top"
          alt="No Image Preview Available"
        />
        <div class="card-body">
          <h5 class="card-title">${
            data.login ? data.login : "Title Not Available"
          }</h5>
          <p class="card-text">
            <p><b>User ID: </b>${data.id ? data.id : "No Data to show"}</p>
            
            <p><b>Type: </b>${
              data.type ? data.type : "Type is not Available"
            }</p>
            <p><b>Score: </b>${
              data.score ? data.score.toFixed(1) : "No Score Available"
            }</p>
          </p>
          <a href=${
            data.html_url
          } target="_blank" class="btn btn-primary">Go To Github Profile</a>
        </div>
        </div>
</div>`;
};
//---------------------------------------------------

//Add Event Listener to Listen submit Event

domElement.form.addEventListener("submit", function (e) {
  e.preventDefault();
  domElement.grid.innerHTML = "";
  domElement.displayError.innerHTML = "";
  const query = domElement.inputFeild.value;
  domElement.form.reset();
  getGitResult(query, domElement);
});
//---------------------------------------------------
