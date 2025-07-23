const chaveDaApi = "cd31863ae267407cb01212131232011";

const botaoDeBusca = document.querySelector(".btn-busca");

botaoDeBusca.addEventListener("click", async () => {
  const cidade = document.getElementById("input-busca").value.trim();

  if (!cidade) return;

  const dados = await buscarDadosDaCidade(cidade);

  if (dados) preencherDadosNaTela(dados, cidade);
});

async function buscarDadosDaCidade(cidade) {
  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${chaveDaApi}&q=${cidade}&aqi=no&lang=pt`;

  try {
    const resposta = await fetch(apiUrl);
    if (!resposta.ok) throw new Error("Erro na resposta da API");
    const dados = await resposta.json();
    return dados;
  } catch (erro) {
    alert("Cidade não encontrada ou erro na API.");
    return null;
  }
}

function preencherDadosNaTela(dados, nomeDigitado) {
  const temperatura = dados.current.temp_c;
  const condicao = dados.current.condition.text;
  const humidade = dados.current.humidity;
  const vento = dados.current.wind_kph;
  const sensacao = dados.current.feelslike_c;
  const icone = "https:" + dados.current.condition.icon;
  const chuva = dados.current.precip_mm;

  const cidadeFormatada = nomeDigitado
    .toLowerCase()
    .split(" ")
    .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1))
    .join(" ");

  document.getElementById("cidade").textContent = cidadeFormatada;
  document.getElementById("temperatura").textContent = `${temperatura}°`;
  document.getElementById("condicao").textContent = condicao;
  document.getElementById("humidade").textContent = `${humidade}%`;
  document.getElementById("vento").textContent = `${vento} km/h`;
  document.getElementById("sensacao").textContent = `${sensacao}°C`;
  document.getElementById("icone-condicao").src = icone;
  document.getElementById("icone-condicao").alt = condicao;
  document.getElementById("chuva").textContent = `${chuva} mm`;
}