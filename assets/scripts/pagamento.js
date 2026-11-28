document.addEventListener("DOMContentLoaded", () => {
  // Produtos padrão caso a página seja aberta diretamente sem passar pelo carrinho
  const produtosDemonstracao = [
    {
      id: "pos-p51",
      nome: "Celular Simples Abre E Fecha De Teclado Positivo P51 4g",
      specs: "128GB • 8GB • Frete grátis",
      preco: 299.00,
      quantidade: 1,
      imagem: "../images/celular-positivo.png"
    },
    {
      id: "moto-g35",
      nome: "Smartphone Motorola Moto G35 5G",
      specs: "256GB • 8GB • Frete grátis",
      preco: 1630.00,
      quantidade: 1,
      imagem: "../images/moto-g35.png"
    }
  ];

  // Carrega os produtos escolhidos pelo usuário no localStorage (ou usa os de demonstração)
  let produtosSelecionados = JSON.parse(localStorage.getItem("carrinhoSmartCell")) || produtosDemonstracao;

  const listaContainer = document.getElementById("lista-produtos-checkout");
  const contadorItens = document.getElementById("contador-itens");
  const subtotalEl = document.getElementById("subtotal-valor");
  const totalEl = document.getElementById("total-valor");
  const valorQrEl = document.getElementById("valor-qr");
  const selectParcelas = document.getElementById("parcelas-cartao");
  const mensagemErro = document.getElementById("mensagem-erro");

  function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  function atualizarParcelas(total) {
    selectParcelas.innerHTML = "";
    const maxParcelas = 6;
    for (let i = 1; i <= maxParcelas; i++) {
      const valorParcela = formatarMoeda(total / i);
      const option = document.createElement("option");
      option.value = i;
      option.textContent = `${i}x de ${valorParcela} sem juros`;
      selectParcelas.appendChild(option);
    }
  }

  function renderizarProdutos() {
    listaContainer.innerHTML = "";
    let total = 0;
    let totalUnidades = 0;

    if (produtosSelecionados.length === 0) {
      listaContainer.innerHTML = `
        <div class="carrinho-vazio-aviso">
          Nenhum celular selecionado no momento. Volte à loja para escolher um aparelho.
        </div>
      `;
      contadorItens.textContent = "0 itens no pedido";
      subtotalEl.textContent = formatarMoeda(0);
      totalEl.textContent = formatarMoeda(0);
      valorQrEl.textContent = formatarMoeda(0);
      atualizarParcelas(0);
      return;
    }

    produtosSelecionados.forEach((item, index) => {
      total += item.preco * item.quantidade;
      totalUnidades += item.quantidade;

      const card = document.createElement("div");
      card.className = "produto-box";
      card.innerHTML = `
        <img src="${item.imagem}" alt="${item.nome}" onerror="this.src='../images/celular-positivo.png'">
        <div class="produto-detalhes">
          <p class="produto-nome">${item.nome}</p>
          <p class="produto-specs">${item.specs || "Frete grátis"}</p>
          <div class="produto-rodape">
            <span class="produto-preco">${formatarMoeda(item.preco * item.quantidade)}</span>
            <div class="controle-qtd">
              <button type="button" class="btn-qtd" data-acao="diminuir" data-index="${index}">-</button>
              <span class="qtd-numero">${item.quantidade}</span>
              <button type="button" class="btn-qtd" data-acao="aumentar" data-index="${index}">+</button>
            </div>
          </div>
        </div>
      `;
      listaContainer.appendChild(card);
    });

    contadorItens.textContent = `${totalUnidades} ${totalUnidades === 1 ? "item selecionado" : "itens selecionados"}`;
    subtotalEl.textContent = formatarMoeda(total);
    totalEl.textContent = formatarMoeda(total);
    valorQrEl.textContent = formatarMoeda(total);
    atualizarParcelas(total);

    // Salva qualquer alteração de quantidade feita no checkout
    localStorage.setItem("carrinhoSmartCell", JSON.stringify(produtosSelecionados));
  }

  // Botões de + e - para ajustar quantidade do produto escolhido
  listaContainer.addEventListener("click", (e) => {
    if (!e.target.classList.contains("btn-qtd")) return;

    const index = Number(e.target.dataset.index);
    const acao = e.target.dataset.acao;

    if (acao === "aumentar") {
      produtosSelecionados[index].quantidade += 1;
    } else if (acao === "diminuir") {
      if (produtosSelecionados[index].quantidade > 1) {
        produtosSelecionados[index].quantidade -= 1;
      } else {
        produtosSelecionados.splice(index, 1);
      }
    }

    renderizarProdutos();
  });

  // Renderiza a lista assim que a página abre
  renderizarProdutos();

  // =========================================
  // LÓGICA DAS FORMAS DE PAGAMENTO
  // =========================================
  const checkboxes = document.querySelectorAll('input[name="formaPagamento"]');
  const cardsOpcao = document.querySelectorAll(".opcao-card");

  const paineisExtras = {
    boleto: document.getElementById("info-boleto"),
    cartao: document.getElementById("dados-cartao"),
    outra: document.getElementById("info-outra")
  };

  const btnGerar = document.getElementById("btn-gerar-pagamento");
  const btnVoltar = document.getElementById("btn-voltar");
  const btnCopiarPix = document.getElementById("btn-copiar-pix");
  const telaPagamento = document.getElementById("tela-pagamento");
  const telaQrcode = document.getElementById("tela-qrcode");

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      mensagemErro.textContent = "";
      cardsOpcao.forEach((card) => card.classList.remove("selecionada"));
      Object.values(paineisExtras).forEach((painel) => painel.classList.add("oculto"));

      if (checkbox.checked) {
        checkboxes.forEach((outro) => {
          if (outro !== checkbox) outro.checked = false;
        });

        checkbox.closest(".opcao-card").classList.add("selecionada");
        if (paineisExtras[checkbox.value]) {
          paineisExtras[checkbox.value].classList.remove("oculto");
        }
      }
    });
  });

  btnGerar.addEventListener("click", () => {
    if (produtosSelecionados.length === 0) {
      mensagemErro.textContent = "Adicione pelo menos um celular antes de gerar o pagamento.";
      return;
    }

    const selecionado = document.querySelector('input[name="formaPagamento"]:checked');
    if (!selecionado) {
      mensagemErro.textContent = "Por favor, selecione uma forma de pagamento.";
      return;
    }

    if (selecionado.value === "cartao") {
      const numero = document.getElementById("numero-cartao").value.replace(/\s/g, "");
      const nome = document.getElementById("nome-cartao").value.trim();
      const validade = document.getElementById("validade-cartao").value.trim();
      const cvv = document.getElementById("cvv-cartao").value.trim();

      if (numero.length < 16 || nome === "" || validade.length < 5 || cvv.length < 3) {
        mensagemErro.textContent = "Preencha corretamente todos os dados do cartão.";
        return;
      }

      alert(`Pagamento aprovado no cartão em ${selectParcelas.value}x!`);
      localStorage.removeItem("carrinhoSmartCell");
      return;
    }

    if (selecionado.value === "outra") {
      const vale = document.getElementById("codigo-vale").value.trim();
      if (vale === "") {
        mensagemErro.textContent = "Informe o código do cupom ou vale-presente.";
        return;
      }
    }

    telaPagamento.classList.add("oculto");
    telaQrcode.classList.remove("oculto");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  btnCopiarPix.addEventListener("click", () => {
    const inputPix = document.getElementById("codigo-pix");
    inputPix.select();
    navigator.clipboard.writeText(inputPix.value);
    btnCopiarPix.textContent = "Copiado!";
    setTimeout(() => {
      btnCopiarPix.textContent = "Copiar";
    }, 2000);
  });

  btnVoltar.addEventListener("click", () => {
    telaQrcode.classList.add("oculto");
    telaPagamento.classList.remove("oculto");
  });
});