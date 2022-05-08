

form.addEventListener("submit", (e) =>{
    e.preventDefault();

    createUser();
});

function createUser(){
    erroValidate = false;

    //pega os inputs para verificar
    const elementList = document.querySelectorAll(".form-input");

    //transforma em array
    const elementArray = [...elementList];

    //verifica se estao preenchidos
    elementArray.forEach(element => validateForm(element));
    
    console.log('erroValidate:'+erroValidate);
    if(erroValidate == false){
        $.ajax({
            method: "post",
            url: "create_user.php",
            data: $("#form_register").serialize(),
        success: function(erro){
                    console.log('retorno:'+erro);
        }

        });
    }
}

function validateForm(element){
   
    const value = element.value;

    if(value.length > 0){
        setSuccessFor(element);
    }else{
        setErrorFor(element,'O campo deve ser preenchido!');
        erroValidate = true;
    }
}

function setErrorFor(input,message){
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');

    small.innerText = message;
    formControl.className = "form-control error";
}

function setSuccessFor(input){
    const formControl = input.parentElement;

    formControl.className = "form-control success";
}


