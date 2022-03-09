const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Controladores
const controllerPosicao = require('./controllers/posicoes');
const controllerTime = require('./controllers/times');
const controllerJogador = require('./controllers/jogadores');

// Rotas das Posições
app.route('/posicoes')
    .get(controllerPosicao.getPosicoes)
    .post(controllerPosicao.addPosicao)
    .put(controllerPosicao.updatePosicao);

app.route('/posicoes/:id')
    .get(controllerPosicao.getPosicaoById)
    .delete(controllerPosicao.deletePosicao);

// Rotas dos Times
app.route('/times')
    .get(controllerTime.getTimes)
    .post(controllerTime.addTime)
    .put(controllerTime.updateTime);

app.route('/times/:id')
    .get(controllerTime.getTimeById)
    .delete(controllerTime.deleteTime);

// Rotas dos Jogadores
app.route('/jogadores')
    .get(controllerJogador.getJogadores)
    .post(controllerJogador.addJogador)
    .put(controllerJogador.updateJogador);

app.route('/jogadores/:id')
    .get(controllerJogador.getJogadorById)
    .delete(controllerJogador.deleteJogador);


app.listen(process.env.PORT || 3002, () => {
    console.log('Servidor rodando na porta 3002...')
});