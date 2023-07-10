import { Client, GatewayIntentBits } from "discord.js";
import { get } from "request";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const request = require("request");

const token = require("./config.json").token;
const wallhaven_key = require("./config.json").wallhaven_key;

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("with JavaScript", { type: "PLAYING" });
});

const prefix = "!";

client.on("messageCreate", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === "wallpaper") {
    const param = args.join(" ");
    const url =
      "https://wallhaven.cc/api/v1/search?apikey=" +
      wallhaven_key +
      "&q=" +
      param +
      "&categories=111&purity=110&sorting=random&order=asc&ratios=16x9&page=1&atleast=1920x1080";

    get(url, (error, response, body) => {
      if (error) {
        console.error(error);
      } else {
        try {
          const json = JSON.parse(body);
          img_url = json.data[0].path;
          message.channel.send(img_url);
        } catch (e) {
          console.error(e);
        }
      }
    });
  }
});

client.login(token);
