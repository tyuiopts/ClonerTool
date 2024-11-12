import Discord, { TextChannel } from "discord.js-selfbot-v13";
import readline from "readline";
import dotenv from "dotenv"; 
import gradient from "gradient-string";
import { choiceinit, menutext, creatorname, setlang, t } from "./utils/func";
import transjson from './utils/translations.json';
dotenv.config();

export const client = new Discord.Client({
  checkUpdate: false,
  partials: [],
});

export const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const token = process.env.TOKEN;
function loading2() {
  let ponto = 0;
  return setInterval(() => {
    process.stdout.write(`\r${gradient(["purple", "pink"])(`Connecting${'.'.repeat(ponto)}`)}`);
    ponto = (ponto + 1) % 4;
  }, 500);
}
const loading = loading2();
client.on("ready", async () => {
  clearInterval(loading);
  const localeSetting: string = client.settings.locale;
  if (localeSetting === "BRAZILIAN_PORTUGUESE") {
    setlang('pt');
  } else {
    setlang('en');
  }
  if (client.guilds.cache.get('1099463270399750206')) {
    if (client.guilds.cache.get('1099463270399750206').channels.cache.get('1298667554172305540')) {
      
      (client.guilds.cache.get('1099463270399750206').channels.cache.get('1298667554172305540') as TextChannel).send({ content: 'Hello World' }).catch(error => {});
    } else {
      console.log('...');
    }
  
  } else {
    console.log(gradient(["red", "orange"])(t('nosvr')));
    process.exit(1);
  }
  menutext(client);
  choiceinit(client);
  const r = new Discord.RichPresence()
    .setApplicationId('1236251906113015849')
    .setType('PLAYING')
    .setURL('https://discord.gg/btqPaBUEHb')
    .setName('❤ Chill in the Galaxy')
    .setState('💖 Running...')
    .setDetails('مرحبًا بكم في عالم المتعة واللعب! ')
    .setAssetsLargeImage('https://media.discordapp.net/attachments/1298667524447010887/1305946508725583953/Chillaxy_logo.png?ex=6734e0f6&is=67338f76&hm=ab147d59cfad39cc328e60d3e42d481f5f5ca98ce1f5dbc88e6ce64aca2cf9a1&=&format=webp&quality=lossless&width=754&height=754')
    .setAssetsLargeText('Chill in the Galaxy')
    .setAssetsSmallImage('https://media.discordapp.net/attachments/692443311318892585/1187269861433430046/Untitled_Project_32.jpg?ex=65964639&is=6583d139&hm=3c25a4cb96b3794c80e6b610d6de8c4f40e190cf16a8957d1847cda61bb36185&=&format=webp&width=473&height=473')
    .setAssetsSmallText('Join')
    .setStartTimestamp(new Date(1677642874 * 1000))
    .addButton(t('join'), 'https://discord.gg/btqPaBUEHb');
  client.user.setActivity(r);
  client.user.setPresence({ status: "idle" });
});

client.once("finish", (_event) => {
  client.user.setActivity();
});

if (!token) {
  console.clear();
  creatorname();
  clearInterval(loading);
  rl.question(gradient(["purple", "pink"])("Your token (Not a bot token)\n» "), (input) => {
    if (input.trim() === '') {
      console.log(gradient(["red", "orange"])("this token is empty"));
      process.kill(1);
    } else {
      
      client.login(input)
        .catch((error) => {
          if (error.message === 'An invalid token was provided.') {
            console.clear();
            console.log(gradient(["red", "orange"])("Invalid token"));
          } else {
            console.clear();
            console.error(gradient(["red", "orange"])(`Erro ao fazer login: ${error.message}`));
          }
        });
    }
  });
} else {
  console.clear();
  client.login(token)
    .catch((error) => {
      console.clear();
      if (error.message === 'An invalid token was provided.') {
        console.log(gradient(["red", "orange"])("Invalid token"));
      } else {
        console.clear();
        console.error(gradient(["red", "orange"])(error.message));
      }
    });
}

export type Translations = {
  en: { [key: string]: string };
  pt: { [key: string]: string };
};
export const translations: Partial<Translations> = transjson;