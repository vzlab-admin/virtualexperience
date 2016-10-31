var compAtual = 0;

var comp3 = {
    checker: false,
}

var init = function() {

    // init comp1 
    var idVisitante = document.querySelector(".comp1 .text");
    idVisitante.onkeypress = function(e) {
        var valor = e.keyCode - 48;
        if (valor < 0 || valor > 9) {
            e.preventDefault()
        }
    }

    var enviarID = document.querySelector(".comp1 .btn");
    enviarID.onclick = function() {
        var campo = document.querySelector(".comp1 .text");

        verificaId(campo.value, function(retorno) {
            if (retorno.success) {
                campo.value = "";

                var payload = retorno.payload;

                document.querySelector(".comp3 .nome").value = payload.name;
                document.querySelector(".comp3 .email").value = payload.email;
                document.querySelector(".comp3 .telefone").value = payload.phone;

                nextComp(2);
            }
            else {
                alert(retorno.message);
            }
        })
    }

    // comp2
    var voltar = document.querySelector(".comp2 .btn")
    voltar.onclick = function() {
        nextComp(2);
    }

    // init comp3
    var confirmar = document.querySelector(".comp3 .btn")
    confirmar.onclick = function() {
        if (comp3.checker) {
            verificaForm({
                    name: document.querySelector(".comp3 .nome").value,
                    email: document.querySelector(".comp3 .email").value,
                    phone: document.querySelector(".comp3 .telefone").value
                },
                function(retorno) {
                    if (retorno.success) {
                        var meuCHecker = document.querySelector(".checker");
                        meuCHecker.classList.remove("ativo");
                        comp3.checker = false;
                        nextComp(3);
                    }
                    else {
                        alert(retorno.message);
                    }
                }
            )
        }
        else {
            alert("Por favor aceite os termos e condições de uso de imagem.");
        }
    }

    var termos = document.querySelector(".termos a");
    termos.onclick = function() {
        nextComp(1);
    }

    // init comp4
    var ok = document.querySelector(".comp4 .btn");

    ok.onclick = function() {
        nextComp(0);
    }
}


var mycheck = function(alvo) {
    alvo.classList.toggle("ativo");

    if (alvo.classList.contains("ativo")) {
        comp3.checker = true;
    }
    else {
        comp3.checker = false;
    }
}

var nextComp = function(id) {
    var comps = document.querySelectorAll(".comps");

    for (var i = 0; i < comps.length; i++) {
        if (i == id) {
            comps[i].classList.add("ativo")
        }
        else {
            comps[i].classList.remove("ativo")
        }
    }

    compAtual++;
}


/////////////////////////////////////////////////////////////////////////////// server functions
var verificaId = function(ID, callback) {
    success = false;

    if (ID.length == 5) {
        success = true;
    }

    callback({
        success: success,
        message: "ID Incorreto",
        payload: {
            name: "Marcelo Arteiro",
            email: "marteiro@me.com",
            phone: "(11) 999-688-073"
        }
    });
}

var verificaForm = function(form, callback) {
    success = false;

    if (form.email.length > 0) {
        success = true;
    }

    callback({
        success: success,
        message: "Alguma mensagem do server."
    });
}
