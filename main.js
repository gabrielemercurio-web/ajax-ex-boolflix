


$(document).ready(function() {

    // intercetto il click sul bottone 'Cerca'
    $('.search').click(function () {

        $('.dvd-container li').remove();
        cerca_film();

    });

    // intercetto il tasto Enter sulla tastiera
    $('.input-cerca').keypress(function (event) {
        if (event.which == 13) {

            $('.dvd-container li').remove();
            cerca_film();
        }
    });

    function cerca_film () {

        //leggo la query inserita dall'utente all'interno dell'input
        var input_utente = $('.input-cerca').val();
        console.log(input_utente);

        // effettuo una chiamata ajax per prelevare alcuni dati dall'api
        $.ajax ({
            'url': 'https://api.themoviedb.org/3/search/movie',
            'method': 'GET',
            'success': function(data) {

                var risposta_api = data.results;

                for (var i = 0; i < risposta_api.length; i++) {

                    var titolo = risposta_api[i].title;
                    var titolo_originale = risposta_api[i].original_title;
                    var lingua = risposta_api[i].original_language;
                    var voto = risposta_api[i].vote_average;

                    var movie = $('.dvd-container ul').append('<li>' + titolo + ' - ' + lingua + ' - ' + titolo_originale + ' - ' + voto + '</li>');
                }

            },
            'error': function () {
                console.log('Errore!');
            },

            'data': {
                'api_key': 'd9712716ad212136c0d42333f3638448',
                'query': input_utente, // <-- .val() dell'input inserito dall'utente
                'language': 'it'
            },
        });

        // svuoto il campo input dopo ogni ricerca
        $('.input-cerca').val('');

    } // <-- Fine funzione cerca_film

});








// END
