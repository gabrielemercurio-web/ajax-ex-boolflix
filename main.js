


$(document).ready(function() {

    $.ajax ({
        'url': 'https://flynn.boolean.careers/exercises/api/array/music',
        'method': 'GET',
        'success': function (data) {
            var response = data.response;

            for (var i = 0; i < response.length; i++) {
                var titolo = response[i]['title'];
                var copertina = response[i]['poster'];
                var genere = response[i]['genre'];
                var anno = response[i]['year'];
                var autore = response[i]['author'];

                var single_disc = {
                    'poster': copertina,
                    'title': titolo,
                    'author': autore,
                    'year': anno,
                    'genre': genere
                };

                var cd = template(single_disc);

                $('.cds-container').append(cd);
            }

        },

        'error': function () {
            console.log('Errore!');
        }
    });

});












// END
