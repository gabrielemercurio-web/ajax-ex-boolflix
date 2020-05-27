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

            $('.grid-container ul').remove();
            cerca_film();
        }
    });


    function cerca_film () {

        //leggo la query inserita dall'utente all'interno dell'input
        var input_utente = $('.input-cerca').val().trim();

        if (input_utente.length > 1) {

            $('#movie-template ul').remove();

            // effettuo una chiamata ajax per prelevare i dati dei FILM
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
                    $('.ricerca-utente-film').text('Film per: ' + '"' + input_utente + '"');
                    $('#risultato-ricerca-film').addClass('visible');

                    var risposta_api = data.results;

                    for (var i = 0; i < risposta_api.length; i++) {

                        if (risposta_api[i].poster_path != null) {
                            var tag_url_poster = '<img src="https://image.tmdb.org/t/p/w185' +  risposta_api[i].poster_path + '">';
                        } else {
                            var tag_url_poster = '<img src="img/netflix_black.png" alt="null">';
                        }

                        var film = {
                            'locandina': tag_url_poster,
                            'titolo': risposta_api[i].title,
                            'titolo_originale': risposta_api[i].original_title,
                            'lingua': risposta_api[i].original_language,
                            'voto': genera_stella(risposta_api[i].vote_average)
                        };

                        var html_card = template(film);
                        $('.movie.grid-container').append(html_card);
                        genera_bandiera(risposta_api[i].original_language)
                    }
                },

                'error': function () {
                    console.log('Errore!');
                }

            });

            // effettuo una chiamata ajax per prelevare i dati delle SERIE TV
            $.ajax ({
                'url': 'https://api.themoviedb.org/3/search/tv',
                'method': 'GET',
                'data': {
                    'api_key': 'd9712716ad212136c0d42333f3638448',
                    'query': input_utente, // <-- .val() dell'input inserito dall'utente
                    'language': 'it'
                },

                'success': function(data) {

                    // Titolo h5 dei risultati di ricerca nel DOM'
                    $('.ricerca-utente-serietv').text('Serie TV: ' + '"' + input_utente + '"');
                    $('#risultato-ricerca-serietv').addClass('visible');

                    var risposta_api = data.results;

                    for (var i = 0; i < risposta_api.length; i++) {

                        if (risposta_api[i].poster_path != null) {
                            var tag_url_poster = '<img src="https://image.tmdb.org/t/p/w185' +  risposta_api[i].poster_path + '">';
                        } else {
                            var tag_url_poster = '<img src="img/netflix_black.png" alt="null">';
                        }

                        var serietv = {
                            'locandina': tag_url_poster,
                            'titolo': risposta_api[i].name,
                            'titolo_originale': risposta_api[i].original_name,
                            'lingua': risposta_api[i].original_language,
                            'voto': genera_stella(risposta_api[i].vote_average)
                        };

                        var html_card = template(serietv);
                        $('.serie-tv.grid-container').append(html_card);
                        genera_bandiera(risposta_api[i].original_language)
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




function genera_stella(voti) {
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




function genera_bandiera(flag) {

    var bandiera = flag;

    if (bandiera == 'en' || bandiera == 'us') {
        $('.en').addClass('flag-inglese').text('');
    } else if (bandiera == 'it'){
        $('.it').addClass('flag-italiano').text('');
    } else if (bandiera == 'es') {
        $('.es').addClass('flag-spagnolo').text('');
    } else if (bandiera == 'fr') {
        $('.fr').addClass('flag-francese').text('');
    } else if (bandiera == 'de') {
        $('.de').addClass('flag-tedesco').text('');
    }

    return flag;
}














// END
