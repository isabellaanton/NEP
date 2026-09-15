let map;
let markers = [];

function initMap() {
  const centro = { lat: -3.769, lng: -38.478 };
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 16,
    center: centro,
  });

  map.addListener("click", function(event) {
    addMarkerAtPosition(event.latLng);
  });
}

function addMarker() {
  const lat = parseFloat(document.getElementById("latitude").value);
  const lng = parseFloat(document.getElementById("longitude").value);
  const title = document.getElementById("markerName").value || "Ponto";

  if (!isNaN(lat) && !isNaN(lng)) {
    createMarker({ lat, lng }, title);
    map.setCenter({ lat, lng });
  } else {
    alert("Insira valores válidos!");
  }
}

function addMarkerAtPosition(latLng) {
  const markerName = prompt("Nome do marcador:", "Ponto") || "Ponto";
  createMarker(latLng, markerName);
  map.setCenter(latLng);
}

function createMarker(position, title) {
  const marker = new google.maps.Marker({
    position,
    map,
    title,
    draggable: true
    // Para usar um ícone customizado, hospede a imagem (ex: dentro do
    // repositório do GitHub, em uma pasta "img/") e use a URL pública dela:
    // icon: "img/meu-icone.png"
  });

  markers.push(marker);
  addMarkerToList(marker, title);
}

function addMarkerToList(marker, name) {
  const list = document.getElementById("markerList");
  const item = document.createElement("li");
  item.innerHTML = `
    <span><strong>${name}</strong> → [${marker.getPosition().lat().toFixed(5)}, ${marker.getPosition().lng().toFixed(5)}]</span>
    <span>
      <button onclick="centerMarker(${markers.length - 1})">Ver</button>
      <button onclick="removeMarker(${markers.length - 1}, this)">Excluir</button>
    </span>
  `;
  list.appendChild(item);
}

function centerMarker(index) {
  const marker = markers[index];
  if (marker) {
    map.setCenter(marker.getPosition());
    map.setZoom(18);

    // Acessibilidade: leitura em voz alta do nome
    const msg = new SpeechSynthesisUtterance(marker.getTitle());
    window.speechSynthesis.speak(msg);
  }
}

function removeMarker(index, btn) {
  const marker = markers[index];
  if (marker) {
    marker.setMap(null);
    markers[index] = null;
  }
  btn.closest("li").remove();
}