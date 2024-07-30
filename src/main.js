import '/style.css'

document.querySelector('#app').innerHTML = `
   <div class="container">
    <img
      src="https://raw.githubusercontent.com/luiabdiel/img-cdn-algoleve/main/algoleve.jpeg"
      alt="image">
    <form class="container-text">
      <h2>Falta pouco!!</h2>
      <p>Para ter acesso ao guia prático "Vista bem o corpo que tem" e aprender quais roupas proporcionam um equilíbrio à sua imagem de acordo com o seu peso visual, deixe a AlgoLeve te conhecer um pouco mais 👇📭</p>
        <label>
        <span>Nome*</span>
        <input type="text" name="name" placeholder="Digite seu nome">
      </label>
      <label>
        <span>Email*</span>
        <input type="email" name="email" placeholder="Digite seu melhor email">
      </label>
      <label>
        <span class="span-select">Deseja ser notificado sobre novidades?</span>
        <select name="notifications">
        <option value="true">Sim</option>
        <option value="false">Não</option>
        </select>
      </label>
      <button type="submit">
         Pegue seu guia prático 🎁💮
      </button>
    </form>
  </div>
`;

const KEY = import.meta.env.VITE_SHEETMONKEY_API_KEY;
const LINK_DOWNLOAD = import.meta.env.VITE_LINK_DOWNLOAD;
const SHEETMONKEY_URL = import.meta.env.VITE_SHEETMONKEY_URL;

const downloadFile = (url) => {
  const link = document.createElement("a");

  link.href = url; 
  link.setAttribute("download", "Elegância_das_cores.pdf");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const handleSubmit = (event) => {
  event.preventDefault();

  const form = event.target;
  const button = form.querySelector("button");

  const nameInput = form.querySelector("input[name=name]");
  const emailInput = form.querySelector("input[name=email]");
  const notificationsSelect = form.querySelector("select[name=notifications]");

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const notifications = notificationsSelect.value === "true" ? "Sim" : "Não";

  if (name.length < 3) {
    alert("O nome deve ter pelo menos 3 caracteres");

    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Email inválido");

    return;
  }

  button.disabled = true;
  button.innerHTML = `<div class="loading"></div>Enviando...`;

  fetch(SHEETMONKEY_URL + KEY, {
    method: "POST",
    headers: {
      "accept": "application/json",
      "content-type": "application/json"
    },
    body: JSON.stringify({ name, email, notifications })
  }).then(res => {
    button.innerHTML = `Download concluído 🎉`;
    button.disabled = false;

    const fileUrl = LINK_DOWNLOAD;

    downloadFile(fileUrl);
  }).catch(err => {
    alert("Ocorreu um erro ao enviar o formulário. Por favor, tente novamente mais tarde.");

    button.innerHTML = `Pegue seu ebook🎁💮`;
    button.disabled = false;
  });
};

document.querySelector("form").addEventListener("submit", handleSubmit);