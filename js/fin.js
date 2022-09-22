/* let ticketComprados = JSON.parse(localStorage.getItem('productosAgregadosJSON')) || []; */
let comboComprados = JSON.parse(localStorage.getItem('productosAgregadosJSON')) || [];

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
  localStorage.setItem('productosAgregadosJSON', storageJSON);
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
    })
    .catch((e) => {
      console.log(e);
    });
}

function eliminarComboCart(id) {
  fetch('../json/combo.json')
    .then((res) => res.json())
    .then((combo) => {
      comboComprados.splice(id, 1);
      renderCarrito();
      saveToLocalStorage();
    })
    .catch((e) => {
      console.log(e);
    });
}
