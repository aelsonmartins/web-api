const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const rotaPessoa = require('./routes/pessoa');
const rotaUsuario = require('./routes/usuario');

//morgan gera log de execucao
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());//json de entrada no body

//define parametros de acessso
app.use((req, res, next) => {
    res.header('Acces-Control-Allow_Origin','*');
    res.header(
        'Acces-Control-Allow-Header',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    //define os tipos de metodos aceitos
    if(req.method === 'OPTIONS'){
        res.header('Acces-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }

    next();     
    
});

app.use('/pessoa', rotaPessoa);
app.use('/usuario', rotaUsuario);


//não entrou em nenhuma rota
app.use((req, res, next) => {
    const erro = new Error('Não encontrado');
    erro.status = 404;
    next(erro);
});

//caso de retorno de erro
app.use((error, req, res, next) =>{
    res.status(error.status || 500);
    return res.send({
        erro:{
            mensagem: error.message
        }
    });
});


module.exports = app;