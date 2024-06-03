/** @format */

"use strict";

async function fetchJoke() {
  try {
    const res = await fetch("https://icanhazdadjoke.com/", {
      headers: {
        Accept: "text/plain",
      },
    });

    const joke = await res.text();
    return joke;
  } catch (error) {
    console.log(error);
    return null;
  }
}

(async () => {
  const buttonElement = document.getElementById("playBtn");
  const audioElement = document.getElementById("audio");

  audioElement.addEventListener("ended", () => {
    buttonElement.classList.remove("disable");
  });

  buttonElement.addEventListener("click", async () => {
    buttonElement.classList.add("disable");

    const jokeString = await fetchJoke();

    const url = `https://api.voicerss.org/?key=a9221f2676e4486890758f48f26719be&src=${jokeString}&hl=en-us&r=0&c=mp3&f=44khz_16bit_stereo&ssml=false`;
    audioElement.src = url;
    audioElement.play();
  });
})();
