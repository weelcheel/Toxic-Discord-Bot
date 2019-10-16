const Discord = require('discord.js');
const bot = new Discord.Client();

bot.on('ready', () => {
    console.log('hello');
});

bot.on('message', message => {
    console.log(message.content);
    if (message.content.toLowerCase() === 'seth is') {
        message.reply('malding');
        
        var voiceChannel = message.member.voiceChannel;
        voiceChannel.join().then(connection => {
            setTimeout(() => {
                voiceChannel.leave();
            }, 5000);
        });
    }
});

bot.login('NjM0MTU5ODAzOTcwNzQ4NDM3.XaemhA.OOYzeYW2O55urAU1UatmT_URsO0');