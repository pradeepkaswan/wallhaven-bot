import pkg from "request";
import dotenv from "dotenv";

const { get } = pkg

dotenv.config()

function getWallpaper(param) {
  const url =
    "https://wallhaven.cc/api/v1/search?apikey=" +
    process.env.WALLHAVEN_API_KEY +
    "&q=" +
    param +
    "&categories=111&purity=111&sorting=random&order=desc&ratios=16x9&page=1";
    console.log(url);

  let img_url

  get(url, (error, _, body) => {
    if (error) {
      console.error(error);
    } else {
      try {
        const json = JSON.parse(body);
        console.log(json);
        img_url = json.data[0].path;
        console.log(img_url);
      } catch (e) {
        console.error(e);
      }
    }
  });

  return img_url;
}

getWallpaper("chainsaw man");
