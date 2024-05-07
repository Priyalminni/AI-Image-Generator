const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(cors());
app.use(express.json());

//app.listen(4000);

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);//instance where we can send request 

const generateImage = async (prompt) => {
  const response = await openai.createImage({
    prompt: prompt,
    n: 3,
    size: "512x512",
    response_format: "b64_json",
  });// resquest to call openai,resquest payload
//512x512 or 256x256
  const image1 = response.data.data[0].b64_json;
  const image2 = response.data.data[1].b64_json;
  const image3 = response.data.data[2].b64_json;
  return [image1, image2, image3];
};

app.post("/generateImage", async (req, res) => {
  const images = await generateImage(req.body.prompt);
  res.send({ images });
});
