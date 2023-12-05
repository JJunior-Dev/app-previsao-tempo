const chaveDaApi = "01f7a0acefa74cdcb1b01557232311";
const botaoDeBusca = document.querySelector(".btn-busca");

botaoDeBusca.addEventListener("click", async () => {
  const cidade = document.getElementById("input-busca").value;
  if (!cidade) return;
  const dados = await buscarDadosDaCidade(cidade);
  if (dados) preencherDadosNaTela(dados, cidade);
  document.getElementById("input-busca").value = ""
});

async function buscarDadosDaCidade(cidade) {
  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${chaveDaApi}&q=${cidade}&aqi=no&lang=pt`;
  const response = await fetch(apiUrl);
  if (response.status !== 200) return;
  const dados = response.json();
  return dados;
}

function preencherDadosNaTela(dados, cidade) {
  const city = dados.location.name;
  const temperatura = dados.current.temp_c;
  const condicao = dados.current.condition.text;
  const humidade = dados.current.humidity;
  const velocidadeDoVento = dados.current.wind_kph;
  const iconeCondicao = dados.current.condition.icon;

  document.getElementById("cidade").textContent = city;
  document.getElementById("temperatura").textContent = `${temperatura} °C`;
  document.getElementById("condicao").textContent = condicao;
  document.getElementById("humidade").textContent = `${humidade} %`;
  document.getElementById("velocidade-do-vento").textContent = `${velocidadeDoVento} Km/h`;
  document.getElementById("icone-condicao").setAttribute("src", iconeCondicao);
}
