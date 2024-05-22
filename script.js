const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function loadImage(image) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = image.url;
    img.onload = () => {
      console.log(`Image loaded: ${image.url}`);
      resolve(img);
    };
    img.onerror = () => {
      console.error(`Failed to load image: ${image.url}`);
      reject(new Error(`Failed to load image's URL: ${image.url}`));
    };
  });
}

btn.addEventListener("click", () => {
  console.log("Button clicked");
  const imagePromises = images.map(loadImage);

  Promise.all(imagePromises)
    .then(loadedImages => {
      output.innerHTML = ''; // Clear previous content
      loadedImages.forEach(img => {
        console.log(`Appending image: ${img.src}`);
        output.appendChild(img);
      });
    })
    .catch(error => {
      console.error(error.message);
      output.innerHTML = `<p style="color: red;">${error.message}</p>`;
    });
});


