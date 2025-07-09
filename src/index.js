import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from "./constants/index.js";
import { initMongoConection } from "./db/initMongoConnection.js";
import { setupServer } from "./server.js";
import { creatDirIfNotExists } from "./utils/createDirIfNotExists.js";

const bootstrap = async () => {
    await initMongoConection();
    await creatDirIfNotExists(TEMP_UPLOAD_DIR);
    await creatDirIfNotExists(UPLOAD_DIR);
    setupServer();
};

bootstrap();

