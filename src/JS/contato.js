let campoVazio = 0;

$(document).ready(function(){
    $('#CPFform').mask('000.000.000-00');
    $('#telefoneform').mask('(00) 00000-0000');
});

function analisarTellMask(){
    let tell = $('#telefoneform').val();
    if (tell.length < 15) {
        $('#telefoneform').mask('(00) 00000-0000');
    }
}

function corrigirTellMask(){
    let tell = $('#telefoneform').val();
    if (tell.length < 15) {
        $('#telefoneform').mask('(00) 0000-0000');
    }
};
