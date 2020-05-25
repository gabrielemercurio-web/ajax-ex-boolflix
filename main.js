
$(document).ready(function() {

    var source = $("#movie-template").html();
    var template = Handlebars.compile(source);

    // intercetto il click sul bottone 'Cerca'
    $('.search').click(function () {
        cerca_film();
    });

    // intercetto il tasto Enter sulla tastiera
    $('.input-cerca').keypress(function (event) {
        if (event.which == 13) {

            $('.movie-container ul').remove();
            cerca_film();
        }
    });


    function cerca_film () {

        //leggo la query inserita dall'utente all'interno dell'input
        var input_utente = $('.input-cerca').val().trim();

        if (input_utente.length > 1) {

            $('.dvd-container li').remove();

            // effettuo una chiamata ajax per prelevare alcuni dati dall'api
            $.ajax ({
                'url': 'https://api.themoviedb.org/3/search/movie',
                'method': 'GET',
                'data': {
                    'api_key': 'd9712716ad212136c0d42333f3638448',
                    'query': input_utente, // <-- .val() dell'input inserito dall'utente
                    'language': 'it'
                },

                'success': function(data) {

                    // Titolo dei risultati di ricerca nel DOM'
                    $('.ricerca-utente').text(input_utente);
                    $('#risultato-ricerca').addClass('visible');

                    var risposta_api = data.results;

                    for (var i = 0; i < risposta_api.length; i++) {

                        var movie = {
                            'titolo': risposta_api[i].title,
                            'titolo_originale': risposta_api[i].original_title,
                            'lingua': risposta_api[i].original_language,
                            'voto': genenera_stella(risposta_api[i].vote_average)
                        };

                        var html_card = template(movie);
                        $('.movie-container').append(html_card);
                    }

                },

                'error': function () {
                    console.log('Errore!');
                }

            });

            // svuoto il campo input dopo ogni ricerca
            $('.input-cerca').val('');

        } else {
            $('.input-cerca').val('');
            alert('Attenzione! Devi digitare almeno 2 caratteri.');
            }

    } // <-- Fine funzione cerca_film

});


function genenera_stella(voti) {
    // trasformo la votazione da 1/10 a 1/5
    var voto_medio = Math.ceil(voti / 2);
    var stella_piena = '';
    var stella_vuota = '';
    // inserisco tante stella_piena quanto è il voto_medio
    for (var i = 0; i < voto_medio; i++) {
        stella_piena += '<i class="star material-icons">star</i>';
    }
    // Inserisco tante stella_vuota quanto è la sottrazione tra 5 e il voto_medio
    for (var i = 0; i < 5-voto_medio; i++) {
        stella_vuota += '<span class="star_border material-icons">star_border</span>';
    }

    return stella_piena + stella_vuota;
}

















// END
