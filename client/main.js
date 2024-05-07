const generateBtn = document.querySelector(".generate-btn");
const promptInput = document.querySelector(".prompt-input");
const generatedImage1 = document.querySelector(".generated-image1");
const generatedImage2 = document.querySelector(".generated-image2");
const generatedImage3 = document.querySelector(".generated-image3");
const downloadBtn = document.querySelector(".download-btn");

const showNotification = (message) => {
  alert(message);
};

const genImage = async () => {
  const prompt = promptInput.value;

  if (prompt) {
    try {
      generatedImage1.src = "images/generating.png";
      generatedImage2.src = "images/generating.png";
      generatedImage3.src = "images/generating.png";

      const response = await fetch("https://ai-image-generator-m3ww.onrender.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: prompt }),
      });

      const data = await response.json();
      // const base64Image1 = data.images[0];
      // const base64Image2 = data.images[1];
      // const base64Image3 = data.images[2];
      generatedImage1.src = `data:image/png;base64,${data.images[0]}`;
      generatedImage2.src = `data:image/png;base64,${data.images[1]}`;
      generatedImage3.src = `data:image/png;base64,${data.images[2]}`;

      downloadBtn.href = `data:image/png;base64,${data.images[0]}`;
      downloadBtn.href = `data:image/png;base64,${data.images[1]}`;
      downloadBtn.href = `data:image/png;base64,${data.images[2]}`;
    } catch (error) {
      console.log(error);
      showNotification("The image could not be generated.");
      generatedImage1.src = "images/image-placeholder1.png";
      generatedImage2.src = "images/image-placeholder2.png";
      generatedImage3.src = "images/image-placeholder3.png";
    }
  } else {
    showNotification("Please enter the prompt");
  }
};

generateBtn.addEventListener("click", genImage);
