import express, { Router, Request, Response } from 'express';
import fs from 'node:fs/promises'; //чтение db.json
import path from  'node:path'; // формирователь путей

const app = express();

const port = 3003;
// обрабатывает body (middleware)
const bodyJsonMiddleware = express.json();
const staticMid = express.static('./pages'); //для статических файлов (js css и т.д.)
app.use(bodyJsonMiddleware);
app.use(staticMid); //для статических файлов (js css и т.д.)
app.use((req, res, next) => {
    console.log('middleware work');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
})



// Маршрут для главной страницы
app.get('/', async (req: Request, res: Response) => {
    console.log('Hello from Express!');
    res.sendFile("./home.html", {root: './pages'}); // отдаем файл
});

// получить путь до db.json
function getPath(file: string): string {
    return path.join(__dirname, file); // путь до файла db.json
}
// получение data с db.json
async function getCommands(){
    const jsonFile = await fs.readFile(getPath('db.json'),'utf8');
    return JSON.parse(jsonFile);
    //console.log(jsonFile); //console.log commands
}
// записываем data db.json
async function setCommands(file: Object[]){
    await fs.writeFile(getPath('db.json'), JSON.stringify(file), 'utf8');
}


app.route('/commands')
    .get(async (req, res) => {
        const commands = await getCommands();
        // console.log(commands);
        res.json(commands)
    })
    .post(async (req, res) => {
        // const jsonFile = await fs.readFile(getPath('db.json'),'utf8');
        // получаем из файла
        const commands = req.body;
        // commands = JSON.parse(jsonFile)
        await setCommands(commands)
        res.sendStatus(201)
    })
    .put((req, res) => {
        res.json('update the book')
    })

app.get('/users/;id', (req, res) => {

})

//управление промежуточным программным обеспечением (middleware).

//запуск сервера метод (.listen)
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})