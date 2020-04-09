/**
 * Appel ajax : Vérifier si l'utilisateur est bien connecté est récupéré les informations nécéssaires
 */
$(document).ready(function(){
    $.ajax({
        url: 'php/is_connected.php',
        dataType: 'json'
    }).done(function(data){
        if(data.success){
            $('#connect-button').html("Deconnexion").attr('id', 'disconnect-button').click(function(){
                $.ajax({
                    url: 'php/deconnexion.php',
                    dataType: 'json'
                }).done(function(data) {
                    window.location.reload(true);
                }).fail(erreurCritique);
            });
        }else{
            $('#connect-area').append(
                formConnexion(),
            );
            initializeInput();
        }
    }).fail(erreurCritique);
});

function erreurCritique(){
    alert("Erreur Critique");
}
/**
 * Appel ajax : Proposer un formulaire d'inscription
 */
let formInscription = function(){
    let formToReturn = $('<form/>');
    formToReturn.attr('action', 'php/inscription.php')
        .attr('method', 'post')
        .append(
            getInput("fas fa-user","Votre pseudonyme", "text", "name"),
            getInput("fas fa-envelope", "Votre Mail", "text", "mail"),
            getInput("fas fa-key", "Votre mot de passe", "password", "password"),
            $('<button />').attr('type', 'submit').html('Inscription')
        ).submit(function() {
            $.ajax({
                url: 'php/inscription.php',
                method: 'post',
                dataType: 'json',
                data: $(this).serialize()
            }).done(function(data){
                if(data.success===true){
                    window.location.reload(true);
                }else{
                    $('section').append(data.message);
                }
            }).fail(erreurCritique);
            return false;
        })
    return formToReturn;
};
/**
 * Appel ajax : Connexion
 */
let formConnexion = function(){
    let formToReturn = $('<form/>');
    formToReturn.attr('action', 'php/connexion.php')
        .attr('method', 'post')
        .append(
            getInput("fas fa-user","Votre pseudonyme", "text", "name"),
            getInput("fas fa-key", "Votre mot de passe", "password", "password"),
            $('<button />').attr('type', 'submit').html('Inscription')
        ).submit(function() {
        $.ajax({
            url: 'php/connection.php',
            method: 'post',
            dataType: 'json',
            data: $(this).serialize()
        }).done(function(data){
            if(data.success===true){
                window.location.reload(true);
            }else{
                $('section').append(data.message);
            }
        }).fail(erreurCritique);
        return false;
    });
    return formToReturn;
};

/**
 * Appel ajax : Charger l'article à modifier
 */
let modifieArticle = function(idarticle){
    $(".mainSection").html('');
    $.ajax({
        url: 'php/getArticle.php',
        method: 'post',
        dataType: 'json',
        data: {id_article:idarticle}
    }).done(function(data){
        if(data.hasOwnProperty('message')){
            $(".mainSection").append($('<p/>').html(data.message));
        }
        if(data.success===true){
            $('.mainSection').append(
                articleviewmodify(data.article)
            )
        }
    }).fail(erreurCritique);
};
/**
 * Appel ajax : Formulaire de connexion
 */
let formulaireConnexion = function(){
    let messageErreur = $('<p/>');
    return $('<form />')
        .attr('action', 'php/connexion.php')
        .attr('method', 'post')
        .append(
            $('<p/>').html("Pseudo :"),
            $('<input required/>').attr('name', 'login'),
            $('<br/>'),
            $('<p/>').html("Mot de passe :"),
            $('<input type="password" required/>').attr('name', 'password'),
            $('<br/>'),
            $('<button />').attr('type', 'submit').html('Connexion'),
            messageErreur
        ).submit(function() {
            $.ajax({
                url: 'php/connexion.php',
                method: 'post',
                dataType: 'json',
                data: $(this).serialize()
            }).done(function(data){
                if(data.hasOwnProperty('message')){
                    messageErreur.html(data.message);
                }
                if(data.success===true){
                    window.location.reload(true);
                }
            }).fail(erreurCritique);
            return false;
        })
};



/**
 * Appel ajax : Supprimer un article
 */
let SupArticlePourDeBon = function () {
    $.ajax({
        url: 'php/supprimerArticle.php',
        method: 'post',
        dataType: 'json',
        data: $(this).serialize()
    }).done(function(data){
        if(data.success===true)
            window.location.reload(true);
    }).fail(erreurCritique);
};

/**
 * Appel ajax : Rédiger un commentaire
 */
let commentaireform = function(){
    return $('<form />')
        .attr('action', 'php/addCommentaire.php')
        .attr('method', 'post')
        .append(
            $('<p/>').html(" ▼ Rédiger son commentaire ▼ "),
            $('<textarea placeholder="votre commentaire" required/>').attr('name', 'contenuscommentaire'),
            $('<br/>'),
            $('<button />').attr('type', 'submit').html('Poster')
        ).submit(function() {
            $.ajax({
                url: 'php/newCommentaire.php',
                method: 'post',
                dataType: 'json',
                data: $(this).serialize()
            }).done(function(data){
                if(data.success===true){
                    window.location.reload(true);
                }
            }).fail(erreurCritique);
            return false;
        })
};

/*

charger commentaire d'un article
getCommentaire.php

 */
function supprimerCommentaire(idCommentaire){
    $.ajax({
        url: 'php/supprimerCommentaire.php',
        method: 'post',
        dataType: 'json',
        data:{idcommentaire:idCommentaire}
    }).done(function(data){
        if(data.success === true){
            window.location.reload(true);
        }else{
            if(data.hasOwnProperty('message')){
                alert(data.message);
            }
        }
    }).fail(erreurCritique);
}



/**
 * Appel ajax : Déconnecté l'utilisateur
 */
function deconnexion(){
    $.ajax({
        url: 'php/deconnexion.php',
        method: 'post',
        dataType: 'json',
    }).done(function(data){
        if(data.success===false){
            window.location.reload(true);
        }
    })
        .fail(erreurCritique);
}

/**
 * Appel ajax : Recharger la page
 */
function reload(){
    $.ajax({
        url: 'php/reload.php',
        method: 'post',
        dataType: 'json',
    }).done(function(data){

        if(data.hasOwnProperty('message')) $('.mainSection').append(data.message);
        if(data.success===true){
            window.location.reload(true);
        }
    }).fail(erreurCritique);
}

