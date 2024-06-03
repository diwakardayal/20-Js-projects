/** @format */

let imgCounter = 0
let count = 30;
const apiKey = "VEgDzzDsLPceG2NeIPfXt_KB48AQ-LC4KtBb2ABLny0";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

async function fetchImage() {
  try {
    const res = await fetch(apiUrl);
    return await res.json();
 
  } catch (e) {
    console.log(e);
  }
}
 
async function displayImage(imgData) {
  const imgContainer = document.querySelector(".image_container");

  for (const data of imgData) {
    imgCounter = imgCounter + 1
    const anchorElement = document.createElement("a");
    const imgElement = document.createElement("img");
    imgElement.src = data.url;
    imgElement.width = 400;
    anchorElement.appendChild(imgElement);
    imgContainer.appendChild(anchorElement);
  }
}

(async () => {
  let imagesData = await fetchImage();

  let filteredImageData = imagesData.map((d) => {
    return { url: d.urls.raw, dc: d.alt_description };
  });

  displayImage(filteredImageData);
  window.addEventListener("scroll", async () => {
    const totalHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    // Calculate 70% of the document's total height
    const seventyPercentHeight = totalHeight * 0.8;

    // Check if the current scroll position is at least 70% of the document's total height
    if (window.scrollY >= seventyPercentHeight && imgCounter === count) {
      // fetch n insert
      imagesData = await fetchImage();

      filteredImageData = imagesData.map((d) => {
        return { url: d.urls.raw, dc: d.alt_description };
      });

      displayImage(filteredImageData);
      imgCounter=0
    }
  });
})();
