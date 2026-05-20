const resultados = document.getElementById('resultados');
const busca = document.getElementById('busca');
const quantidadeResultados = document.getElementById('quantidadeResultados');

let pontos = [];
let linhas = [];
let horarios = [];

// ===============================
// CARREGAR DADOS
// ===============================
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position) => {
    const pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    // Centralizar e marcar a posição usando a API do Google Maps
    map.setCenter(pos);
    new google.maps.Marker({ position: pos, map: map });
  });
}

async function carregarDados() {

    const [pontosRes, linhasRes, horariosRes] = await Promise.all([
        fetch('./dados/pontos.json'),
        fetch('./dados/linhas.json'),
        fetch('./dados/horarios.json')
    ]);

    pontos = await pontosRes.json();
    linhas = await linhasRes.json();
    horarios = await horariosRes.json();

    renderizarPontos(pontos);

    iniciarMapa();
}


// ===============================
// RENDERIZAR PONTOS
// ===============================

function renderizarPontos(lista) {

    resultados.innerHTML = '';

    quantidadeResultados.innerText =
        `${lista.length} pontos encontrados`;

    lista.forEach(ponto => {

        const linha = linhas.find(
            l => l.id === ponto.linhaId
        );

        const horarioLinha = horarios.find(
            h => h.linhaId === ponto.linhaId
        );

        const card = document.createElement('div');

        // CLASSE DA LINHA
        card.classList.add(
            'card',
            `linha-${ponto.linhaId}`
        );

        card.innerHTML = `

            <div class="card-top">

                <div>

                    <h2>
                        📍 ${ponto.nome}
                    </h2>

                    <span>
                        ${ponto.bairro}
                    </span>

                </div>

                <span class="linha-tag">
                    ${linha.nome}
                </span>

            </div>

            <p class="endereco">
                ${ponto.endereco}
            </p>

            <div class="horarios">

                ${horarioLinha.horarios.map(h => `
                    <span>${h}</span>
                `).join('')}

            </div>

        `;

        resultados.appendChild(card);

    });
}

// ===============================
// BUSCA
// ===============================

busca.addEventListener('input', () => {

    const texto = busca.value.toLowerCase();

    const filtrados = pontos.filter(ponto => {

        const linha = linhas.find(
            l => l.id === ponto.linhaId
        );

        return (

            ponto.nome
                .toLowerCase()
                .includes(texto)

            ||

            ponto.endereco
                .toLowerCase()
                .includes(texto)

            ||

            linha.nome
                .toLowerCase()
                .includes(texto)

            ||

            linha.titulo
                .toLowerCase()
                .includes(texto)

        );

    });

    renderizarPontos(filtrados);

});

// ===============================
// MAPA
// ===============================

function iniciarMapa() {

    const map = L.map('map').setView(
        [-22.4946, -48.5588],
        13
    );

    L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
            attribution: 'OpenStreetMap'
        }
    ).addTo(map);

    pontos.forEach(ponto => {

        // IGNORA SE NÃO TIVER LAT/LNG
        if (!ponto.lat || !ponto.lng) return;

        L.marker([
            ponto.lat,
            ponto.lng
        ])
        .addTo(map)
        .bindPopup(`
            <strong>${ponto.nome}</strong>
            <br>
            ${ponto.endereco}
        `);

    });

}



carregarDados();