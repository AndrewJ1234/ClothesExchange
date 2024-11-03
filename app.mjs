import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use((req, res, next) => {
    console.log(Date.now(), req.path, req.method, req.query, req.params, req.body);
    res.setHeader("Content-Type", "application/json");
    next();
});

app.use(express.static(path.join(__dirname, 'react-front-end', 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'react-front-end', 'build', 'index.html'));
});

app.listen(process.env.PORT || 3000), () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
};
