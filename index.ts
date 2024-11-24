import { Client, EmbedBuilder } from "discord.js";
import translate from "@iamtraction/google-translate";

const client = new Client({
  intents: ["MessageContent"],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isContextMenuCommand()) return;
  if (!interaction.isMessageContextMenuCommand()) return;

  if (!["Translate", "Translate for me"].includes(interaction.commandName)) return;
  const personalTranslate = interaction.commandName === "Translate for me";
  const toLang = personalTranslate ? interaction.locale.split("-")[0] : "en";

  const message = interaction.targetMessage;
  const content = message.content;
  if (!content) return;
  try {
    const translated = await translate(content, { to: toLang });

    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription(translated.text)
          .setAuthor({
            name: message.author.tag,
            iconURL: message.author.avatarURL() ?? "",
          })
          .setFooter({
            text: `${translated.from.language.iso} ➡️ ${toLang}`,
          }),
      ],
      ephemeral: personalTranslate,
    });
  } catch (e) {
    await interaction.reply({
      embeds: [new EmbedBuilder().setDescription(`Error: ${e}`)],
      ephemeral: true,
    });
  }
});

client.login(Bun.env.DISCORD_CLIENT_SECRET!);
