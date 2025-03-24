import express, {Request, Response} from "express";

const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

app.set("view engine", "ejs")

app.get('/ejs-pages', (req: Request, res: Response) => {
    const user = req.query.user || 'Гость';
     res.render('layout', {message: "Переданное сообщение.", title: "My page", content: "index", user: user})
})

app.get('/about', (req: Request, res: Response) => {
    res.render('layout', {message: "Здесь должны быть контакты.", title: "About", content: "about"})
})

app.get('/', (req: Request, res: Response) => {
    console.log(req.body)
    console.log(req.headers)
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})