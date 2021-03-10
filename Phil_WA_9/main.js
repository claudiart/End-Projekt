$(document).ready( function() {
  var radio, richtig;
  let questionObj = {};
  let idCounter;
  let id;

  let dialog;
  let form = $('form'); 
  let xmlLoad;

  
// JQuery UI  /*
  // Dialog
  dialog = $('#dialog-form').dialog({
      autoOpen: false,
      height: 450,
      width: 550,
      modal: true,
      buttons: {
        "Frage speichern": saveBtn,
        Schließen: function() {
          form[ 0 ].reset();
          $( this ).dialog( "close" );
        }
      },
      close: function() {
        $( this ).dialog( "close" );        
        //form[ 0 ].reset();
        //allFields.removeClass( "ui-state-error" );
      }
  });
  // Radio Checkbox
  $( 'input.radio' ).checkboxradio({
    icon: false,
  });
  // Accordion
  $('#fragen-acc').accordion();
  // Buttons
  $('button').button();
 
  


    loadQuest();




  // Server Anfragen: Vorhandene Fragen abrufen
    function loadQuest() {
      $.ajax({
        url:'http://wifi.1av.at/quizdata.php',
        method:'post',
        data:{
          db: 'phil',       
          function: 'get'   
        },
        success:function( response ) {
          xmlLoad = response.daten;
          console.log('ajax-load: ', xmlLoad);

          console.log('xmlLoad.length ', xmlLoad.length)
          createAccordEntry();


        },
        error:function() {
          console.log( 'XHR Error' );
        }
      }) // ajax

    }

    function createAccordEntry() {
      $( '#fragen-acc' ).empty();
      idCounter = 0;
      for ( let i in xmlLoad ) {
        $( '<h3>ID-'+idCounter+': '+xmlLoad[i][0]+'</h3>' )
        .appendTo ( '#fragen-acc' );
        $( '<div>' )
        .append( $('body>.accordion-temp>*').clone() )
        .appendTo('#fragen-acc')

        let antw1 = $('#fragen-acc .antwAcc1').eq(i).html('A: ' + xmlLoad[i][1]);
        let antw2 = $('#fragen-acc .antwAcc2').eq(i).html('B: ' + xmlLoad[i][2]);
        let antw3 = $('#fragen-acc .antwAcc3').eq(i).html('C: ' + xmlLoad[i][3]);
        let antw4 = $('#fragen-acc .antwAcc4').eq(i).html('D: ' + xmlLoad[i][4]);
  
        let richtigeAntwort = (xmlLoad[i][5]*1)+1;

        if ( richtigeAntwort == 1) {
          antw1.addClass('richtig'); 
        } else if (richtigeAntwort == 2) {
          antw2.addClass('richtig'); 
        } else if (richtigeAntwort == 3) {
          antw3.addClass('richtig'); 
        } else if (richtigeAntwort == 4) {
          antw4.addClass('richtig'); 
        } else {
          console.log('keine richtige Antwort');
        }
        

        // Delete Btn Abfragen und Ausführen
        $('button.btnDelete').eq(i).attr("data", i);
        $('button.btnDelete').eq(i).on('click', function(){
          let deleteId = $(this).attr("data") 
          console.log('deleteId',deleteId*1);  
          deleteQuest(deleteId*1)        
        })
        // => saveQuest, aber ID modifizieren + Werte aufrufen
        


        // Update Btn Abfragen und Ausführen
        $('button.btnUpdate').eq(i).attr("data", i);
        $('button.btnUpdate').eq(i).on('click', function(){
          let updateId = $(this).attr("data"); 
          id = updateId*1;
          console.log('updateId', updateId*1);  
          /*
          console.log(xmlLoad[i][0]);
          console.log(xmlLoad[i][1]);
          console.log(xmlLoad[i][2]);
          console.log(xmlLoad[i][3]);
          console.log(xmlLoad[i][4]);
          console.log(xmlLoad[i][5]);
          */
          dialog.dialog('open');          
          checkRadio();

          $('#frage').val(xmlLoad[i][0]);
          $('#antwA').val(xmlLoad[i][1]);
          $('#antwB').val(xmlLoad[i][2]);
          $('#antwC').val(xmlLoad[i][3]);
          $('#antwD').val(xmlLoad[i][4]);
          richtig =  xmlLoad[i][5]*1;
          richtAntwFärben();


          //$('input.radio').eq(xmlLoad[i][5]+1).prop('checked', true);
          $('input.radio').eq(xmlLoad[i][5]*1).prop('checked', true);
          console.log((xmlLoad[i][5]*1)+1);
          console.log('id: ', updateId*1);
          $( 'input.radio' ).checkboxradio('refresh');

        })
        


        idCounter++;

        $( "#fragen-acc" ).accordion( "refresh" );



      }


    }


    
  // Ausühren OnClick - Neue Frage Anlegen (Dialog-Fenster)
    $('#newQBtn').on('click', function(){
      dialog.dialog('open');
      checkRadio();
      id = -1;
    })

    function checkRadio() {
      $('input.radio').on('change', function(e){
        richtig = $( e.target ).val(); 
        console.log(richtig);
        richtAntwFärben();
      }) 
    }



  // Speichern auf Server  
    function saveBtn() {
      getNewQuestValues();
        if ( questionObj.frage == "" || questionObj.antwort[0] == "" ||  questionObj.antwort[1] == "" || questionObj.antwort[2] == "" || questionObj.antwort[3] == "" ) {
          alert('Sämtliche Felder müssen ausgefüllt sein..!');
        } else {
          saveQuest( questionObj.id, questionObj.frage, questionObj.richtig, questionObj.antwort );
        }
    } 

    // Server Speichen: Neue Frage anlegen
    function saveQuest() {
      $.ajax({
        url:'http://wifi.1av.at/quizdata.php',
        method:'post',
        data:{
          db: 'phil',       
          function: 'save',   
          id: questionObj.id,
          frage: questionObj.frage,
          richtig: questionObj.richtig,
          antwort: questionObj.antwort
        },
        success:function( response ) {    
          console.log(response);

          loadQuest()

          form[ 0 ].reset();
          $('#antwA, #antwB, #antwC, #antwD ').removeClass('richtAntwInput');

        },
        error:function() {
          console.log( 'XHR Error' );
          alert('Sämtliche Felder müssen ausgefüllt sein..!');
        }
      }) // ajax

    }

    function getNewQuestValues() {
      let antwortTemp = [];         
      //id = -1;  
      frage = $('#frage').val();
      antwortTemp = $('.antwtxt').each( function() {    
                    antwortTemp.push($(this).val());
                    }) 
       antwort = [antwortTemp[0].value, antwortTemp[1].value, antwortTemp[2].value, antwortTemp[3].value];              

      questionObj = {
        db: 'phil',
        function: 'save',
        id: id,   // -1 => new oder entsp ID zum ändern
        frage: frage,
        richtig: richtig,
        antwort: antwort
      }
      /*
      console.log('id: ', questionObj.id);
      console.log('frage: '+questionObj.frage);
      console.log('antwort: '+questionObj.antwort);
      console.log('richtig',+questionObj.richtig);
      */
    }


  // Frage vom Server löschen
    function deleteQuest(id) {
      $.ajax({
        url:'http://wifi.1av.at/quizdata.php',
        method:'post',
        data:{
          db: 'phil',       
          function: 'delete',
          id: id   
        },
        success:function( response ) {
          console.log(response);
          loadQuest()
        },
        error:function() {
          console.log( 'XHR Error' );
        }
      }) // ajax
    }



    function richtAntwFärben() {
      $('#antwA, #antwB, #antwC, #antwD ').removeClass('richtAntwInput');
      if (richtig == 0) {
        $('#antwA').addClass('richtAntwInput');
      }
      if (richtig == 1) {
        $('#antwB').addClass('richtAntwInput');
      }
      if (richtig == 2) {
        $('#antwC').addClass('richtAntwInput');
      }
      if (richtig == 3) {
        $('#antwD').addClass('richtAntwInput');
      }
    }








 })



