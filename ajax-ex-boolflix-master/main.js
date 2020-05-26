$(document).ready(function() {

    // variabili per le chiamate ajax
    var api_key = 'c4a5d0f9204fe8ed8998978f4fb5f4c2';
    var api_url_base = 'https://api.themoviedb.org/3/';

    // preparo le variabili per handlebars (template card)
    var template_html = $('#card-template').html();
    var template = Handlebars.compile(template_html);

    // preparo le variabili per handlebars (template bandierina)
    var template_html_bandiera = $('#bandiera-template').html();
    var template_bandiera = Handlebars.compile(template_html_bandiera);

    // intercetto i tasti del campo di testo
    $('#testo-ricerca').keyup(function(event) {
        if(event.which == 13) {
            // l'utnete ha premuto INVIO
            ricerca();
        }
    });

    // intercetto il click sul pulsante di ricerca
    $('#pulsante-ricerca').click(ricerca);

    // funzione per effettuare una ricerca a tmdb
    function ricerca() {
        // recupero il testo inserito dall'utente
        var testo_utente = $('#testo-ricerca').val().trim();

        // controllo che l'utente abbia digitato qualcosa
        if(testo_utente.length > 1) {
            reset_risultati();
            // faccio partire la chiamata ajax per cercare i film
            $.ajax({
                'url': api_url_base + 'search/movie',
                'method': 'GET',
                'data': {
                    'api_key': api_key,
                    'query': testo_utente,
                    'language': 'it'
                },
                'success': function(risposta) {
                    // inserisco il testo della ricerca nel titolo e lo visualizzo
                    contestualizza_risultati(testo_utente);
                    // gestisco i dati ottenuti con l'api => sono film!
                    gestisci_risposta_api(risposta, 'film');
                },
                'error': function() {
                    console.log('errore');
                }
            });

            // faccio partire la chiamata ajax per cercare le serie tv
            $.ajax({
                'url': api_url_base + 'search/tv',
                'method': 'GET',
                'data': {
                    'api_key': api_key,
                    'query': testo_utente,
                    'language': 'it'
                },
                'success': function(risposta) {
                    // inserisco il testo della ricerca nel titolo e lo visualizzo
                    contestualizza_risultati(testo_utente);
                    // gestisco i dati ottenuti con l'api => sono serie tv!
                    gestisci_risposta_api(risposta, 'serie tv');
                },
                'error': function() {
                    console.log('errore');
                }
            });

        } else {
            // l'utente ha digitato meno di 2 caratteri
            alert('devi digitare almeno 2 caratteri');
        }
    }

    // funzione per resettare la pagina e prepararla all'inserimento di nuovi risultati
    function reset_risultati() {
        // resetto l'input testuale
        $('#testo-ricerca').val('');
        // nascondo il titolo della pagina
        $('.titolo-ricerca').removeClass('visible');
        // svuoto il contenitore dei risultati
        $('#risultati').empty();
        // $('#risultati .card').remove();
        // $('#risultati').html('');
    }

    // funzione per inserire e visualizzare il titolo con il testo cercato dall'utente
    function contestualizza_risultati(testo_risultati) {
        // inserisco il testo cercato dall'utente nel titolo della pagina
        $('#ricerca-utente').text(testo_risultati);
        // visualizzo il titolo della pagina
        $('.titolo-ricerca').addClass('visible');
    }

    // funzione che recupera i dati e li cicla per poi disegnare la card
    // è comune sia alle chiamate ajax per i film che per le serie
    function gestisci_risposta_api(risposta_api, tipo) {
        // recupero l'array con i risultati della ricerca
        var risultati = risposta_api.results;
        // ciclo su tutti i risultati
        for (var i = 0; i < risultati.length; i++) {
            // recupero il risultato corrente
            var risultato_corrente = risultati[i];
            disegna_card(risultato_corrente, tipo);
        }
    }

    // funzione per appendere una card ai risultati
    function disegna_card(dati, tipologia) {
        // controllo se si tratta di un film o di una serie
        // in modo da leggere i dati con le chiavi corrette
        if(tipologia == 'film') {
            // si tratta di un film => leggo title e original_title
            var titolo_card = dati.title;
            var titolo_originale_card = dati.original_title;
        } else {
            // si tratta di una serie => leggo name e original_name
            var titolo_card = dati.name;
            var titolo_originale_card = dati.original_name;
        }

        // preparo i dati per il template
        var placeholder = {
            'titolo': titolo_card,
            'titolo_originale': titolo_originale_card,
            'lingua': bandiera_lingua(dati.original_language),
            'voto': stelline(normalizza_voto(dati.vote_average)),
            'tipo': tipologia
        };
        var html_card = template(placeholder);
        // appendo la card con i dati del risultato corrente
        $('#risultati').append(html_card);
    }

    // funzione per restituire la bandierina della lingua, se disponibile
    function bandiera_lingua(lingua) {
        var bandiere_disponibili = ['en', 'it'];
        if(bandiere_disponibili.includes(lingua)) {
            // abbiamo a disposizione la bandierina corrispondente alla lingua
            var placeholder = {'codice_lingua': lingua};
            var img_bandiera = template_bandiera(placeholder);
            return img_bandiera;
        }
        // non c'è la bandierina => restituisco la stringa così com'è
        return lingua;
    }

    // funzione per trasformare il voto in numero intero da 1 a 5
    function normalizza_voto(voto) {
        var voto5 = voto / 2;
        return Math.ceil(voto5);
    }

    // funzione che restituisce le stelline piene e vuote in base al voto
    function stelline(numero_stelle) {
        // in totale ci devono essere 5 stelle:
        // (numero_stelle) piene e (5 - numero_stelle) vuote
        var tag_stelle = '';
        for (var i = 1; i <= 5; i++) {
            // devo aggiungere una stella piena o una stella vuota?
            if(i <= numero_stelle) {
                // stella piena
                tag_stelle += '<i class="fas fa-star"></i>';
            } else {
                // stella vuota
                tag_stelle += '<i class="far fa-star"></i>';
            }
        }
        return tag_stelle;
    }

});
