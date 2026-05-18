const resultados = document.getElementById('resultados');

async function carregarDados() {

    // carrega todos os jsons
    const [pontosRes, linhasRes, horariosRes] = await Promise.all([
        fetch('./dados/pontos.json'),
        fetch('./dados/linhas.json'),
        fetch('./dados/horarios.json')
    ]);

    // transforma em objeto
    const pontos = await pontosRes.json();
    const linhas = await linhasRes.json();
    const horarios = await horariosRes.json();

    // percorre os pontos
    pontos.forEach(ponto => {

        // encontra linha correspondente
        const linha = linhas.find(l => l.id === ponto.linhaId);

        // encontra horários da linha
        const horarioLinha = horarios.find(
            h => h.linhaId === ponto.linhaId
        );

        // formata horários
        const horariosTexto = horarioLinha
            ? horarioLinha.horarios.join(' • ')
            : 'Sem horários';

        // cria card
        const card = document.createElement('div');

        card.classList.add(
            'card',
            `linha-${ponto.linhaId}`
        );

        // HTML do card
        card.innerHTML = `
            <h2>📍 ${ponto.nome}</h2>

            <p>${ponto.endereco}</p>

            <div class="linha">
                🚌 ${linha.nome}
            </div>

            <div class="horarios">
                ⏰ ${horariosTexto}
            </div>
        `;

        // adiciona na tela
        resultados.appendChild(card);

    });

}

carregarDados();