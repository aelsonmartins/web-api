const express = require('express');
const router = express.Router();
const pgsql = require('../pgsql').pool;

//RETORNAR TODOS OS REGISTROS DE PESSOA
router.get('/',(req,res,next) => {
    res.status(200).send({
        mensagem: 'Retornando as pessoas.'
    });

});

//INSERE UMA PESSOA
router.post('/', (req, res, next) => {
    //gera conexao ja com o sql e passando parametros
    pgsql.getConnection((error, conn) => {
        conn.query(
                'INSERT INTO pessoa values (?,?,?,?)',
            [req.body.pessoa_nome,req.body.pessoa_cpf,req.body.pessoa_email,req.body.pessoa_data_nascimento],
            (error, resultado, field) => {
                conn.release();//libera conexão

                if(error){
                    //se deu erro ja retorna com a msg  de erro
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }

                res.status(201).send({
                    mensagem: 'Pessoa criada com sucesso!',
                    pessoaCriada: pessoa
                });
            }
        )
    });
});

//RETORNAR UMA PESSOA ESPECIFICA
router.get('/:id_pessoa',(req, res, next) => {
    const id = req.params.id_pessoa

    res.status(200).send({
        mensagem: 'Dados da pessoa retornada',
        id: id
    });
});

//ALTERA UMA PESSOA ESPECIFICA
router.patch('/:id_pessoa',(req, res, next) => {
    const id = req.params.id_pessoa

    res.status(201).send({
        mensagem: 'Pessoa alterada com sucesso!',
        id: id
    })
});

//DELETA UMA PESSOA
router.delete('/:id_pessoa',(req, res, next) => {
    const id = req.params.id_pessoa

    res.status(201).send({
        mensagem: 'Pessoa excluída com sucesso',
        id: id
    });
});


module.exports = router;