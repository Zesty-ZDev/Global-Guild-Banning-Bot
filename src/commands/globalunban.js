const {
    EmbedBuilder,
    ButtonBuilder,
    ActionRowBuilder,
    PermissionsBitField,
    PermissionFlagsBits
  } = require("discord.js");
  const {
    SlashCommandBuilder
  } = require("@discordjs/builders");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("globalunban")
      .setDescription("Remove the Global Ban for the specified user across all associated servers")
      .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
      .setDMPermission(false)
      .addUserOption(option =>
        option.setName('user')
        .setDescription('The user to global UnBan')
        .setRequired(true)),
  
  
  
  
    run: async (client, interaction) => {
        var Target = interaction.options.getUser('user')

        client.guilds.cache.forEach(async (guild) => {
        guild.members.unban(Target)
          .catch(() => console.log(`Could not UnBan user in ${guild.name}`))
        })
  

          let UnBanSuccess = new EmbedBuilder()
            .setAuthor({
              name: `${client.user.username} | Z-Dev `,
              iconURL: 'https://cdn.discordapp.com/attachments/712226602674552852/1084004801500688394/Z-Dev-Logo.gif'
            })
            .setDescription(`**Global Un-Banned :**  ${Target.username}#${Target.discriminator} \n **Discord ID :** ${Target.id}\n**Discord :** <@${Target.id}> \n\n *Un-Banned From ${client.guilds.cache.size} guilds*`)
            .setThumbnail(`https://cdn.discordapp.com/avatars/${Target.id}/${Target.avatar}.webp`)
            .setColor(0x65a4d8)
            .setImage('https://cdn.discordapp.com/attachments/712226602674552852/1083997852142936115/Z-Dev-Banner-opt.gif')
            .setFooter({
              text: 'Developed by Z-Dev',
              iconURL: 'https://cdn.discordapp.com/attachments/712226602674552852/1084004801500688394/Z-Dev-Logo.gif'
            });
          let button = new ActionRowBuilder()
            .addComponents(
              new ButtonBuilder()
              //.setCustomId('')
              .setLabel('Z-Dev Github')
              .setEmoji('1083979315328335944')
              .setURL('https://github.com/Zesty-ZDev')
              .setStyle('Link'),
            );
  
            interaction.reply({
                embeds: [UnBanSuccess],
                components: [button],
                ephemeral: true
              })
  }};
