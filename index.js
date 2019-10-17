const Discord = require('discord.js');
const Youtube = require('youtube-audio-stream');
const Decoder = require('lame').Decoder
//const Speaker = require('speaker')

const bot = new Discord.Client();

bot.on('ready', () => {
    console.log('hello');
});

bot.on('message', message => {
    console.log(message.content);

    let index = message.content.toLowerCase().indexOf('!play');
    if (index >= 0) {
        let url = message.content.substring(index + '!play '.length);
        console.log(url);

        let voiceChannel = message.member.voiceChannel;
        voiceChannel.join().then(connection => {
            let decoder = Decoder();
            Youtube(url).pipe(decoder);

            connection.playConvertedStream(decoder);
        });
    }
});

bot.login('NjM0MTU5ODAzOTcwNzQ4NDM3.XaewWQ.VNncZKV7de8W4T-xvaiZ3o8cuIE');