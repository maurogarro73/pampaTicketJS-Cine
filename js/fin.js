let ticketComprados = JSON.parse(localStorage.getItem('productosAgregadosJSON')) || [];
let comboComprados = JSON.parse(localStorage.getItem('combosAgregadosJSON')) || [];

function renderCombos() {}
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
                            <button type="button" class="btn btn-warning btn-lg my-3" data-bs-toggle="modal" data-bs-target="#comprar">Agregar al carrito</button>
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
