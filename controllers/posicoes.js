const { pool } = require("../config");
const { request, response } = require("express");

// Recuperar todas as posições
const getPosicoes = (request, response) => {
    pool.query('SELECT * FROM posicoes ORDER BY codigo', (error, results) => {
        if (error) {
            return response.status(401).json({ status: 'error',
                message: 'Erro ao recuperar as posições: ' + error });
        }
        response.status(200).json(results.rows);
    })
}
module.exports.getPosicoes = getPosicoes;

// Adicionar uma nova posição
const addPosicao = (request, response) => {
    const { nome } = request.body;

    pool.query('INSERT INTO posicoes (nome) VALUES ($1)',
        [nome],
        (error) => {
            if (error) {
                return response.status(401).json({ status: 'error',
                    message: 'Erro ao inserir a posição: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'Posição criada.' });
        }
    )
}
module.exports.addPosicao = addPosicao;

// Atualizar uma posição
const updatePosicao = (request, response) => {
    const { codigo, nome } = request.body;

    pool.query('UPDATE posicoes SET nome=$1 WHERE codigo=$2',
        [nome, codigo],
        (error) => {
            if (error) {
                return response.status(401).json({ status: 'error',
                    message: 'Erro ao atualizar a posição: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'Posição atualizada.' });
        }
    )
}
module.exports.updatePosicao = updatePosicao;

// Deletar uma posição
const deletePosicao = (request, response, next) => {
    const codigo = parseInt(request.params.id);

    pool.query(
        'DELETE FROM posicoes WHERE codigo=$1',
        [codigo],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(401).json({ status: 'error',
                    message: 'Não foi possível remover a posição.' });
            }
            response.status(201).json({ status: 'success', message: 'Posição removida com sucesso.' });
        }
    )
}
module.exports.deletePosicao = deletePosicao;

// Busca posição por um determinado ID
const getPosicaoById = (request, response) => {
    const codigo = parseInt(request.params.id);

    pool.query('SELECT * FROM posicoes WHERE codigo = $1',
        [codigo],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(401).json({ status: 'error',
                    message: 'Não foi possível recuperar a posição.' });
            }
            response.status(200).json(results.rows);
        }
    )
}
module.exports.getPosicaoById = getPosicaoById;