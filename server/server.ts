import * as path from "path";
import express from "express";

const app = express();
const _port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../public')));

app.listen(_port,()=>{
    console.info(`Server is up on port ${_port}`);
});
