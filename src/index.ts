import express from "express";
import usersRouter from "./routes/users.routes";
import authRouter from "./routes/auth.routes";
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
app.use("/auth", authRouter);
app.use("/users", usersRouter);

app.listen(port, '0.0.0.0', () => {
    console.log(`Example app listening on port ${port}`)
})