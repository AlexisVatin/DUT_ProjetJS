$(document).ready(function(){
    initializeInput();
    initializeConnectArea();
});
function initializeInput(){
    $(".input-div input").off("change");
    checkInput();
    $('.input-div input').change();
}
function checkInput(){
    $('.input-div input').change(function(){
        if($(this).val().length!=0) $(this).parent().find("label").addClass('active');
        else $(this).parent().find("label").removeClass('active');
    })
}
function initializeConnectArea(){
    $('#connect-button').click(function() {$('#connect-area').toggleClass("active")});
}

function getInput(icon, text, type, value){
    let divToReturn = $('<div/>').addClass("input-div cof-Y-mar-1");
    divToReturn.append(
        $('<input/>').attr('type', type).attr("name", value),
        $('<i/>').addClass(icon),
        $('<label/>').html(text)
    );
    return divToReturn;
}

/*
<input type="text"/>
        <i class="fas fa-search"></i>
        <label>Rechercher</label>
 */