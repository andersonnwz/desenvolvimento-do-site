const celulares = [
    {
        nome: "Samsung Galaxy S26 5G, 256GB, 12GB RAM",
        preco: "R$ 4.299",
        frete: "Frete grátis",
        imagem: ""
    },
    {
        nome: "iPhone 17 Pro Max 2TB - Laranja-cósmico",
        preco: "R$ 12.799",
        frete: "Frete grátis",
        imagem: ""
    },
    {
        nome: "Smartphone Motorola Moto G35 5G - 256GB",
        preco: "R$ 1.001",
        frete: "Frete grátis",
        imagem: ""
    },
    {
        nome: "Xiaomi Redmi Note 14 Pro 5G 256GB / 8GB",
        preco: "R$ 1.808",
        frete: "Frete grátis",
        imagem: ""
    },
    {
        nome: "Samsung Galaxy A35 5G 128GB Azul",
        preco: "R$ 1.630",
        frete: "Frete grátis",
        imagem: ""
    },
    {
        nome: "iPhone 17e 256GB Branco",
        preco: "R$ 4.299",
        frete: "Frete grátis",
        imagem: ""
    },
    {
        nome: "Smartphone Motorola Edge 70 Fusion 5G",
        preco: "R$ 2.249",
        frete: "Frete grátis",
        imagem: ""
    },
    {
        nome: "Celular Samsung Galaxy A57 5G 256GB",
        preco: "R$ 2.399",
        frete: "Frete grátis",
        imagem: ""
    },
    {
        nome: "Celular Simples Abre e Fecha Flip Positivo",
        preco: "R$ 299",
        frete: "Frete grátis",
        imagem: ""
    },
    {
        nome: "Smartphone OPPO A6t 128GB 12GB RAM",
        preco: "R$ 799",
        frete: "Frete grátis",
        imagem: ""
    },
    {
        nome: "Samsung Galaxy A56 5G 256GB",
        preco: "R$ 2.199",
        frete: "Frete grátis",
        imagem: ""
    },
    {
        nome: "Xiaomi Poco X7 Pro 5G 512GB",
        preco: "R$ 2.450",
        frete: "Frete grátis",
        imagem: ""
    }
];

const grade = document.getElementById("grade-celulares");

function renderizarCelulares(lista) {
    grade.innerHTML = "";

    lista.forEach((celular) => {
        const card = document.createElement("div");
        card.classList.add("card-celular");

        card.innerHTML = `
            <div class="card-imagem-box">
                <img src="${celular.imagem}" alt="${celular.nome}">
            </div>
            <div>
                <h3 class="card-nome" title="${celular.nome}">${celular.nome}</h3>
                <p class="card-preco">${celular.preco}</p>
                <span class="card-frete">${celular.frete}</span>
            </div>
        `;

        grade.appendChild(card);
    });
}

renderizarCelulares(celulares);