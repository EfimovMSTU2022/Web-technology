import express from "express";
import usersRouter from "./routes/users.routes";
import {connectDB} from "./config/connectDB";
import swaggerUI from "swagger-ui-express";
import swaggerSpec from "./config/openAPI";

const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

connectDB()

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec.swaggerSpec));

app.use("/users", usersRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})