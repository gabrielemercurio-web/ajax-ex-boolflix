


$(document).ready(function() {

    // intercetto il click sul bottone 'Cerca'
    $('.search').click(function () {

        //leggo la query inserita dall'utente all'interno dell'input
        var input_utente = $('.input-cerca').val();
        console.log(input_utente);

        $.ajax ({
            'url': 'https://api.themoviedb.org/3/search/movie',
            'method': 'GET',
            'success': function(data) {
                console.log(data);
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
                'query': input_utente, // <-- qui andrà una var con il .val() dell'input
                'language': 'it'
            },
        });

    });

});












// END














//
//
// $.ajax ({
//     'url': 'https://flynn.boolean.careers/exercises/api/array/music',
//     'method': 'GET',
//     'success': function (data) {
//         var response = data.response;
//
//         for (var i = 0; i < response.length; i++) {
//             var titolo = response[i]['title'];
//             var copertina = response[i]['poster'];
//             var genere = response[i]['genre'];
//             var anno = response[i]['year'];
//             var autore = response[i]['author'];
//
//             var single_disc = {
//                 'poster': copertina,
//                 'title': titolo,
//                 'author': autore,
//                 'year': anno,
//                 'genre': genere
//             };
//
//             var cd = template(single_disc);
//
//             $('.cds-container').append(cd);
//         }
//
//     },
//
//     'error': function () {
//         console.log('Errore!');
//     }
//
// });
