import {Router} from "express";
import {deleteUser, getUsers, createUser, updateUser} from "../controllers/users.controllers";

const router = Router()

/**
 * @openapi
 *  tags:
 *      name: Users
 *      description: Controllers for users
 */

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Получить список пользователей
 *     description: Возвращает массив пользователей из базы данных.
 *     tags: [Users]
 *     responses:
 *       '202':
 *         description: Успешный ответ с массивом пользователей
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
router.get('/', getUsers);

/**
 * @openapi
 * /users:
 *   post:
 *     summary: Создать пользователя
 *     description: Задает нового пользователя.
 *     tags: [Users]
 *     requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  required:
 *                      - username
 *                      - email
 *                  properties:
 *                      username:
 *                          type: string
 *                          example: John123
 *                      email:
 *                          type: string
 *                          example: john123@mail.com
 *     responses:
 *       '201':
 *         description: Успешный ответ с массивом пользователей
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
router.post('/', createUser);

/**
 * @openapi
 * /users:
 *   delete:
 *     summary: Удалить пользователя
 *     description: Удаляет пользователя.
 *     tags: [Users]
 *     requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  required:
 *                      - userId
 *                  properties:
 *                      userId:
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
router.delete('/', deleteUser);

/**
 * @openapi
 * /users/{userId}:
 *   put:
 *     summary: Обновить пользователя
 *     description: Обновляет данные пользователя.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Успешный ответ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *       '400':
 *         description: Ошибка валидации
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '404':
 *         description: Пользователь не найден
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.put('/:userId', updateUser);


export default router;