const express = require('express');
const router = express.Router();

//RETORNAR TODOS OS REGISTROS DE USUARIO
router.get('/',(req,res,next) => {
    res.status(200).send({
        mensagem: 'Retornando os usuários.'
    })

});

//INSERE UMA USUARIO
router.post('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Usuário criado com sucesso!'
    })
});

//RETORNAR UM USUARIO ESPECIFICO
router.get('/:id_usuario',(req, res, next) => {
    const id = req.params.id_usuario

    res.status(200).send({
        mensagem: 'Dados do usuário retornado',
        id: id
    })
});

//ALTERA UMA USUARIO ESPECIFICA
router.patch('/:id_usuario',(req, res, next) => {
    const id = req.params.id_usuario

    res.status(201).send({
        mensagem: 'Usuário alterado com sucesso!',
        id: id
    })
});

//DELETA UM USUARIO
router.delete('/:id_usuario',(req, res, next) => {
    const id = req.params.id_usuario

    res.status(201).send({
        mensagem: 'Usuário excluído com sucesso!',
        id: id
    })
});


module.exports = router;