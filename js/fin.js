peliSelect = JSON.parse(localStorage.getItem('peliAddJSON')) || [];
comboComprados = JSON.parse(localStorage.getItem('combosAddJSON')) || [];
precioEntradas = localStorage.getItem('precioEntradas');
precioEntradas = parseInt(precioEntradas);
fechaSelected = localStorage.getItem('fechaSelected');
cantEntradasTextoSelect = localStorage.getItem('cantEntradasTextoSelect');
precioTotal = localStorage.getItem('precioTotal');
precioTotal = parseInt(precioTotal);
emailInput = localStorage.getItem('emailInput');
nombreInput = localStorage.getItem('nombreInput');
apellidoInput = localStorage.getItem('apellidoInput');

function renderDatosPersona() {
  let htmlPersona = `<li class="list-group-item"><strong>Nombres:</strong>  ${nombreInput}</li>
                        <li class="list-group-item"><strong>Apellido:</strong> ${apellidoInput}</li>
                        <li class="list-group-item"><strong>Email:</strong> ${emailInput}</li>`;
  document.getElementById('datosPersona').innerHTML = htmlPersona;
}
renderDatosPersona();

function renderPeliculaSelect() {
  let htmlPeli = '';
  for (let i = 0; i < peliSelect.length; i++) {
    htmlPeli += `<tr>
                    <td><img src="../${peliSelect[i].img}" alt="portada pelicula" class="card-img-top img-table"></td>
                    <td>${peliSelect[i].nombre}</td>
                    <td>${peliSelect[i].info}</td>
                    <td>${cantEntradasTextoSelect}</td>
                    <td>${fechaSelected}</td>
                </tr>`;
  }
  document.getElementById('peliSelect').innerHTML = htmlPeli;
}
renderPeliculaSelect();

function renderCombos() {
  let htmlInit = `<h3>Combos adquiridos</h3>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Img</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Info</th>
                            </tr>
                        </thead>
                        <tbody>`;
  let htmlFin = `</tbody>
                </table>`;
  let htmlCombos = '';
  for (let i = 0; i < comboComprados.length; i++) {
    htmlCombos += `<tr>
                        <td><img src="${comboComprados[i].img}" alt="imagen combo" class="card-img-top img-table"></td>
                        <td>${comboComprados[i].nombre}</td>
                        <td>${comboComprados[i].info}</td>
                    </tr>`;
  }
  document.getElementById('combosSelect').innerHTML = htmlInit + htmlCombos + htmlFin;
}
renderCombos();

function precioFinal() {
  document.getElementById('total').innerHTML = 'Total a abonar en el cine es de $' + precioTotal;
}
precioFinal();

let btnFin = document.getElementById('btnGracias');
btnFin.addEventListener('click', finalizar);

function finalizar() {
  localStorage.clear();
  window.location.href = '../index.html';
}
