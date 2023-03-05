const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

// disable / enable button
function toggleButton() {
  button.disabled = !button.disabled;
}

// passing joke to VoiceRSS Api
function tellMe(joke) {
  VoiceRSS.speech({
    key: "3fb11ae59cf1461987d517cfba6aac32",
    src: joke,
    hl: "en-in",
    v: "Eka",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

// Get joke from joke api
async function getJokes() {
  let joke = "";
  const apiUrl =
    "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    // text-to-spech
    tellMe(joke);
    //disable button
    toggleButton();
  } catch (error) {
    // error here
    console.log("whoops! ", error);
  }
}

button.addEventListener("click", getJokes);

audioElement.addEventListener("ended", toggleButton);
