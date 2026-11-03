const resposta = document.querySelector("#resposta");
const lista = document.querySelector("#lista-atletas");
const modelo = document.querySelector("#modelo-atleta");


const apiKey = "cv_smKHJEv3e4V8qLqAxJE4rw5B4wXZb38uBeLTMTKOXQw92z9onHUK1jzp8t6MfBYs";

const apiUrl = "https://api-ds.codeverse.dev.br/api/atletas";

async function buscarAtletas() {

  //Mostra uma msg.
  resposta.textContent="Carregando atletas..."
  
  try {
    //Fazer o get
    const retorno = await fetch(apiUrl, {
      method: "GET",
      headers: {"x-api-key" : apiKey},
    });
    
    //Verificar se não deu certo
    if(!retorno.ok){
      throw new Error("Não foi possível carregar os atletas.");
    }

    // Converter o resultado para JSON, pois será um objeto.
    const resultado = await retorno.json();

    //Percorrer todos os atletas que esta dentro de resultado.
    for (const atleta of resultado.data){
      
      //fazer uma copia do modelo que criamos no html
      const card = modelo.content.cloneNode(true);

      //preecher cada item desse card

      card.querySelector(".nome").textContent = atleta.nome;
      card.querySelector(".esporte").textContent = atleta.esporte;
      card.querySelector(".pais").textContent = atleta.pais;
      card.querySelector(".idade").textContent = atleta.idade;  
      card.querySelector(".conquistas").textContent = atleta.conquistas;

      const imagem = card.querySelector(".imagem-atleta");

      if (atleta.imageUrl){
        imagem.src = atleta.imageUrl;
        imagem.alt = atleta.nome;
        
        imagem.onerror = () => imagem.remove();
        
      } else {
        imagem.remove();
      }

      // adiciona o card preenchido na tela

      lista.appendChild(card);
      resposta.textContent = "";

    }

  } catch (error) {
    console.error(error);
    resposta.textContent= "Não foi possível carregar os atletas. Tente novamente!" 
  }
}

// Executar no arquivo

buscarAtletas();