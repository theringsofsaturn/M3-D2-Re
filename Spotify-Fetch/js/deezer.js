let albums = [];
let error = false;

function searchDeezer(query) {
  fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q=" + query, {
    method: "GET",
    headers: {
      "x-rapidapi-key": "ff4ac76422msh07095884ca0fdf8p1817bejsn6312dcac21c7",
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // resolved
      console.log("resolved");

      if (data.data) {
        const obj = { title: query, albums: data.data };
        albums.push(obj);
        console.log(albums);
      } else {
        error = true;
      }
    })
    .catch((err) => {
      // rejected
      console.log("rejected");
      console.error(err);
      error = true;
    });
}

function SingleAlbum(album) {
  return `<div
  id="${album.id}"
    class="single-album col-12 col-sm-4 col-lg-2 py-2 py-md-1 px-1 d-flex"
    style="justify-content: center; flex-direction: column"
  >
    <img
      class="img-fluid"
      src="${album.cover}"
      alt="album"
      style="width: 100%"
    />
    <a
      href="./artistPlusSidebar.html"
      style="
        display: flex;
        text-decoration: none;
        color: white;
        justify-content: center;
        width: 100%;
        margin-top: 5px;
        font-weight: 500;
      "
      >${album.title}</a
    >
  </div>`;
}
function AlbumsRow(title, albumsHTML) {
  return `<div class="albums mt-5">
    <h2 class="mb-3 pl-5">${title}</h2>
    <div
      class="album-cover d-flex px-5"
      style="
        justify-content: flex-start;
        flex-wrap: wrap;
        align-items: center;
      "
    >
       ${albumsHTML}
  </div>
`;
}

window.onload = function () {
  searchDeezer("Pink Floyd");
  searchDeezer("Eric Clapton");
  searchDeezer("Jimi Hendrix");
  const renderLink = document.querySelector("#render");

  renderLink.addEventListener("click", function () {
    let pageContent = document.querySelector(".page-content");
    let pageContentHTML = "";
    pageContent.childNodes.forEach((node, index) => {
      if (index !== 1) {
        node.remove();
      }
    });
    albums.forEach((albumResult) => {
      let rowContent = "";
      const title = albumResult.title;
      const data = albumResult.albums;

      data.forEach((result) => {
        const title = result.title_short;
        const cover = result.album.cover_medium;
        const id = result.album.id;
        const album = { cover, title, id };
        rowContent += SingleAlbum(album);
      });
      pageContentHTML += AlbumsRow(title, rowContent);
      rowContent = "";
    });
    pageContent.innerHTML += pageContentHTML;
  });
};

function countUniqueAlbums() {
  const albums = document.querySelectorAll(".single-album");
  const ids = [];
  albums.forEach((album) => {
    ids.push(album.id);
  });
  const uniqueSet = new Set(ids);
  console.log(`There is ${uniqueSet.size} unique albums on the page!`);
}
