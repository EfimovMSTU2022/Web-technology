import {Router} from "express";
import {signUp, signIn} from "../controllers/auth.controller";

const router = Router()

/**
 * @openapi
 *  tags:
 *      name: Auth
 *      description: Controllers for sign-in sing-up
 */

/**
 * @openapi
 * /auth/sign-up:
 *   post:
 *     summary: Регистрация пользователя
 *     description: Регистрирует нового пользователя в БД.
 *     tags: [Auth]
 *     requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  required:
 *                      - username
 *                      - email
 *                      - password
 *                  properties:
 *                      username:
 *                          type: string
 *                      email:
 *                          type: string
 *                      password:
 *                          type: string
 *     responses:
 *       '202':
 *         description: Успешный ответ
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   username:
 *                     type: string
 *                   email:
 *                     type: string
 *                   password:
 *                      type: string
 *       '400':
 *         description: Ошибка сервера
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                      type: string
 */
router.post('/sign-up', signUp);

/**
 * @openapi
 * /auth/sign-in:
 *   post:
 *     summary: Аутентификация пользователя
 *     description: Аутентификация пользователя.
 *     tags: [Auth]
 *     requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  required:
 *                      - username
 *                      - password
 *                  properties:
 *                      username:
 *                          type: string
 *                      password:
 *                          type: string
 *     responses:
 *       '202':
 *         description: Успешный ответ
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   username:
 *                     type: string
 *                   email:
 *                     type: string
 *                   password:
 *                      type: string
 *       '400':
 *         description: Ошибка сервера
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                      type: string
 */
router.post('/sign-in', signIn);

export default router;
