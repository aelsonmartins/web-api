/*MASCARAS */
function mascara(o, f) {
    v_obj = o
    v_fun = f
    setTimeout("execmascara()", 1)
}

function execmascara() {
    v_obj.value = v_fun(v_obj.value)
}

function mdata(v) { //MASCARA PARA DATA
    v = v.replace(/(\d{2})(\d{2})(\d{4})/g, "$1/$2/$3")
    return v;
}

function mcep(v) { //MASCARA PARA CEP
    v = v.replace(/\D/g, "") //Remove tudo o que n�o � d�gito
    v = v.replace(/^(\d{5})(\d)/, "$1-$2") //Esse � t�o f�cil que n�o merece explica��es
    return v;
}

function mcpf(v) { //MASCARA PARA CPF
    v = v.replace(/\D/g, "") //Remove tudo o que n�o � d�gito
	v = v.replace(/^(\d{11})\d*/g,"$1")		  // Apenas os 11 primeiros caracteres
    v = v.replace(/(\d{3})(\d)/, "$1.$2") //Coloca um ponto entre o terceiro e o quarto d�gitos
    v = v.replace(/(\d{3})(\d)/, "$1.$2") //Coloca um ponto entre o terceiro e o quarto d�gitos de novo (para o segundo bloco de n�meros)
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2"); //Coloca um h�fen entre o terceiro e o quarto d�gitos
    return v;
}

function mcnpj(v) { //MASCARA PARA CNPJ
    v = v.replace(/\D/g, "") //Remove tudo o que n�o � d�gito
    v = v.replace(/(\d{2})(\d)/, "$1.$2")
    v = v.replace(/(\d{3})(\d)/, "$1.$2")
    v = v.replace(/(\d{3})(\d)/, "$1/$2")
    v = v.replace(/(\d)(\d{2})$/, "$1-$2"); //Coloca o . antes dos �ltimos 3 d�gitos, e antes do verificador 
    return v;
}

function mcpfcnpj(v) { //MASCARA PARA CPF E CNPJ	 
    v = v.replace(/\D/g, ""); //Remove tudo o que n�o � d�gito
    if (v.length < 12) {
        v = v.replace(/\D/g, "") //Remove tudo o que n�o � d�gito

        v = v.replace(/(\d{3})(\d)/, "$1.$2") //Coloca um ponto entre o terceiro e o quarto d�gitos
        v = v.replace(/(\d{3})(\d)/, "$1.$2") //Coloca um ponto entre o terceiro e o quarto d�gitos de novo (para o segundo bloco de n�meros)
        v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2"); //Coloca um h�fen entre o terceiro e o quarto d�gitos
    } else {
        v = v.replace(/\D/g, "") //Remove tudo o que n�o � d�gito

        v = v.replace(/(\d{2})(\d)/, "$1.$2")
        v = v.replace(/(\d{3})(\d)/, "$1.$2")
        v = v.replace(/(\d{3})(\d)/, "$1/$2")
        v = v.replace(/(\d)(\d{2})$/, "$1-$2"); //Coloca o . antes dos �ltimos 3 d�gitos, e antes do verificador 

    }
    return v;
}

function mnonumber(v){//M�scara para remover n�meros
	v = v.replace(/\d/g,"");
	return v;
}

function monlynumber(v){//Máscara para remover números
	v = v.replace(/\D/g, "");
	return v;
}

function mtel(v) { //MASCARA PARA TELEFONE
    v = v.replace(/\D/g, ""); //Remove tudo o que n�o � d�gito
    v = v.replace(/^(\d{2})(\d)/g, "($1) $2"); //Coloca par�nteses em volta dos dois primeiros d�gitos
    v = v.replace(/(\d)(\d{4})$/, "$1-$2"); //Coloca h�fen entre o quarto e o quinto d�gitos
    return v;
}

/*JQUERY DE LEITURA DE CAMPOS */
$(document).ready(function() { // FUNCAO QUE � ACIONADO AO CARREGAR A PAGINA
    $('.mascaratel').keyup(function() { //ATRIBUI O CAMPO COM CLASSE mascaratel A MASCARA DE TELEFONE
        mascara(this, mtel);
    })

    $('.mascaracpfcnpj').keyup(function() { //ATRIBUI O CAMPO COM CLASSE txtComercial A MASCARA DE CPF/CNPJ
        mascara(this, mcpfcnpj);
    })

    $('.mascaracpf').keyup(function() { //ATRIBUI O CAMPO COM CLASSE mascaracpf A MASCARA DE CPF
        mascara(this, mcpf);
    })

    $('.mascaracnpj').keyup(function() { //ATRIBUI O CAMPO COM CLASSE mascaracnpj A MASCARA DE CNPJ
        mascara(this, mcnpj);
    })
 
    $('.mascaradata').keyup(function() { //ATRIBUI O CAMPO COM CLASSE mascaracpf A MASCARA DE CPF
        mascara(this, mdata);
    })

    $('.nonumber').keyup(function() { //ATRIBUI O CAMPO COM CLASSE nonumber A MASCARA DE numero
        mascara(this, mnonumber);
    })
	
	$('.onlynumber').keyup(function() { //ATRIBUI O CAMPO COM CLASSE nonumber A MASCARA DE somente numeros
        mascara(this, monlynumber);
    })
});