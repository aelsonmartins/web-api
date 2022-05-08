const express = require('express');
const router = express.Router();
const pool = require('../pgsql').pool;


//INSERE UMA PESSOA
router.post('/', (req, res, next) => {
    //gera conexao ja com o sql e passando parametros
    pool.connect((error, client, release) => {

        //erro no client
        if(error){
            return res.status(500).send({
                error: error.stack,
                response: null
            });
        }

        client.query(
                'INSERT INTO website.pessoa (pessoa_nome,pessoa_cpf,pessoa_email,pessoa_data_nascimento) values ($1,$2,$3,$4);',
            [req.body.pessoa_nome,req.body.pessoa_cpf,req.body.pessoa_email,req.body.pessoa_data_nascimento],
            (error, result, fields) => {
                release();//fecha conexão
                
                if(error){
                    //retorno do erro do banco
                    return res.status(500).send({
                        error: error.stack,
                        response: null
                    });
                }

                return res.status(200).send({
                    mensagem: 'Pessoa inserida com sucesso!',
                });
            }
        )
    });
});



//RETORNA TODOS OS REGISTROS DE PESSOAS
router.get('/', (req, res, next) => {
    //gera conexao ja com o sql
    pool.connect((error, client, release) => {

        //erro na conexao
        if(error){
            return res.status(500).send({
                error: error.stack,
                response: null
            });
        }

        client.query(
                'SELECT * FROM website.pessoa;',
            (error, result, fields) => {
                release();//fecha conexão
                
                if(error){
                    //retorno do erro do banco
                    return res.status(500).send({
                        error: error.stack,
                        response: null
                    });
                }

                return res.status(200).send({
                    response: result.rows
                });
            }
        )
    });
});

module.exports = router;