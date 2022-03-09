const { pool } = require("../config");
const { request, response } = require("express");

// Recuperar todos os jogadores
const getJogadores = (request, response) => {
    pool.query("SELECT j.codigo as codigo, j.nome as nome, j.numero_camisa as numero_camisa,  \
        j.time as time, t.nome as time_nome, j.posicao as posicao, p.nome as posicao_nome \
        FROM jogadores j \
        JOIN times t on t.codigo = j.time \
        JOIN posicoes p on p.codigo = j.posicao \
        ORDER BY j.codigo",
        (error, results) => {
        if (error) {
            return response.status(401).json({status: 'error',
                message: 'Erro ao recuperar os jogadores: ' + error});
        }
        response.status(200).json(results.rows);
    })
}
module.exports.getJogadores = getJogadores;

// Adicionar um novo jogador
const addJogador = (request, response) => {
    const { nome, numero_camisa, time, posicao } = request.body;

    pool.query('INSERT INTO jogadores (nome, numero_camisa, time, posicao) VALUES ($1, $2, $3, $4)',
        [nome, numero_camisa, time, posicao],
        (error) => {
            if (error) {
                return response.status(401).json({ status: 'error',
                    message: 'Erro ao inserir o jogador: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'Jogador criado.' });
        }
    )
}
module.exports.addJogador = addJogador;


// Atualizar um jogador
const updateJogador = (request, response) => {
    const { codigo, nome, numero_camisa, time, posicao } = request.body;

    pool.query('UPDATE jogadores SET nome=$1, numero_camisa=$3, time=$4, posicao=$5 WHERE codigo=$2',
        [nome, codigo, numero_camisa, time, posicao],
        (error) => {
            if (error) {
                return response.status(401).json({ status: 'error',
                    message: 'Erro ao atualizar o jogador: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'Jogador atualizado.' });
        }
    )
}
module.exports.updateJogador = updateJogador;

// Deletar um jogador
const deleteJogador = (request, response, next) => {
    const codigo = parseInt(request.params.id);

    pool.query(
        'DELETE FROM jogadores WHERE codigo=$1',
        [codigo],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(401).json({ status: 'error',
                    message: 'Não foi possível remover o jogador.' });
            }
            response.status(201).json({ status: 'success', message: 'Jogador removido com sucesso.' });
        }
    )
}
module.exports.deleteJogador = deleteJogador;

// Busca jogador por um determinado ID
const getJogadorById = (request, response) => {
    const codigo = parseInt(request.params.id);

    pool.query("SELECT j.codigo as codigo, j.nome as nome, j.numero_camisa as numero_camisa,  \
        j.time as time, t.nome as time_nome, j.posicao as posicao, p.nome as posicao_nome \
        FROM jogadores j \
        JOIN times t on t.codigo = j.time \
        JOIN posicoes p on p.codigo = j.posicao \
        WHERE j.codigo = $1 \
        ORDER BY j.codigo",
        [codigo],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(401).json({ status: 'error',
                    message: 'Não foi possível recuperar o jogador.' });
            }
            response.status(200).json(results.rows);
        }
    )
}
module.exports.getJogadorById = getJogadorById;