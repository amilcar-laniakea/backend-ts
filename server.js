import { app, PORT } from "./src/app.js";
import { log } from "./src/utils/logger.js";

app.listen(PORT, () => log.info(`Server running on port  ${PORT}!`));
