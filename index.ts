import server from "./src/app";
import { init } from "./src/init";

const PORT = process.env.PORT || 3001;

server.listen(PORT, async () => {
  await init();
  console.log("server is runing on port", PORT);
});
