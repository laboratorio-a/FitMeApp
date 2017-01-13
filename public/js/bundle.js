/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Video = __webpack_require__(1);
	
	var _Video2 = _interopRequireDefault(_Video);
	
	var _Firebase = __webpack_require__(2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Variabili Globali
	// Check-In
	var durata = null;
	var markers = [];
	
	// Main
	$(document).ready(function () {
	  console.log('document ready event');
	  $('#carica').on('vclick', function () {
	    console.log('#carica click event');
	    var file = $('#video-input').get(0).files[0];
	    _Video2.default.uploadTestVideo(file);
	  });
	  inizializza();
	  accedi();
	  aggiornaMappa();
	  aggiungiEsperienze();
	  cercaAllenamenti();
	  chat();
	  classifica();
	  controlloCookies();
	  creaAllenamenti();
	  eliminaEsperienze();
	  follow();
	  impostazioni();
	  modificaProfilo();
	  multimediaPopup();
	  notifiche();
	  post();
	  registrati();
	  salta();
	  splashScreen();
	  valutazione();
	});
	
	// TODO: Spostare nell'apposita funzione quando pronta
	$(document).on('vclick', '#scrivi-summary', function () {
	  $.mobile.changePage($(this).attr('href'), 'fade');
	});
	// Swipe
	$(document).on('pagecreate', '.ui-page', function () {
	  $(document).on('swipeleft', '[data-role="page"]', function (event) {
	    if (event.handled !== true) {
	      var nextPage = $(this).next('[data-role="page"]');
	      var id = $.mobile.activePage.attr('id');
	      if (nextPage.length > 0 && id === 'start') {
	        $(':mobile-pagecontainer').pagecontainer('change', nextPage, {
	          transition: 'slide',
	          reverse: false
	        }, true, true);
	        event.handled = true;
	      }
	    }
	    return false;
	  });
	  $(document).on('swiperight', '[data-role="page"]', function (event) {
	    if (event.handled !== true) {
	      var prevPage = $(this).prev('[data-role="page"]');
	      var id = $.mobile.activePage.attr('id');
	      if (prevPage.length > 0 && id === 'tour-1') {
	        $(':mobile-pagecontainer').pagecontainer('change', prevPage, {
	          transition: 'slide',
	          reverse: true
	        }, true, true);
	        event.handled = true;
	      }
	    }
	    return false;
	  });
	});
	
	/**
	 * Inizializzazione
	 *
	 * Gestisce le inizializzazioni degli elementi front-end.
	 */
	function inizializza() {
	  $('body').addClass('ui-alt-icon');
	  $('#menu-principale').panel();
	  $('#popup-notifiche').enhanceWithin().popup();
	  $('#pubblica').hashtags();
	  $('.classifica-griglia li a .valutazione span').addClass('stella-attiva-profilo');
	}
	
	/**
	 * Accesso
	 *
	 * Gestisce le procedure di accesso dell'utente registrato.
	 * - Proprietario e opt-in;
	 */
	function accedi() {
	  console.log('accedi');
	  $('#accedi-login').on('vclick', function () {
	    // TODO: Qui avviene l'invio delle informazioni a firebase
	  });
	  $('#accedi-facebook').on('vclick', function () {
	    // TODO: Qui avviene l'invio delle informazioni a Facebook
	  });
	  $('#accedi-google').on('vclick', function () {
	    console.log('provider');
	    var provider = new firebase.auth.GoogleAuthProvider();
	    // provider.addScope('https://www.googleapis.com/auth/plus.login');
	    // provider.setCustomParameters({
	    //   'login_hint': 'user@example.com'
	    // });
	    _Firebase.auth.onAuthStateChanged(function (user) {
	      console.log('user');
	      console.log(user);
	    });
	    _Firebase.auth.signInWithRedirect(provider);
	    _Firebase.auth.getRedirectResult().then(function (result) {
	      if (result.credential) {
	        // This gives you a Google Access Token.
	        // You can use it to access the Google API.
	        var token = result.credential.accessToken;
	        // ...
	      }
	      // The signed-in user info.
	      var user = result.user;
	    }).catch(function (error) {
	      console.log(error);
	      // TODO: Handle Errors here.
	    });
	  });
	}
	
	/**
	 * Aggiorna Mappa
	 *
	 * Gestisce le funzionalità di caricamento della mappa
	 */
	function aggiornaMappa() {
	  $('#aggiorna-mappa').on('vclick', function () {
	    google.maps.event.trigger(mappa, 'resize');
	    toast('Mappa aggiornata');
	  });
	}
	
	/**
	 * Aggiungi Esperienze
	 *
	 * Gestisce le funzionalità di aggiunta degli elementi descrittivi
	 * nel profilo utente
	 * - url: localhost non è consentito. Verificare in produzione
	 */
	function aggiungiEsperienze() {
	  $('[data-name="esperienze"]').on('vclick', function () {
	    $('#aggiungi-esperienza-popup h2').html('Aggiungi Esperienza');
	  });
	  $('[data-name="qualifiche"]').on('vclick', function () {
	    $('#aggiungi-esperienza-popup h2').html('Aggiungi Qualifica');
	  });
	  $(document).on('submit', '#form-aggiungi-popup', function () {
	    if ($('#form-aggiungi-popup input[required]').val().length > 0) {
	      $.ajax({
	        type: 'POST',
	        async: 'true',
	        url: window.location.href + '#profilo',
	        data: $('#form-aggiungi-popup').serializeArray(),
	        beforeSend: function beforeSend() {
	          $.mobile.loading('show');
	        },
	        complete: function complete() {
	          $.mobile.loading('hide');
	        },
	        success: function success(response) {
	          var _this = this;
	
	          $('' + '<div id="alfa" class="ui-body sfondo-primario' + 'anagrafica-container">' + '<div class="ui-grid-a anagrafica">' + '<div class="ui-block-a deseleziona">' + '<span class="evidenza">' + response[0].titolo + '</span>' + '<p class="palestra-esperienza">' + response[0].presso + '</p>' + '</div>' + '<div class="ui-block-b anno-esperienza">' + '<span>' + response[0].data + '</span>' + '<span href="#"' + 'class="ui-btn ui-shadow ui-corner-all ui-icon-delete' + 'ui-btn-icon-notext elimina-esperienza">' + '</span>' + '</div>' + '</div>' + '</div>' + '').insertAfter('.esperienze .titolo-sezione');
	          toast('Esperienza aggiunta');
	          $('#form-aggiungi-popup').each(function () {
	            $(_this).reset();
	          });
	        },
	        error: function error(_error) {
	          toast('Errore: ' + _error + ' - Impossibile aggiungere esperienza');
	        }
	      });
	    } else {
	      toast('Errore: compilare i campi richiesti');
	    }
	    return false;
	  });
	  // TODO: Caricamento/Memorizzazione stato/dati su DB
	}
	
	/**
	 * Allenamenti - Callback
	 * Gestisce le procedure di invocazione dei rispettivi
	 * marker per ogni utente.
	 * @param {results} results - Oggetto Collezione Markers
	 */
	window.allenamentiCallback = function (results) {
	  var _loop = function _loop(i) {
	    var coords = results.features[i].geometry.coordinates;
	    var latLng = new google.maps.LatLng(coords[0], coords[1]);
	    /**
	     * TODO: Decommentare in fase di integrazione DB.
	     * Stampa automaticamente le stelle in base alla proprietà 'valutazione'
	    let valutazione = results.features[i].properties.valutazione;
	    let stelle = null;
	    switch (valutazione) {
	    case 1:
	      stelle = '<span class="stella stella-attiva"></span>';
	      break;
	    case 2:
	      stelle = '<span class="stella stella-attiva"></span>'+
	        '<span class="stella stella-attiva"></span>';
	      break;
	    case 3:
	      stelle = '<span class="stella stella-attiva"></span>'+
	        '<span class="stella stella-attiva"></span>'+
	        '<span class="stella stella-attiva"></span>';
	      break;
	    case 4:
	      stelle = '<span class="stella stella-attiva"></span>'+
	        '<span class="stella stella-attiva"></span>'+
	        '<span class="stella stella-attiva"></span>'+
	        '<span class="stella stella-attiva"></span>';
	      break;
	    case 5:
	      stelle = '<span class="stella stella-attiva"></span>'+
	        '<span class="stella stella-attiva"></span>'+
	        '<span class="stella stella-attiva"></span>'+
	        '<span class="stella stella-attiva"></span>'+
	        '<span class="stella stella-attiva"></span>';
	      break;
	    default:
	      stelle = null;
	    }
	    */
	    var contatta = null;
	    if (results.features[i].properties.contatta === true) {
	      contatta = '<a id="contatta-chat" href="#chat" ' + 'class="contatta-info ui-btn ui-btn-inline">CONTATTA</a>';
	    } else {
	      contatta = '';
	    }
	    var contentString = '<div id="content">' + '<div id="siteNotice">' + '</div>' + '<div id="bodyContent">' + '<div class="container-info">' + '<div class="container-avatar-info"' + ' style="background-image: url(' + results.features[i].properties.avatar + ');"></div>' + '<div class="container-user-info">' + '<h2 class="nome-info">' + results.features[i].properties.nome + ' ' + results.features[i].properties.cognome + '</h2>' + '<span class="titolo-info">' + results.features[i].properties.tipo + '</span>' + '<div class="valutazione">' +
	    // TODO: Eliminare in fase di integrazione DB
	    '<span class="stella stella-mappa stella-attiva disattiva"></span>' + '<span class="stella stella-mappa stella-attiva disattiva"></span>' + '<span class="stella stella-mappa stella-attiva disattiva"></span>' + '<span class="stella stella-mappa stella-attiva disattiva"></span>' + '<span class="stella stella-mappa stella-attiva disattiva"></span>' +
	    /**
	     * TODO: Decommentare in fase di integrazione DB
	     * Stampa automaticamente le stelle in base alla proprietà 'valutazione'
	    stelle +
	    */
	    '</div>' + '</div>' + '<div class="container-training-info">' + '<div>Allenamento: ' + '<span class="tipo-info evidenza">' + results.features[i].properties.allenamento + '</span></div>' + '<div>Presso: ' + '<span class="indirizzo-info evidenza">' + results.features[i].properties.indirizzo + '</span></div>' + '</div>' + '<hr>' + '<div class="social-info">' +
	    /* TODO: Questo like deve comparire in bacheca come un aggiornamento e
	     * nelle notifiche dell'utente destinatario
	     */
	    '<a href="#" class="like-info"><i aria-hidden="true"></i> Mi piace</a>' + contatta + '</div>' + '</div>' + '</div>' + '</div>';
	    var infowindow = new google.maps.InfoWindow({
	      content: contentString,
	      maxWidth: 220,
	      minHeight: 186
	    });
	    var marker = creaMarker(latLng, mappa, results.features[i].properties.indirizzo);
	    marker.addListener('click', function () {
	      infowindow.open(mappa, marker);
	    });
	  };
	
	  for (var i = 0; i < results.features.length; i++) {
	    _loop(i);
	  }
	  $(document).on('vclick', '.like-info', function () {
	    if (!$('i', this).hasClass('fa fa-thumbs-up')) {
	      $('i', this).addClass('fa fa-thumbs-up');
	      $(this).addClass('opaco');
	      toast('Hai messo mi piace al workout di ' + $(this).parents('.container-info').find('.nome-info').text());
	    } else {
	      $('i', this).removeClass('fa fa-thumbs-up');
	      $(this).removeClass('opaco');
	    }
	  });
	  $(document).on('vclick', '.contatta-info', function () {
	    $.mobile.changePage($(this).attr('href'), 'fade');
	  });
	};
	
	/**
	 * Classifica
	 *
	 * Gestisce le procedure di:
	 * - Caricamento dei dati relativi ai profili degli utenti,
	 * ordinati in base alla valutazione;
	 * - Filtraggio dei risultati caricati, in base ai criteri
	 * selezionati.
	 */
	function classifica() {
	  // TODO: Caricamento/Memorizzazione stato/dati su DB
	  $('.filtra-valutazione').change(function () {
	    if ($(this).is(':checked')) {
	      toast('Contenuti filtrati');
	    }
	  });
	  $('.filtra-valutazione').on('vclick', function () {
	    // TODO: Caricamento per 'valutazione'
	  });
	  $('.filtra-like').change(function () {
	    if ($(this).is(':checked')) {
	      toast('Contenuti filtrati');
	    }
	  });
	  $('.filtra-like').on('vclick', function () {
	    // TODO: Caricamento per 'valutazione'
	  });
	}
	
	/**
	 * Controllo Cookies
	 *
	 * Gestisce le procedure di disattivazione dei servizi di tracciamento:
	 * - Cookies tecnici (autenticazione, ecc.);
	 * - Google Analytics, tracking cookies, ecc.
	 */
	function controlloCookies() {
	  /**
	   * TODO: In futuro, con l'implementazione di tali risorse, gestire la
	   * disattivazione di tali servizi, in base al controllo sullo stato della
	   * relativa impostazione
	   */
	  if (typeof Storage !== 'undefined') {
	    if (window.localStorage.getItem('cookiesImpostazioni') !== null) {
	      // Disattiva Cookies
	    }
	  } else {
	    toast('Cookies disabilitati. Alcune funzioni sono disattivate');
	  }
	}
	
	/**
	 * Cerca Allenamenti
	 *
	 * Gestisce le procedure di ricerca e filtraggio degli allenamenti attivi,
	 * in base ai criteri selezionati
	 */
	function cercaAllenamenti() {
	  $(document).on('submit', '#checkin-form', function (e) {
	    e.preventDefault();
	    for (var i = 0; i < markers.length; i++) {
	      if ($('#categoria-checkin').val() !== markers[i].address) {
	        var _marker = markers[i].address;
	        // TODO: da debuggare - decommenta per errore -> marker.setMap(null);
	      }
	      if ($('#citta-checkin').val() !== markers[i].latLng) {
	        var _marker2 = markers[i].latLng;
	        // TODO: da debuggare - decommenta per errore -> marker.setMap(null);
	      }
	      /**
	       * TODO: Implementare la condizione per la distanza
	       * (dipende dal marker dell'allenamento dell'utente utilizzatore)
	       * let markerUtente = <oggetto marker restituito>
	       * let distanza =
	       * google.maps.geometry.spherical
	       * .computeDistanceBetween(markerUtente.coordinate,
	       * $('#distanza-checkin').val());
	       */
	    }
	    toast('Trovati' + $('#container-info').length + 'allenamenti');
	    return false;
	  });
	  // TODO: Caricamento/Memorizzazione stato/dati su DB
	}
	
	/**
	 * Chat
	 *
	 * Gestisce le procedure di ricezione ed invio dei messaggi
	 * tra gli utenti
	 */
	function chat() {
	  $('#scrivi-summary, #contatta').on('vclick', function (e) {
	    /** TODO: Implementare l'acquisizione dell'ID dei due utenti,
	     * in modo da caricare successivamente la pagina con i rispettivi
	     * accounts e le conversazioni precedenti.
	     */
	    e.preventDefault();
	    $(':mobile-pagecontainer').pagecontainer('change', '#chat', {
	      transition: 'slide',
	      reverse: false
	    }, true, true);
	  });
	  $('#blocca-chat').on('vclick', function () {
	    /**
	     * TODO: Implementare il blocco dell'utente.
	     * Sostituire 'nickname' col nome corrispondente
	     */
	    toast('Utente ' + $('.nickname.destinatario .nome-chat').eq(0).text() + ' bloccato');
	  });
	  $('#cancella-chat').on('vclick', function () {
	    $('#chat .ui-body').remove();
	    toast('Conversazione svuotata');
	  });
	  $(document).on('submit', '#invia-chat', function () {
	    // TODO: Invocazione notifica
	    notifiche('messaggio');
	  });
	  // TODO: Caricamento/Memorizzazione stato/dati su DB
	}
	
	/**
	 * Crea Allenamenti
	 *
	 * Gestisce le procedure di aggiunta deu nuovi allenamenti sulla mappa
	 * - url: localhost non è consentito. Verificare in produzione
	 */
	function creaAllenamenti() {
	  $('#conferma').on('vclick', function () {
	    if (typeof Storage !== 'undefined') {
	      window.localStorage.setItem('privacyGeo', 'ok');
	    } else {
	      toast('Cookies disabilitati. Alcune funzioni sono disattivate');
	    }
	  });
	  $(document).on('submit', '#form-checkin-crea', function (e) {
	    e.preventDefault();
	    if ($('#form-checkin-crea input[required]').val().length > 0) {
	      durata = $('durata-checkin-crea').val();
	      $.ajax({
	        type: 'POST',
	        async: 'true',
	        url: window.location.href + '#checkin',
	        data: $('#form-checkin-crea').serializeArray(),
	        beforeSend: function beforeSend() {
	          $.mobile.loading('show');
	        },
	        complete: function complete() {
	          $.mobile.loading('hide');
	        },
	        success: function success(response) {
	          var _this2 = this;
	
	          allenamentiCallback.features.push({
	            'type': 'Feature',
	            'properties': {
	              // TODO: Sostituire inputs con dati dell'utente attivo da DB
	              'avatar': '../img/avatar.png',
	              'nome': 'Pippo',
	              'cognome': 'Baudo',
	              'tipo': 'Fitter',
	              'valutazione': '3',
	              'allenamento': response[0].categoria - checkin - crea,
	              'indirizzo': response[0].localita - checkin - crea,
	              'durata': response[0].durata - checkin - crea * 60000,
	              'contatta': response[0].contatta - checkin - crea
	            },
	            'geometry': {
	              'type': 'Point',
	              'coordinates': estraiCoordinate(response[0].localita - checkin - crea)
	            }
	          });
	          $.mobile.changePage('#checkin', 'fade');
	          toast('Allenamento creato');
	          $('#form-checkin-crea').each(function () {
	            $(_this2).reset();
	          });
	        },
	        error: function error(_error2) {
	          toast('Errore: ' + _error2 + ' - Impossibile creare allenamento');
	        }
	      });
	    } else {
	      toast('Errore: compilare i campi richiesti');
	    }
	    return false;
	  });
	  // TODO: Caricamento/Memorizzazione stato/dati su DB
	}
	
	/**
	 * Crea Marker
	 *
	 * Gestisce le procedure di creazione e rimozione dinamica
	 * dei marker della mappa
	 * @param {latLng} latLng - Coordinate di posizione
	 * @param {mappa} mappa - Oggetto mappa
	 * @param {indirizzo} indirizzo - Indirizzo allenamento
	 * @return {marker} marker - Oggetto Marker generato
	 */
	function creaMarker(latLng, mappa, indirizzo) {
	  var marker = new google.maps.Marker({
	    position: latLng,
	    map: mappa,
	    icon: '../img/marker-mappa.png',
	    title: 'Allenamenti in corso',
	    address: indirizzo
	  });
	  markers.push(marker);
	  if (durata !== null) {
	    setTimeout(function () {
	      marker.setMap(null);
	      delete marker.position;
	      delete marker.map;
	      delete marker.icon;
	      delete marker.title;
	    }, durata);
	  }
	  return marker;
	}
	
	/**
	 * Elimina Esperienze
	 *
	 * Gestisce le funzionalità di cancellazione degli elementi descrittivi
	 * nel profilo utente
	 */
	function eliminaEsperienze() {
	  $('.elimina-esperienza').on('vclick', function () {
	    $(this).parents('.anagrafica-container').remove();
	    toast('Esperienza eliminata');
	  });
	  // TODO: Caricamento/Memorizzazione stato/dati su DB
	}
	
	/**
	 * Estrai Coordinate
	 *
	 * Gestisce le funzionalità di estrazione di coordinate geografiche
	 * a partire da un indirizzo
	 * @param {localita} localita - Indirizzo inseito dall'utente
	 */
	function estraiCoordinate(localita) {
	  var geocoder = new google.maps.Geocoder();
	  var indirizzo = null;
	  geocoder.geocode({
	    'address': localita
	  }, function (results, status) {
	    if (status === google.maps.GeocoderStatus.OK) {
	      var latitudine = results[0].geometry.location.lat();
	      var longitudine = results[0].geometry.location.lng();
	      indirizzo = '[' + latitudine + ', ' + longitudine + ']';
	    } else {
	      toast('Errore: Impossibile localizzare il dispositivo');
	    }
	    return indirizzo;
	  });
	}
	
	/**
	 * Follow
	 *
	 * Gestisce le funzionalità di feed di:
	 * - Profili;
	 * - Bacheche;
	 * - Varie ed eventuali;
	 */
	function follow() {
	  $('#segui-summary').on('vclick', function () {
	    if (!$(this).hasClass('seguito')) {
	      $(this).addClass('seguito');
	      $(this).html('Seguito');
	      toast('Profilo seguito');
	    } else {
	      $(this).removeClass('seguito');
	      $(this).html('Segui');
	      toast('Profilo rimosso');
	    }
	  });
	  // TODO: Invocazione notifica
	  // notifiche();
	  // TODO: Caricamento/Memorizzazione stato/dati su DB
	}
	
	/**
	 * Modifica Profilo
	 *
	 * Gestisce la modifica dei dati personali
	 * - url: localhost non è consentito. Verificare in produzione
	 */
	function modificaProfilo() {
	  $(document).on('submit', '#form-modifica-profilo', function () {
	    if ($('#form-modifica-profilo input[required]').val().length > 0) {
	      $.ajax({
	        type: 'POST',
	        async: 'true',
	        url: window.location.href + '#profilo',
	        data: $('#form-modifica-profilo').serializeArray(),
	        beforeSend: function beforeSend() {
	          $.mobile.loading('show');
	        },
	        complete: function complete() {
	          $.mobile.loading('hide');
	        },
	        success: function success(response) {
	          var _this3 = this;
	
	          $('#profilo .avatar').attr('style', 'background-image: url(img/' + response[0].avatar - modifica + '');
	          $('#profilo .nome-profilo').html(response[0].nome - modifica);
	          $('#profilo .sesso-profilo').html(response[0].sesso - modifica);
	          $('#profilo .eta-profilo').html(response[0].eta - modifica);
	          $('#profilo .citta-profilo').html(response[0].luogo - modifica);
	          $.mobile.changePage('#profilo', 'fade');
	          toast('Profilo aggiornato');
	          $('#form-modifica-profilo').each(function () {
	            $(_this3).reset();
	          });
	        },
	        error: function error(_error3) {
	          toast('Errore: ' + _error3 + ' - Impossibile aggiornare il profilo');
	        }
	      });
	    } else {
	      toast('Errore: compilare i campi richiesti');
	    }
	    return false;
	  });
	  // TODO: Caricamento/Memorizzazione stato/dati su DB
	}
	
	/**
	 * Multimedia - Popup
	 *
	 * Gestisce l'apertura dinamica di foto e video a tutto schermo
	 */
	function multimediaPopup() {
	  $('#multimedia a').on('vclick', function () {
	    var url = $('.foto-video', this).attr('data-url');
	    $('.multimedia-popup-foto').attr('src', url);
	    $('#multimedia-popup').removeClass('ui-overlay-shadow');
	  });
	  $('.multimedia-post').on('vclick', function () {
	    var url = $('img', this).attr('src');
	    // TODO: Inizializzare variabile con path video destinazione
	    var urlVideo = void 0;
	    $('#multimedia-post-popup img, #multimedia-post-popup video').remove();
	    if ($(this).attr('data-ext') === 'foto') {
	      $('#multimedia-post-popup').append('<img class="multimedia-popup-foto" src="' + url + '" alt="">');
	    } else if ($(this).attr('data-ext') === 'video') {
	      $('#multimedia-post-popup video').remove();
	      $('#multimedia-post-popup').append('<video class="multimedia-popup-video" poster="' + url + '" type="video/mp4" controls>' + '<source src="' + urlVideo + '"</source>' + '</video>');
	    }
	    $('#multimedia-post-popup').removeClass('ui-overlay-shadow');
	  });
	  $('.like-bacheca a:not(".commenta"), .like-popup a').on('vclick', function () {
	    $('i', this).toggleClass('fa fa-thumbs-up');
	  });
	  // TODO: Caricamento/Memorizzazione stato/dati su DB
	}
	
	/**
	 * Notifiche
	 *
	 * Gestisce il sistema di notifiche. Ogni azione che coinvolge un'interazione
	 * con un'altro utente, genera una notifica.
	 * - Stati di ricezione e lettura;
	 * - Aspetto;
	 * @param {tipo} tipo - Identifica il tipo di notifica:
	 * - Nuovo messaggio;
	 * - Tutto il resto;
	 */
	function notifiche(tipo) {
	  /* TODO: Riattivare stati in fase back-end
	  * Output automatico dei messaggi di notifica in base all'azione
	  * Al trigger di un evento viene invocata la proprietà corrispondente
	  * e resa come testo in notifica.
	  * Legenda:
	  * evento -> .evento-notifica
	  ** like -> .social-keyword
	  * oggetto -> .oggetto-notifica
	  let stati = {
	    'evento': {
	      'azione': {
	        'messo': 'ha messo',
	        'like': 'mi piace',
	      },
	      'commento': 'ha commentato',
	      'valutazione': {
	        'voto': 'ti ha valutato',
	      },
	      'aggiornamento': 'ha aggiornato',
	      'pubblicazione': 'ha pubblicato',
	      'modifica': 'ha modificato',
	      'follow': {
	        'segue': 'ora segue',
	        'seguito': 'ti segue',
	      },
	      'messaggio': {
	        'ricevuto': 'ti ha mandato un messaggio',
	      },
	    },
	    'oggetto': {
	      'like-foto': 'alla tua foto',
	      'like-foto-utente': 'alla sua foto',
	      'like-video': 'al tuo video',
	      'like-video-utente': 'al suo video',
	      'commento-foto': 'la tua foto',
	      'commento-foto-utente': 'la sua foto',
	      'commento-video': 'il tuo video',
	      'commento-video-utente': 'il suo video',
	      'aggiornamento-avatar': 'la sua foto del profilo',
	      'aggiornamento-nome': 'il suo nome',
	      'aggiornamento-eta': 'la sua età',
	      'aggiornamento-citta': 'la sua città',
	      'pubblicazione-esperienza': 'una nuova esperienza',
	      'pubblicazione-qualifica': 'una nuova qualifica',
	      'pubblicazione-foto': 'una nuova foto',
	      'pubblicazione-video': 'un nuovo video',
	      'modifica-foto': 'una sua foto',
	      'modifica-video': 'un suo video',
	    },
	  };
	  */
	  $('.link-notifica[data-state="unread"] .notifica-container').addClass('sfondo-accento');
	  if ($('.link-notifica[data-state="unread"]').length > 0) {
	    $('<a href="#" class="notifica-badge ui-btn ui-corner-all' + 'ui-btn-icon-notext ui-btn-b"></a>' + '').insertBefore('#notifiche-pulsante');
	  }
	  if (tipo === 'messaggio') {
	    $('.notifica-badge').removeClass('ui-icon-star');
	    $('.notifica-badge').addClass('ui-icon-comment');
	  } else {
	    $('.notifica-badge').removeClass('ui-icon-comment');
	    $('.notifica-badge').addClass('ui-icon-star');
	  }
	}
	
	/**
	 * Posting
	 *
	 * Gestisce le azioni di pubblicazione degli inputs degli utenti.
	 * - Bacheca
	 * -- Status;
	 * -- Foto;
	 * -- Video;
	 * TODO: La gestione dei testi predefiniti dei post segue lo stesso sistema
	 * utilizzato per le notifiche (vedi funzione).
	 */
	function post() {
	  var placeholder = $('#pubblica').val();
	  $('#post-foto-link').on('vclick', function () {
	    $('#container-video-sfoglia').slideUp();
	    $('#container-foto-sfoglia').slideDown();
	  });
	  $('#post-video-link').on('vclick', function () {
	    $('#container-foto-sfoglia').slideUp();
	    $('#container-video-sfoglia').slideDown();
	  });
	  $('.mi-piace').on('vclick', function () {
	    if ($('i', this).hasClass('fa fa-thumbs-up')) {
	      $(this).addClass('opaco');
	      toast('Hai messo mi piace al post di ' + $(this).parents('.post-container').find('.post-notifiche .utente-post').text());
	      // TODO: Invocazione notifica
	      // notifiche();
	    }
	  });
	  $('.commenta').on('vclick', function () {
	    $(this).addClass('opaco');
	    $(this).parent().next().slideDown();
	  });
	  $('#pubblica, .pubblica-commento').focus(function () {
	    if ($(this).val() === placeholder) {
	      $(this).val('');
	      $(this).css('color', '#fff');
	    }
	  });
	  $('#pubblica, .pubblica-commento').blur(function () {
	    if ($(this).val() === '') {
	      $(this).val(placeholder);
	      $(this).css('color', '#3C3C3B');
	    }
	  });
	  $('#ricerca-avanzata').on('vclick', function (e) {
	    e.preventDefault();
	    $('#ricerca-avanzata-container').slideDown();
	  });
	  $(document).on('submit', '#form-post-bacheca, #form-post-commenti', function () {
	    // TODO: Invocazione notifica
	    // notifiche();
	  });
	  $(document).on('submit', '#form-ricerca', function () {
	    // TODO: Implementare ricerca da DB
	    toast('Ricerca effettuata');
	  });
	  $(document).on('submit', '#form-filtro-contenuti', function () {
	    // TODO: Implementare filtro da DB
	    toast('Contenuti filtrati');
	  });
	  $(document).on('pagecontainerchange', function () {
	    $('.commenta').removeClass('opaco');
	    $('.container-sfoglia-post, .commenti-bacheca').slideUp();
	  });
	}
	
	/**
	 * Registrazione
	 *
	 * Gestisce le procedure di registrazione dell'utente ospite.
	 */
	function registrati() {
	  $('#registrati-login').on('vclick', function () {
	    $(':mobile-pagecontainer').pagecontainer('change', '#registrazione', {
	      transition: 'slide',
	      reverse: false
	    }, true, true);
	  });
	  $('#registrati-signup').on('vclick', function () {
	    // TODO: Qui avviene l'invio delle informazioni a firebase
	  });
	}
	
	/**
	 * Salta tour iniziale
	 *
	 * Verifica se è il primo avvio od un successivo;
	 * Determina la visualizzazione o l'oscuramento del tutorial iniziale.
	 */
	function salta() {
	  if (typeof Storage !== 'undefined') {
	    if (window.localStorage.getItem('tour') !== null) {
	      $('.tour').remove();
	    } else {
	      $('#salta, #avvia').on('vclick', function () {
	        window.localStorage.setItem('tour', 'disattivo');
	      });
	    }
	  } else {
	    toast('Cookies disabilitati. Alcune funzioni sono disattivate');
	  }
	}
	
	/**
	 * Splash Screen
	 */
	function splashScreen() {
	  if (typeof Storage !== 'undefined') {
	    if (window.localStorage.getItem('tour') !== null) {
	      setTimeout(function () {
	        $.mobile.changePage('#accesso', 'fade');
	        $('#splash').remove();
	      }, 3000);
	    } else {
	      setTimeout(function () {
	        $.mobile.changePage('#start', 'fade');
	        $('#splash').remove();
	      }, 3000);
	    }
	  } else {
	    toast('Cookies disabilitati. Alcune funzioni sono disattivate');
	  }
	}
	
	/**
	 * Toast
	 * @param {string} messaggio - Testo della notifica
	 * Gestisce le notifiche di sistema.
	 */
	function toast(messaggio) {
	  $('<div id="toast" ' + 'class="ui-loader ui-overlay-shadow ui-body-a ui-corner-all"><h3>' + messaggio + '</h3></div>').css({
	    'display': 'block',
	    'position': 'fixed',
	    'text-align': 'center',
	    'width': '270px',
	    'z-index': 9999,
	    'font-size': '.8rem',
	    'top': 'auto',
	    'left': '0',
	    'right': '0',
	    'margin': '0 auto',
	    'bottom': '2em' }).appendTo($.mobile.pageContainer).delay(1500).fadeOut(400, function () {
	    $(this).remove();
	  });
	}
	
	/**
	 * Valutazione
	 * Gestisce le interazioni con il sistema di valutazione utente:
	 * - Selezione e aspetto;
	 */
	function valutazione() {
	  $('.stella').hover(function () {
	    if (!$('.stella').hasClass('stella-attiva-click')) {
	      if ($(this).hasClass('stella-profilo')) {
	        $(this).addClass('stella-attiva stella-attiva-profilo');
	        $(this).prevAll().addClass('stella-attiva stella-attiva-profilo');
	      } else {
	        $(this).addClass('stella-attiva');
	        $(this).prevAll().addClass('stella-attiva');
	      }
	    }
	  }, function () {
	    if (!$('.stella').hasClass('stella-attiva-click')) {
	      $('.stella').removeClass('stella-attiva stella-attiva-profilo');
	    }
	  });
	  $('.stella').on('vclick', function () {
	    if ($(this).hasClass('stella-profilo')) {
	      $('.stella').removeClass('stella-attiva stella-attiva-profilo stella-attiva-click');
	      $(this).addClass('stella-attiva stella-attiva-profilo stella-attiva-click');
	      $(this).prevAll().addClass('stella-attiva stella-attiva-profilo' + ' stella-attiva-click');
	    } else {
	      $('.stella').removeClass('stella-attiva stella-attiva-click');
	      $(this).addClass('stella-attiva stella-attiva-click');
	      $(this).prevAll().addClass('stella-attiva stella-attiva-click');
	    }
	    toast('Votazione effettuata');
	  });
	  // TODO: Caricamento/Memorizzazione stato/dati su DB
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Firebase = __webpack_require__(2);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Video = function () {
	  function Video() {
	    _classCallCheck(this, Video);
	  }
	
	  _createClass(Video, null, [{
	    key: 'getVideo',
	    // eslint-disable-line
	    value: function getVideo() {// eslint-disable-line
	    }
	  }, {
	    key: 'uploadTestVideo',
	    value: function uploadTestVideo(file) {
	      // eslint-disable-line
	      console.log('uploadTestVideo');
	
	      var testVideoEntry = _Firebase.db.ref('test-videos').push({
	        uploadedAt: _Firebase.TIMESTAMP,
	        originalFilename: 'test-video.mp4',
	        status: 'incomplete'
	      });
	
	      var testVideoKey = testVideoEntry.key;
	      console.log('testVideoKey:' + testVideoKey);
	      var testVideoRef = _Firebase.store.ref('/videos/' + testVideoKey);
	      testVideoRef.put(file).then(function (snapshot) {
	        // eslint-disable-line
	        console.log('Updating record');
	        testVideoEntry.update({
	          status: 'complete'
	        }, function () {
	          console.log('Record updated');
	        });
	      });
	
	      return testVideoKey;
	    }
	
	    /*
	    TODO: dal getter viene restituito un JSON
	    riadattare se necessario i parametri
	    */
	
	  }, {
	    key: 'setTestVideoData',
	    value: function setTestVideoData(uuid) {
	      // eslint-disable-line
	      console.log('setTestVideoData');
	      _Firebase.db.ref('test-video').set({
	        uuid: uuid
	      });
	    }
	  }]);
	
	  return Video;
	}();
	
	exports.default = Video;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var firebaseConfig = {
	  apiKey: 'AIzaSyAssBBEv9KKOeqH0lFVDemuC5FE21-i8lo',
	  authDomain: 'fitmeapp-64482.firebaseapp.com',
	  databaseURL: 'https://fitmeapp-64482.firebaseio.com',
	  storageBucket: 'fitmeapp-64482.appspot.com',
	  messagingSenderId: '407537037152'
	};
	
	firebase.initializeApp(firebaseConfig);
	
	var store = firebase.storage();
	var db = firebase.database();
	var auth = firebase.auth();
	var TIMESTAMP = firebase.database.ServerValue.TIMESTAMP;
	// const fileRef = ref.child('test-video.avi');
	
	exports.auth = auth;
	exports.db = db;
	exports.store = store;
	exports.TIMESTAMP = TIMESTAMP;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map