const { pool } = require("../config");
const { request, response } = require("express");

// Recuperar todos os times
const getTimes = (request, response) => {
    pool.query('SELECT * FROM times ORDER BY codigo', (error, results) => {
        if (error) {
            return response.status(401).json({ status: 'error',
                message: 'Erro ao recuperar os times: ' + error });
        }
        response.status(200).json(results.rows);
    })
}
module.exports.getTimes = getTimes;

// Adicionar um novo time
const addTime = (request, response) => {
    const { nome, sigla, ano_fundacao, historia } = request.body;

    pool.query('INSERT INTO times (nome, sigla, ano_fundacao, historia) VALUES ($1, $2, $3, $4)',
        [nome, sigla, ano_fundacao, historia],
        (error) => {
            if (error) {
                return response.status(401).json({ status: 'error',
                    message: 'Erro ao inserir o time: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'Time criado.' });
        }
    )
}
module.exports.addTime = addTime;

// Atualizar um time
const updateTime = (request, response) => {
    const { codigo, nome, sigla, ano_fundacao, historia } = request.body;

    pool.query('UPDATE times SET nome=$1, sigla=$3, ano_fundacao=$4, historia=$5 WHERE codigo=$2',
        [nome, codigo, sigla, ano_fundacao, historia],
        (error) => {
            if (error) {
                return response.status(401).json({ status: 'error',
                    message: 'Erro ao atualizar o time: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'Time atualizado.' });
        }
    )
}
module.exports.updateTime = updateTime;

// Deletar um time
const deleteTime = (request, response, next) => {
    const codigo = parseInt(request.params.id);

    pool.query(
        'DELETE FROM times WHERE codigo=$1',
        [codigo],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(401).json({ status: 'error',
                    message: 'Não foi possível remover o time.' });
            }
            response.status(201).json({ status: 'success', message: 'Time removido com sucesso.' });
        }
    )
}
module.exports.deleteTime = deleteTime;

// Busca time por um determinado ID
const getTimeById = (request, response) => {
    const codigo = parseInt(request.params.id);

    pool.query('SELECT * FROM times WHERE codigo = $1',
        [codigo],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(401).json({ status: 'error',
                    message: 'Não foi possível recuperar o time.' });
            }
            response.status(200).json(results.rows);
        }
    )
}
module.exports.getTimeById = getTimeById;