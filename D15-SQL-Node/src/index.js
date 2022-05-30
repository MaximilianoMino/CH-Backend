const app = require("./server");
const { PORT } = require("./config/globals");

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));