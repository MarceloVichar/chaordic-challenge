const ul = document.getElementById("products");
let url =
  "https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=1";

const formatValue = (value) =>
  value.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });

const req = async () => {
  const response = await fetch(url);
  const { nextPage, products } = await response.json();
  url = `https://${nextPage}`;

  ul.innerHTML += products
    .map(
      ({ description, image, price, name, oldPrice, installments }) => ` <div>
    <img src="${image}" alt="Imagem">
    <h2>${name}</h2>
    <p>${description}</p>
    <p>De: ${formatValue(oldPrice)}</p>
    <h3>Por: ${formatValue(price)}</h3>
    <p>ou ${installments.count} x de: ${formatValue(installments.value)}</p>
    <button>Comprar</button>
</div>`
    )
    .join("");
};

req();

const handleClick = () => req();
