peliSelect = JSON.parse(localStorage.getItem('peliAddJSON')) || [];
let comboComprados = JSON.parse(localStorage.getItem('combosAddJSON')) || [];
let precioEntradas = localStorage.getItem('precioEntradas') || 0;
precioEntradas = parseInt(precioEntradas);
let fechaSelected = localStorage.getItem('fechaSelected');
let cantEntradasTextoSelect = localStorage.getItem('cantEntradasTextoSelect');
let precioTotal = localStorage.getItem('precioTotal');
precioTotal = parseInt(precioTotal);
let emailInput = localStorage.getItem('emailInput');
let nombreInput = localStorage.getItem('nombreInput');
let apellidoInput = localStorage.getItem('apellidoInput');

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
  localStorage.setItem('precioEntradas', precioEntradas);
  localStorage.setItem('fechaSelected', fechaSelected);
  localStorage.setItem('cantEntradasTextoSelect', cantEntradasTextoSelect);
  localStorage.setItem('precioTotal', precioTotal);
  let storageJSONPeli = JSON.stringify(peliSelect);
  localStorage.setItem('peliAddJSON', storageJSONPeli);
  localStorage.setItem('emailInput', emailInput);
  localStorage.setItem('nombreInput', nombreInput);
  localStorage.setItem('apellidoInput', apellidoInput);
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
      /* SweetAlert */
      Swal.fire({
        title: 'Eliminar combo del carrito?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'btn btn-success',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('Eliminado!', 'Eliminaste el combo del carrito', 'success');
          /* elimina el combo del carrito */
          comboComprados.splice(id, 1);
          renderCarrito();
          saveToLocalStorage();
          calcPrecioTotal();
        }
      });
    })
    .catch((e) => {
      console.log(e);
    });
}

function cambiarPeli(id) {
  fetch('../json/pelicula.json')
    .then((res) => res.json())
    .then(() => {
      /* SweetAlert */
      Swal.fire({
        title: 'Quieres cambiar de peli?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'btn btn-success',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Cambiar',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('Cambiada!', 'vamos al inicio a elegir otra peli', 'success');
          /* elimina el combo del carrito */
          peliSelect.splice(id, 1);
          /* Receteo los valores que tengan que ver con la peli a '' */
          fechaSelected = '';
          cantEntradasTextoSelect = '';
          precioEntradas = 0;
          saveToLocalStorage();
          window.location.href = '../index.html';
        }
      });
    })
    .catch((e) => {
      console.log(e);
    });
}

function seleccionarFecha() {
  let fecha = document.getElementById('selectFecha');
  fechaSelected = fecha.options[fecha.selectedIndex].text;
}

/* Calcula el precio en la card dependiendo de cant. entradas seleccionadas */
function cantidadEntradas() {
  /* Selecciona cant entradas en texto */
  let cantEntradasTexto = document.getElementById('selectEntrada');
  cantEntradasTextoSelect = cantEntradasTexto.options[cantEntradasTexto.selectedIndex].text;
  /* Selecciona cant entradas en numero */
  let cantEntradas = document.getElementById('selectEntrada').value;
  if (isNaN(cantEntradas)) {
    precioEntradas = 0;
  } else {
    precioEntradas = 800 * cantEntradas;
    document.getElementById('valorTotalEntradas').innerHTML = 'Valor $' + precioEntradas;
    saveToLocalStorage();
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

/* Finalizar Compra */
let btnFinCompra = document.getElementById('finCompra');
btnFinCompra.addEventListener('click', finCompra);
function finCompra() {
  emailInput = document.getElementById('email').value;
  nombreInput = document.getElementById('nombre').value;
  apellidoInput = document.getElementById('apellido').value;
  if (emailInput == '' || nombreInput == '' || apellidoInput == '') {
    document.getElementById('error').innerHTML = `<div class="alert alert-warning" role="alert">Por favor complete todos los datos</div>`;
  } else {
    saveToLocalStorage();
    window.location.href = '../pages/finCompra.html';
  }
}
