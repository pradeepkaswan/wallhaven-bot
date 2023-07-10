const request = require('request');

const wallhaven_key = require('./config.json').wallhaven_key;

function getWallpaper(param) {
    const url =
        'https://wallhaven.cc/api/v1/search?apikey=' +
        wallhaven_key +
        '&q=' +
        param +
        '&categories=111&purity=111&sorting=random&order=desc&ratios=16x9&page=1';

    let img_url =
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.explicit.bing.net%2Fth%3Fid%3DOIP.3sjrY_teUZPxvSCF4HbI8AHaFu%26pid%3DApi&f=1&ipt=849d595171a4783df3c6ac030e847e36241d7335d59d80599cf73ef3ea2c45e3&ipo=images';

    request.get(url, (error, response, body) => {
        if (error) {
            console.error(error);
        } else {
            try {
                const json = JSON.parse(body);
                img_url = json.data[0].path;
                console.log(img_url);
            } catch (e) {
                console.error(e);
            }
        }
    });
    return img_url;
}

getWallpaper('chainsaw man');
