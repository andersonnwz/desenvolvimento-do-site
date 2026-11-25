
const dados = [
    ["Samsung Galaxy S26", 4299, "Premium",
        "Smartphone de categoria superior com conectividade 5G."],

    ["iPhone 17 Pro Max", 12799, "Premium",
        "Tela OLED 6,9 polegadas, 256 GB, chip A19 Pro e câmera de 48 MP."],

    ["Motorola Moto G35 5G", 1001, "Básico",
        "128 GB, tela de 6,72 polegadas, câmera de 50 MP e bateria de 5000 mAh."],

    ["Xiaomi Redmi Note 14 Pro 5G", 1808, "Médio",
        "256 GB, tela AMOLED, câmera de 200 MP e bateria de 5110 mAh."],

    ["Samsung Galaxy A35 5G", 1630, "Médio",
        "128 GB, tela AMOLED, Exynos 1380 e bateria de 5000 mAh."],

    ["iPhone 17e", 4299, "Premium",
        "Smartphone Apple voltado ao uso cotidiano e ao ecossistema iOS."],

    ["Motorola Edge 70 Fusion", 2249, "Médio",
        "Smartphone intermediário para aplicativos e entretenimento."],

    ["Samsung Galaxy A57 5G", 2399, "Médio",
        "Smartphone intermediário com conectividade 5G."],

    ["Positivo Flip", 299, "Básico",
        "Celular dobrável com teclado físico, ideal para ligações."],

    ["OPPO A6t", 799, "Básico",
        "Smartphone de entrada para tarefas cotidianas."],

    ["iPhone 17", 5999, "Premium",
        "256 GB, chip A19, tela OLED de 6,3 polegadas e câmera de 48 MP."],

    ["iPhone 17 Pro", 8999, "Premium",
        "256 GB, chip A19 Pro, tela OLED e câmera de 48 MP."],

    ["iPhone 16", 4299, "Premium",
        "128 GB, chip A18, tela OLED de 6,1 polegadas e câmera de 48 MP."],

    ["iPhone 16e", 3499, "Premium",
        "128 GB, chip A18, tela OLED e câmera de 48 MP."],

    ["Samsung Galaxy S25 Ultra", 6999, "Premium",
        "256 GB, Snapdragon 8 Elite, câmera de 200 MP e bateria de 5000 mAh."],

    ["Samsung Galaxy S25 FE", 3299, "Premium",
        "Smartphone da linha Galaxy S com recursos avançados."],

    ["Samsung Galaxy A56 5G", 1999, "Médio",
        "128 GB, Exynos 1580, tela AMOLED e bateria de 5000 mAh."],

    ["Samsung Galaxy A36 5G", 1599, "Médio",
        "128 GB, Snapdragon 6 Gen 3, câmera de 50 MP e bateria de 5000 mAh."],

    ["Samsung Galaxy A16 5G", 799, "Básico",
        "128 GB, tela AMOLED, câmera de 50 MP e bateria de 5000 mAh."],

    ["Motorola Moto G56 5G", 1299, "Médio",
        "256 GB, Dimensity 7060, câmera de 50 MP e bateria de 5200 mAh."],

    ["Motorola Moto G86 5G", 1699, "Médio",
        "Smartphone intermediário para aplicativos, fotos e entretenimento."],

    ["Motorola Edge 60 Pro", 2999, "Premium",
        "Smartphone da linha Edge com recursos avançados."],

    ["Motorola Razr 60 Ultra", 7999, "Premium",
        "Smartphone dobrável com tela externa e design compacto."],

    ["Xiaomi Redmi Note 14", 1099, "Básico",
        "128 GB, Helio G99 Ultra, câmera de 108 MP e bateria de 5500 mAh."],

    ["Xiaomi 15 Ultra", 6999, "Premium",
        "Smartphone de alto desempenho com sistema de câmeras Leica."],

    ["POCO X7 Pro", 2199, "Médio",
        "256 GB, Dimensity 8400 Ultra, tela AMOLED e bateria de 6000 mAh."],

    ["POCO F7", 2799, "Premium",
        "256 GB, Snapdragon 8s Gen 4, tela AMOLED e bateria de 6500 mAh."],

    ["Realme C75", 899, "Básico",
        "Smartphone voltado ao uso diário e à resistência."],

    ["Realme 14 Pro 5G", 2199, "Médio",
        "Smartphone intermediário com conectividade 5G."],

    ["OPPO Reno14 F 5G", 2999, "Premium",
        "Smartphone da linha Reno com recursos de fotografia."],

    ["Google Pixel 10", 4999, "Premium",
        "Smartphone Google com Android e recursos de inteligência artificial."],

    ["Google Pixel 10 Pro", 6999, "Premium",
        "Smartphone Google de categoria superior com recursos avançados."],

    ["Samsung Galaxy Z Fold7", 11999, "Premium",
        "Smartphone dobrável voltado à produtividade e multitarefa."],

    ["Samsung Galaxy Z Flip7", 6999, "Premium",
        "Smartphone dobrável compacto com tela externa."],

    ["Motorola Moto G15", 699, "Básico",
        "128 GB, Helio G81 Extreme, câmera de 50 MP e bateria de 5200 mAh."]
];

