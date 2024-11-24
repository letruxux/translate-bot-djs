import {
  ContextMenuCommandBuilder,
  ApplicationCommandType,
  REST,
  Routes,
  InteractionContextType,
} from "discord.js";

const rest = new REST().setToken(Bun.env.DISCORD_CLIENT_SECRET!);

const commands = [
  new ContextMenuCommandBuilder()
    .setType(ApplicationCommandType.Message as any)
    .setName("Translate")
    .setContexts([
      InteractionContextType.BotDM,
      InteractionContextType.Guild,
      InteractionContextType.PrivateChannel,
    ]),
  new ContextMenuCommandBuilder()
    .setType(ApplicationCommandType.Message as any)
    .setName("Translate for me")
    .setContexts([
      InteractionContextType.BotDM,
      InteractionContextType.Guild,
      InteractionContextType.PrivateChannel,
    ]),
];

await rest.put(Routes.applicationCommands(Bun.env.DISCORD_CLIENT_ID!), {
  body: commands.map((command) => command.toJSON()),
});
