const form = document.querySelector("#form-atleta");

const resposta = document.querySelector("#resposta");


const apiKey = "cv_smKHJEv3e4V8qLqAxJE4rw5B4wXZb38uBeLTMTKOXQw92z9onHUK1jzp8t6MfBYs";

const apiUrl = "https://api-ds.codeverse.dev.br/api/atletas"


form.addEventListener("submit", async function (event) {

  event.preventDefault();


  const dados = new FormData(form);


  const atleta = {
      title: dados.get("title"),
      esporte: dados.get("esporte"),
      pais: dados.get("pais"),
      idade: Number(dados.get("idade")), 
      conquistas: dados.get("conquistas"),
      imageUrl: dados.get("imageUrl") || null
  }

  resposta.textContent = "Enviando atleta para a API....";

  try {
    const respostaApi = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify(atleta),
    });

    const texto = await respostaApi.text();
    let resultado;

    try {
      resultado = texto ? JSON.parse(texto) : {};
    } catch (error) {
      resultado = error;
      return;
    }
    if(respostaApi.ok){
      resposta.textContent = `${resultado.title} foi cadastrado com sucesso.`;
      form.reset();
    }
    
  } catch (error) {
    console.error(error);
  }
})