/* Elementos da página */

const $ = seletor => document.querySelector(seletor);

let categoria = "Todos";
let carrinho = [];

/* Formatação dos preços */

function moeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

/* Pesquisa sem diferenciação de acentos */

function normal(texto) {
    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
}

/* Caminho das imagens */

function foto(indice) {
    return `./assets/images/celulares/${indice}.jpg`;
}

/* Exibição dos produtos */

function render() {
    const termo = normal($("#busca").value);

    const lista = dados
        .map((produto, indice) => ({
            produto,
            indice
        }))
        .filter(({ produto }) =>
            (categoria === "Todos" ||
                produto[2] === categoria) &&
            normal(produto[0]).includes(termo)
        );

    $("#titulo").textContent =
        categoria === "Todos"
            ? "Todos os celulares"
            : categoria;

    $("#produtos").innerHTML = lista
        .map(({ produto, indice }) => `
            <article class="produto">

                <div class="imagem">
                    <img
                        class="foto"
                        src="${foto(indice)}"
                        alt="${produto[0]}"
                        loading="lazy"
                    >
                </div>

                <h2>${produto[0]}</h2>

                <p class="descricao">
                    ${produto[3]}
                </p>

                <button
                    class="detalhes"
                    data-info="${indice}">
                    Ver ficha técnica
                </button>

                <strong class="preco">
                    ${moeda(produto[1])}
                </strong>

                <span class="frete">
                    Frete grátis
                </span>

                <button
                    class="comprar"
                    data-id="${indice}">
                    Adicionar ao carrinho
                </button>

            </article>
        `)
        .join("");

    $("#vazio").hidden = lista.length > 0;
}

/* Janela de informações */

function modal(titulo, conteudo) {
    $("#modalTitulo").textContent = titulo;
    $("#conteudo").innerHTML = conteudo;
    $("#modal").showModal();
}

/* Filtro de categorias */

document.querySelectorAll("[data-cat]")
    .forEach(botao => {

        botao.onclick = () => {
            categoria = botao.dataset.cat;

            document.querySelector("details").open = false;

            render();
        };
    });

/* Pesquisa */

$("#busca").oninput = render;

/* Botão loja */

$("#loja").onclick = () => {
    categoria = "Todos";
    $("#busca").value = "";
    render();
};

/* Detalhes e adição ao carrinho */

$("#produtos").onclick = evento => {

    if (evento.target.matches("[data-info]")) {

        const indice = Number(evento.target.dataset.info);
        const produto = dados[indice];

        modal(produto[0], `
            <img
                src="${foto(indice)}"
                alt="${produto[0]}"
                style="width:100%;height:230px;object-fit:contain"
            >

            <p>${produto[3]}</p>

            <p>
                <strong>Categoria:</strong>
                ${produto[2]}
            </p>

            <p>
                <strong>Preço:</strong>
                ${moeda(produto[1])}
            </p>

            <p style="color:green">
                Frete grátis
            </p>

            <a
                target="_blank"
                rel="noopener"
                href="https://www.google.com/search?q=${encodeURIComponent(produto[0] + " ficha técnica fabricante")}">
                Consultar ficha técnica completa
            </a>
        `);
    }

    if (evento.target.matches("[data-id]")) {

        const indice = Number(evento.target.dataset.id);

        carrinho.push(dados[indice]);

        $("#total").textContent = carrinho.length;

        evento.target.textContent = "Adicionado!";

        setTimeout(() => {
            evento.target.textContent = "Adicionar ao carrinho";
        }, 1200);
    }
};

/* Carrinho de compras */

function mostrarCarrinho() {

    if (carrinho.length === 0) {
        modal("Carrinho", "Seu carrinho está vazio.");
        return;
    }

    const total = carrinho.reduce(
        (soma, produto) => soma + produto[1], 0
    );

    modal("Carrinho de compras", `
        ${carrinho.map((produto, indice) => `
            <p>
                ${produto[0]} — ${moeda(produto[1])}

                <button
                    data-remover="${indice}"
                    style="color:red">
                    Remover
                </button>
            </p>
        `).join("")}

        <hr>

        <strong>Total: ${moeda(total)}</strong>
    `);
}

$("#carrinho").onclick = mostrarCarrinho;

/* Remover produtos */

$("#conteudo").onclick = evento => {

    if (evento.target.matches("[data-remover]")) {

        const indice = Number(evento.target.dataset.remover);

        carrinho.splice(indice, 1);

        $("#total").textContent = carrinho.length;

        $("#modal").close();

        mostrarCarrinho();
    }
};

/* Cupons */

$("#cupons").onclick = () => {
    modal("Cupons", "Nenhum cupom disponível no momento.");
};

/* Notificações */

$("#avisos").onclick = () => {
    modal("Notificações", "Nenhuma notificação nova.");
};

/* Fechar janela */

$("#fechar").onclick = () => {
    $("#modal").close();
};

/* Iniciar catálogo */

render();
