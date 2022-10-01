peliSelect = JSON.parse(localStorage.getItem('peliAddJSON')) || [];
let comboComprados = JSON.parse(localStorage.getItem('combosAddJSON')) || [];
let precioTotal = localStorage.getItem('precioTotal');
precioTotal = parseInt(precioTotal);

function renderPeliSelect() {
  let htmlPeliSelect = '';
  for (let i = 0; i < peliSelect.length; i++) {
    htmlPeliSelect = `
            <div class="col-md-4">
              <img src="../${peliSelect[i].img}" class="img-fluid rounded-start" alt="imagen portada">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${peliSelect[i].nombre}</h5>
                <p class="card-text">${peliSelect[i].info}</p>
                <p class="card-text">
                  <small class="text-muted">
                    <div class="form-floating">
                      <select class="form-select" id="selectFecha" onchange="seleccionarFecha();" aria-label="Floating label select example">
                        <option selected>Selecciona fecha</option>
                        <option value="1">Jue 22/09/2022 - 20 hs</option>
                        <option value="2">Jue 22/09/2022 - 22:30 hs</option>
                        <option value="3">Vie 23/09/2022 - 22:30 hs</option>
                      </select>
                    </div>
                  </small>
                </p>
                <p class="card-text">
                  <small class="text-muted">
                    <div class="form-floating">
                      <select class="form-select" id="selectEntrada" onchange="cantidadEntradas();" aria-label="Floating label select example">
                        <option selected>Cantidad entradas</option>
                        <option value="1">1 entradas</option>
                        <option value="2">2 entradas</option>
                        <option value="3">3 entradas</option>
                        <option value="4">4 entradas</option>
                      </select>
                      <label for="selectEntrada" id="valorTotalEntradas">Valor: $${peliSelect[i].precio}</label>
                    </div>
                  </small>
                </p>
                <div class="d-grid gap-2">
                  <button type="button" class="btn btn-warning" onclick="cambiarPeli(${i}); saveToLocalStorage();">Cambiar Película</button>
                <div>
              </div>
            </div>`;
  }
  document.getElementById('peliSelect').innerHTML = htmlPeliSelect;
}
renderPeliSelect();

function renderCarrito() {
  let htmlCart = '';
  for (let i = 0; i < comboComprados.length; i++) {
    htmlCart += `
    <tr>
      <th scope="row"><img src="${comboComprados[i].img}" class="card-img-top img-table" alt="imagen combo"></th>
      <td>${comboComprados[i].nombre}: ${comboComprados[i].info}</td>
      <td>$${comboComprados[i].precio}</td>
      <td></td>
      <td><i class="bi bi-trash3-fill iconEliminar" onclick="eliminarComboCart(${i}); saveToLocalStorage();" ></i></td>
    </tr>`;
  }
  document.getElementById('carrito').innerHTML = htmlCart;
}
renderCarrito();

/* guardar en localStorage */
let saveToLocalStorage = () => {
  let storageJSON = JSON.stringify(comboComprados);
  localStorage.setItem('combosAddJSON', storageJSON);
  localStorage.setItem('precioTotal', precioTotal);
  let storageJSONPeli = JSON.stringify(peliSelect);
  localStorage.setItem('peliAddJSON', storageJSONPeli);
};

function renderCombos() {
  fetch('../json/combo.json')
    .then((res) => res.json())
    .then((combo) => {
      let htmlCombos = '';
      for (let i = 0; i < combo.length; i++) {
        htmlCombos += `
                      <div class="col">
                        <div class="card">
                          <img src="${combo[i].img}" class="card-img-top" alt="imagen combo">
                          <div class="card-body">
                            <h5 class="card-title text-center">${combo[i].nombre}</h5>
                            <div class="linea"></div>
                            <p class="card-text text-center">${combo[i].info}</p>
                            <p class="precio">Valor: $${combo[i].precio}</p>
                            <div class="col text-center lugar">
                              <button type="button" class="btn btn-warning btn-lg my-3" onclick="agregarAlCarritoCombo(${combo[i].id}); saveToLocalStorage();">Agregar al carrito</button>
                            </div>
                          </div>
                        </div>
                      </div>`;
      }
      document.getElementById('combos').innerHTML = htmlCombos;
    })
    .catch((e) => {
      console.log(e);
    });
}
renderCombos();

function agregarAlCarritoCombo(id) {
  fetch('../json/combo.json')
    .then((res) => res.json())
    .then((combos) => {
      const comboSelect = combos.find((combo) => combo.id == id);
      comboComprados.push(comboSelect);
      renderCarrito();
      saveToLocalStorage();
      calcPrecioTotal();
    })
    .catch((e) => {
      console.log(e);
    });
}

function eliminarComboCart(id) {
  fetch('../json/combo.json')
    .then((res) => res.json())
    .then(() => {
      comboComprados.splice(id, 1);
      renderCarrito();
      saveToLocalStorage();
      calcPrecioTotal();
    })
    .catch((e) => {
      console.log(e);
    });
}

function cambiarPeli(id) {
  fetch('../json/pelicula.json')
    .then((res) => res.json())
    .then(() => {
      peliSelect.splice(id, 1);
      saveToLocalStorage();
      window.location.href = '../index.html';
    });
}

let fechaSelected = '';
function seleccionarFecha() {
  let fecha = document.getElementById('selectFecha');
  let fechaSelected = fecha.options[fecha.selectedIndex].text;
}

/* Calcula el precio en la card dependiendo de cant. entradas seleccionadas */
let precioEntradas = 0;
function cantidadEntradas() {
  let cantEntradas = document.getElementById('selectEntrada').value;
  if (isNaN(cantEntradas)) {
    precioEntradas = 0;
  } else {
    precioEntradas = 800 * cantEntradas;
    document.getElementById('valorTotalEntradas').innerHTML = 'Valor $' + precioEntradas;
  }
  calcPrecioTotal();
}

function calcPrecioTotal() {
  precioTotal = comboComprados.reduce((acc, combo) => {
    return (acc += combo.precio);
  }, precioEntradas);
  document.getElementById('total').innerHTML = 'total: $' + precioTotal;
  saveToLocalStorage();
}
calcPrecioTotal();
