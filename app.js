/**
 * /usr/bin/env node
 * app.js
 *
 * Test for DB 'Reto'.
 *
 * Basic API documentation: https://smiling-handstand-b92.notion.site/APIs-para-el-reto-99a06c0ff3624755a778908444f12f91
 *
 * @type {e | (() => Express)}
 */

const express = require('express');
const sql = require('mssql');
const bodyParser = require('body-parser');
const path = require('path');

require('dotenv').config();

const app = express();
const port = 4000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Conexion a la base de datos
let config = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    server: 'localhost',
    database: process.env.DATABASE,
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

// API root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API root para graficas
app.get('/graficas', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'graficas.html'));
});

// API para obtener los datos de un usuario
app.post('/registrar_usuario', async (req, res) => {
    try {
        const {
            nombre,
            usuario,
            contrasena,
            edad,
            pais
        } = req.body;

        let pool = await sql.connect(config);
        let request = pool.request();
        console.log("Conectado a la base de datos")

        request.output('Success', sql.Bit);

        request.input('Nombre', sql.VarChar(50), nombre);
        request.input('Usuario', sql.VarChar(25), usuario);
        request.input('Contrasena', sql.VarChar(20), contrasena);
        request.input('Edad', sql.VarChar(2), edad);
        request.input('Pais', sql.VarChar(50), pais);

        let result = await request.execute('PROC_altaJugador');

        const success = result.output.Success;

        console.log("Ha funcionado:", success);
        res.status(200);
    } catch (err) {
        console.error("No ha funcionado:", err);
        res.status(500).json({
            error: err.message
        });
    }
});

// API para obtener los datos de un tutor
app.post('/registrar_tutor', async (req, res) => {
    try {
        const {
            nombre,
            correo,
            celular,
            rol,
        } = req.body;

        let pool = await sql.connect(config);
        let request = pool.request();

        request.output('Success', sql.Bit);


        request.input('Nombre', sql.VarChar(50), nombre);
        request.input('Correo', sql.VarChar(50), correo);
        request.input('Celular', sql.Char(10), celular);
        request.input('Rol', sql.Char(5), rol);

        let result = await request.execute('PROC_altaTutor');

        const success = result.output.Success;

        console.log("Ha funcionado:", success);
        res.status(200);
    } catch (err) {
        console.error("No ha funcionado:", err);
        res.status(500).json({
            error: err.message
        });
    }
});

// API para iniciar sesion
app.post('/iniciar_sesion', async (req, res) => {
    try {
        const {
            usuario,
            contrasena
        } = req.body;

        let pool = await sql.connect(config);
        let request = pool.request();

        request.input('Usuario', sql.VarChar(25), usuario);
        request.input('Contrasena', sql.VarChar(80), contrasena);

        let result = await request.execute('PROC_login');

        console.log("Ha funcionado", result);
        res.status(200);
    } catch (err) {
        console.error("No ha funcionado:", err);
        res.status(500).json({
            error: err.message
        });
    }
});

// API para obtener los datos de un usuario
app.put('/actualizar_tutor', async (req, res) => {
    try {
        const { usuario, celular } = req.body;

        let pool = await sql.connect(config);
        let request = pool.request();

        request.input('Usuario', sql.VarChar(25), usuario);
        request.input('Celular', sql.Char(10), celular);

        let result = await request.execute('PROC_updateTutor');

        console.log("Ha funcionado", result);
        res.status(200);
    } catch (err) {
        console.error("No ha funcionado:", err);
        res.status(500).json({
            error: err.message
        });
    }
});

// API para actualizar telefono
app.put('/actualizar_telefono', async (req, res) => {
    try {
        const { celularActual, celularNuevo } = req.body;

        let pool = await sql.connect(config);
        let request = pool.request();

        request.input('CelularActual', sql.Char(10), celularActual);
        request.input('CelularNuevo', sql.Char(10), celularNuevo);

        let result = await request.execute('PROC_updateTelefono');

        console.log("Ha funcionado", result);
        res.status(200);
    } catch (err) {
        console.error("No ha funcionado:", err);
        res.status(500).json({
            error: err.message
        });
    }
});

// API para eliminar un usuario
app.delete('/eliminar_usuario', async (req, res) => {
    try {
        const { usuario } = req.body;

        let pool = await sql.connect(config);
        let request = pool.request();

        request.input('Usuario', sql.VarChar(25), usuario);

        let result = await request.execute('PROC_eliminarJugador');

        console.log("Ha funcionado", result);
        res.status(200);
    } catch (err) {
        console.error("No ha funcionado:", err);
        res.status(500).json({
            error: err.message
        });
    }
});

