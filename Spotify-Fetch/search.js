window.onload = async () => {
  await fetchMusic("lou wyss");
};

let response;

const fetchMusic = async (querry) => {
  try {
    response = await fetch(
      `https://striveschool-api.herokuapp.com/api/deezer/search?q=${querry}`
    )
      .then((response) => response.json())
      .then((data) => data);
    document.getElementById("searchOutput").innerHTML = "";
    console.log(response.data);
    response.data
      .filter((e) => {
        // console.log(querry);
        console.log(e.artist.name);
        return e.artist.name.toLowerCase() === querry.toLowerCase();
      })
      .map((e) => {
        return (document.getElementById(
          "searchOutput"
        ).innerHTML += `<div class="card music-card col-3 m-4 ml-5 text-body" style="width: 18rem ">
      <img src=${e.album.cover} class="card-img-top pt-3" alt="..." />
      <div class="card-body">
        <h5 class="card-title text-body">${e.album.title}</h5>
        <p class="card-text text-dark">
        ${e.artist.name}
              </p>
            </div>
      </div>`);
      });
  } catch (error) {
    console.log(error);
  }
};

const handleChange = async (val) => {
  if (val === "") await fetchMusic("lou wyss");
  else await fetchMusic(val);
  document.getElementById("theThingToChange").innerHTML = "";
};
