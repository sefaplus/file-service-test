import Server from "./src/server";

Server.startApp();

process.on("SIGINT", () => {
  process.exit(1);
});

process.on("SIGTERM", () => {
  process.exit(1);
});

process.on("unhandledRejection", (e) => {
  process.exit(1);
});

process.on("uncaughtException", (e) => {
  process.exit(1);
});