// API para eliminar un tutor
app.delete('/eliminar_tutor', async (req, res) => {
    try {
        const { celular } = req.body;

        let pool = await sql.connect(config);
        let request = pool.request();

        request.input('Celular', sql.Char(10), celular);

        let result = await request.execute('PROC_eliminarJugador');

        console.log("Ha funcionado", result);
        res.status(200);
    } catch (err) {
        console.error("No ha funcionado:", err);
        res.status(500).json({
            error: err.message
        });
    }
});

//API para registrar cada partida
app.post('/registrar_partida', async (req, res) => {
    try {
        const {
            tiempoJugando,
            tiempoProgram,
            monedas,
            score,
            fecha,
            usuario
        } = req.body;

         let pool = await sql.connect(config);
         let request = pool.request();

         request.input('TiempoJugando', sql.Time(0), tiempoJugando);
         request.input('TiempoProgram', sql.Time(0), tiempoProgram);
         request.input('Monedas', sql.Int, monedas);
         request.input('Score', sql.Int, score);
         request.input('Fecha', sql.Date, fecha);
         request.input('Usuario', sql.VarChar(25), usuario);

         let result = await request.execute('PROC_registrarPartida');

         console.log("Ha funcionado", result);
         res.status(200);
    } catch (err) {
        console.error("No ha funcionado:", err);
        res.status(500).json({
            error: err.message
        });
    }
});

// API para desplegar el leaderboard
app.get('/leaderboard/:page', async (req, res) => {
    try {
        let pool = await sql.connect(config);
        let request = pool.request();

        request.input('PageNumber', req.params.page);

        let result = await request.execute('PROC_leaderboard');
        const table = result.recordset;

        console.log("Ha funcionado", result);
        return res.status(200).send({ table } );
    } catch (err) {
        console.error("No ha funcionado:", err);
        res.status(500).json({
            error: err.message
        });
    }
});

// API para desplegar el tiempo jugado por un usuario
app.get('/tiempo_jugado', async (req, res) => {
    try {
        let pool = await sql.connect(config);
        let request = pool.request();

        let result = await request.execute('PROC_tiempoJugado');
        const table = result.recordset;

        console.log("Ha funcionado", result);
        res.status(200).send({ table });
    } catch (err) {
        console.error("No ha funcionado:", err);
        res.status(500).json({
            error: err.message
        });
    }
});

// API para desplegar los usuarios por pais
app.get('/paises', async (req, res) => {
    try {
        let pool = await sql.connect(config);
        let request = pool.request();

        let result = await request.execute('PROC_countries');
        const table = result.recordset;

        console.log("Ha funcionado", result);
        res.status(200).send({ table });
    } catch (err) {
        console.error("No ha funcionado:", err);
        res.status(500).json({
            error: err.message
        });
    }
});

// API para desplegar el Top 5 de jugadores
app.get('/top5', async (req, res) => {
    try {
        let pool = await sql.connect(config);
        let request = pool.request();

        let result = await request.execute('PROC_top5');

        console.log("Ha funcionado", result);
        res.status(200);
    } catch (err) {
        console.error("No ha funcionado:", err);
        res.status(500).json({
            error: err.message
        });
    }
});

// API para mostrar la lista de las partidas de un usuario
app.get('/partidas_usuario', async (req, res) => {
    try {
        const { usuario, pageNumber } = req.body;

        let pool = await sql.connect(config);
        let request = pool.request();

        request.input('Usuario', sql.VarChar(25), usuario);
        request.input('PageNumber', sql.Int, pageNumber);

        let result = await request.execute('PROC_listaPartidasUsuario');

        console.log("Ha funcionado", result);
        res.status(200);
    } catch (err) {
        console.error("No ha funcionado:", err);
        res.status(500).json({
            error: err.message
        });
    }
});

// API para mostrar el score más alto de un usuario
app.get('/highscore_usuario', async (req, res) => {
    try {
        const { usuario } = req.body;

        let pool = await sql.connect(config);
        let request = pool.request();

        request.input('Usuario', sql.VarChar(25), usuario);

        let result = await request.execute('PROC_userHighScore');

        console.log("Ha funcionado", result);
        res.status(200);
    } catch (err) {
        console.error("No ha funcionado:", err);
        res.status(500).json({
            error: err.message
        });
    }
});

// 404 error handler.
app.use((req, res) => {
    res.status(400).type('plain/text').send('404 Error: Page not found.');
});

// API to launch server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});