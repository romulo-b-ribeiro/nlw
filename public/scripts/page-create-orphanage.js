const map = L.map("mapid").setView([-31.32, -54.1], 15);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const icon = L.icon({
  iconUrl: "./public/images/map-marker.svg",
  iconSize: [58, 68],
  iconAnchor: [29, 68],
});

let marker;

//create and add markers
map.on("click", (event) => {
  const lat = event.latlng.lat;
  const lng = event.latlng.lng;

  document.querySelector("[name=lat]").value = lat;
  document.querySelector("[name=lng]").value = lng;

  marker && map.removeLayer(marker);

  marker = L.marker([lat, lng], { icon }).addTo(map);
});

function addPhotoField() {
  //pegar o container de fotos #images
  const container = document.querySelector("#images");
  //pegar o container para duplicar .new-upload
  const fieldsContainer = document.querySelectorAll(".new-upload");
  //realizar o clone da última imagem adicionada
  const newFieldContainer = fieldsContainer[
    fieldsContainer.length - 1
  ].cloneNode(true);
  //verificar se o campo está vazio, se sim, não adicionar ao container de imagens
  const input = newFieldContainer.children[0];
  if (input.value == "") {
    return;
  }
  //limpar o campo antes de adicionar ao container de images
  input.value = "";
  //adicionar o clone ao container de images
  container.appendChild(newFieldContainer);
}

function deleteField(event) {
  const span = event.currentTarget;

  const fieldsContainer = document.querySelectorAll(".new-upload");

  if (fieldsContainer.length <= 1) {
    //limpar o valor do campo
    span.parentNode.children[0].value = "";
    return;
  }
  // deletar o campo
  span.parentNode.remove();
}

//selecionar sim ou não
function toggleSelect(event){

    // retirar a class .active (dos botões)
    document.querySelectorAll('.button-select button')
    .forEach(button => button.classList.remove('active'));

    //pegar o botão
    const button = event.currentTarget;
    button.classList.add('active');

    //atualizar o meu input hidden com o botão selecionados
    const input = document.querySelector('[name="open_on_weekends"]');
    
    //verificar se sim ou não
    input.value = button.dataset.value;
}