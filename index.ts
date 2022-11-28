import express from 'express'
import 'dotenv/config'
import multer from 'multer'
import { existsSync, writeFile } from 'node:fs'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

if (!process.env.AUTHTOKEN && process.env.INSTANCEURL === undefined) {
    console.log('Make sure to set the AUTHTOKEN and INSTANCEURL env variables!\nIn docker, add the flags -e AUTHTOKEN="generatedtoken" and -e INSTANCEURL="https://your-server.tld".\nIn .env, rename .env.example to .env and edit those two lines.')
    process.exit(1)
}

const app = express()
app.use(express.urlencoded({extended: false}));
app.use(express.static('i'))

function makeid(length: number) {
    let result             = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

app.post('/upload', multer().single('file'), async (req, res) => {
    let filename = req.file!.originalname
    if (req.get('Authentication') !== process.env.AUTHTOKEN) return res.status(401).send('You are not authorized!')
    if (existsSync(`./${req.file!.originalname}`)) {
        const [anotherpart, extension] = req.file!.mimetype.split("/");
        filename = `${makeid(5)}.${extension}`
    }
    const generatedurl = process.env.INSTANCEURL + "/" + (filename.replaceAll(' ', '%20'))
    writeFile(`./i/${filename}`, req.file!.buffer, (err) => {
        if (err) throw err
        res.json({"url": generatedurl})
    })
})

app.listen(8080, () => {
    console.log('Server is listening!')
    console.log('Download the sxcu file at https://bit.ly/3TR3K5V')
})