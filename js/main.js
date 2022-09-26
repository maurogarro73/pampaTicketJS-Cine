/* Inicio de localStorage */
let ticketComprados = JSON.parse(localStorage.getItem('peliAddJSON')) || [];

/* guardar en localStorage */
let saveToLocalStorage = () => {
  let storageJSON = JSON.stringify(ticketComprados);
  localStorage.setItem('peliAddJSON', storageJSON);
};

/* Renderizar eventos peliculas */
function renderPeliculas() {
  fetch('../json/pelicula.json')
    .then((res) => res.json())
    .then((pelicula) => {
      let htmlTodos = '';
      for (let i = 0; i < pelicula.length; i++) {
        htmlTodos += `
        <div class="card my-2">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${pelicula[i].img}" class="img-fluid rounded-start" alt="portada pelicula">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title text-center">${pelicula[i].nombre}</h5>
                        <div class="linea"></div>
                        <p class="card-text">${pelicula[i].info}</p>
                        <div class="lugar row w-100 m-auto  d-flex justify-content-center col text-center">
                            <div class="ratio ratio-16x9">
                                <iframe width="560" height="315" src="${pelicula[i].linkVideo}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            </div>
                            <h3>${pelicula[i].fecha}</h3>
                            <div class="col text-center">
                                <button type="button" class="btn btn-warning btn-lg m-4" onclick="agregarAlCart(${pelicula[i].id});">Comprar Entrada</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
      }
      document.getElementById('peliculas').innerHTML = htmlTodos;
    })
    .catch((e) => {
      console.log(e);
    });
}
renderPeliculas();

function agregarAlCart(id) {
  fetch('../json/pelicula.json')
    .then((res) => res.json())
    .then((peliculas) => {
      const selectPeli = peliculas.find((pelicula) => pelicula.id == id);
      ticketComprados.push(selectPeli);
      saveToLocalStorage();
      window.location.href = '../pages/combos.html';
    })
    .catch((e) => {
      console.log(e);
    });
}
