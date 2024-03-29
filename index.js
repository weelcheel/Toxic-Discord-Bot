const Discord = require('discord.js');
const Youtube = require('youtube-audio-stream');
const Decoder = require('lame').Decoder
const {
    token,
} = require('./configs/secure/auth.json');

//const Speaker = require('speaker')

const bot = new Discord.Client();

let currentConnection = null;
let currentVoiceChannel = null;

bot.on('ready', () => {
    console.log('hello');
});

bot.on('message', message => {
    console.log(message.content);

    if (message.content.toLowerCase().indexOf('!play') >= 0) {
        let url = message.content.substring(message.content.toLowerCase().indexOf('!play') + '!play '.length);
        let player = null;
        try {
            player = Youtube(url);

            if (player) {
                let voiceChannel = message.member.voiceChannel;
                voiceChannel.join().then(connection => {
                    let decoder = Decoder();
                    player.pipe(decoder);
    
                    connection.playConvertedStream(decoder);
                    currentConnection = connection;
                    currentVoiceChannel = voiceChannel;
                });
            }
        }
        catch (exception) {
            console.log(exception);
            message.channel.send('Unable to play this video.');
            return;
        }
    }

    if (message.content.toLowerCase() === '!stop' && currentConnection &&  currentConnection.dispatcher) {
        currentConnection.dispatcher.end();
        if (currentVoiceChannel) {
            currentVoiceChannel.leave();
        }
    }

    if (message.content.toLowerCase() === 'seth is') {
        message.channel.send('malding');
    }
});

bot.login(token);