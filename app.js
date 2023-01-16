const btn = document.querySelector(".btn");
const content = document.querySelector(".content");
const iconAudio = document.querySelector("img");
const audio = document.querySelector("audio");
let h2 = document.querySelector("h2");

btn.addEventListener("click", async (e) => {
  e.preventDefault();
  let input = document.querySelector("input").value;
  try {
    let response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${input}`
    );
    let data = await response.json();
    h2.textContent = data[0].word;
    h2.classList.remove("d-none");
    iconAudio.classList.remove("d-none");
    content.innerHTML = `
      <p>${
        data[0].phonetic + "--" + data[0].meanings[0].partOfSpeech
      }</p><i class="fa-sharp fa-solid fa-volume"></i>
      
      <p>${data[0].meanings[0].definitions[0].definition}</p>`;

    iconAudio.addEventListener("click", () => {
      audio.src = data[0].phonetics[0].audio;
    });
  } catch {
    content.innerHTML = `<div class="alert alert-danger" role="alert">
        Sorry, Word not found!🙁
      </div>`;

    setTimeout(() => {
      content.innerHTML = "";
    }, 3000);
  }
});
