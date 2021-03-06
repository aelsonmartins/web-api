const express = require('express');
const { request } = require('../app');
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
            [   req.body.pessoa_nome,
                req.body.pessoa_cpf,
                req.body.pessoa_email,
                req.body.pessoa_data_nascimento
            ],
            (error, result, fields) => {
                release();//fecha conexão
                
                if(error){
                    //retorno do erro do banco
                    return res.status(500).send({
                        error: error.stack,
                        response: null
                    });
                }
                
                
                const response = {
                    mensagem: 'Pessoa inserida com sucesso!',
                    dados: {
                        pessoa_id:result.pessoa_id,
                        pessoa_nome: req.body.pessoa_nome,
                        pessoa_cpf: req.body.pessoa_cpf,
                        pessoa_email: req.body.pessoa_email,
                        pessoa_data_nascimento: req.body.pessoa_data_nascimento,
                        request: {
                            tipo: 'POST',
                            descricao: 'Retorna todas as pessoas',
                            url: 'http://localhost:3000/pessoa'
                        }
                    }
                }

                return res.status(201).send({
                    response
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

                
                const response = { 
                    quantidade: result.rows.length,
                    pessoas: result.rows.map(pessoa => {
                        return {
                            pessoa_id: result.rows.pessoa_id,
                            pessoa_nome: result.pessoa_nome,
                            pessoa_cpf: result.pessoa_cpf,
                            pessoa_email: result.pessoa_email,
                            pessoa_data_nascimento: result.pessoa_data_nascimento,
                            request: {
                                tipo: 'GET',
                                descricao: '',
                                url: 'http://localhost:3000/pessoa/'+ pessoa.pessoa_id
                            }
                        }
                    })
                }

                return res.status(200).send({
                   response
                });
            }
        )
    });
});

//DELETE DE UM REGISTRO DE PESSOA
router.delete('/:pessoa_id', (req, res, next) => {
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
                'DELETE * FROM website.pessoa p WHERE p.pessoa_id = $1;',
                [req.body.pessoa_id],
            (error, result, fields) => {
                release();//fecha conexão
                
                if(error){
                    //retorno do erro do banco
                    return res.status(500).send({
                        error: error.stack,
                        response: null
                    });
                }

                const response = { 
                    pessoas: result.rows.map(pessoa => {
                        return {
                            pessoa_id: result.rows.pessoa_id,
                            pessoa_nome: result.pessoa_nome,
                            pessoa_cpf: result.pessoa_cpf,
                            pessoa_email: result.pessoa_email,
                            pessoa_data_nascimento: result.pessoa_data_nascimento,
                            request: {
                                tipo: 'DELETE',
                                descricao: '',
                                url: 'http://localhost:3000/pessoa/'
                            }
                        }
                    })
                }

                return res.status(200).send({
                   response
                });
            }
        )
    });
});


module.exports = router;