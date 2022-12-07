import express from 'express';
import { fileURLToPath} from 'url';
import { dirname } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const hostname = 'localhost';
const port = 3033;
const app = express();

app.use(express.static('public'))

app.get('/',(req, res) => {
    res.sendFile(__dirname+'/public/about.html')
})

const mylog = (req,res,next) => {
    console.log("Params: ", req.params.username, new Date().toLocaleString());
    next();
}

//data yang bersumber dari database
const list_username = ['bunny', 'lola'];

app.get('/:username', mylog, function (req, res, next) {
    if (!list_username.includes(req.params.username.toLocaleLowerCase()) )
      next('route')
    else
      next()     
},   function (req, res, next) {
    res.sendFile(__dirname+'/public/user.html')
})

app.get('/:username', function (req, res, next) {
    res.sendFile(__dirname+'/public/unknown.html')
})

app.listen(port, ()=>{
    console.log(`Server running at ${hostname}:${port}`);
})