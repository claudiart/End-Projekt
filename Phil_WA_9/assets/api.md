# QUIZ BACKEND

URL: http://wifi.1av.at/quizdata.php
METHOD: POST
RESPONSE: JSON
obligatorischer Parameter db:STR



## 1.) Neue Frage od. Frage ändern
REQ-Daten
  function: 'save',
  id: INT, (-1 => new)
  frage: STR,
  richtig: INT[0-3],
  antwort: ARRAY(4xSTR)

RESP-Daten
  status: STR


## 2.) Frage löschen
REQ-Daten
  function: 'delete',
  id: INT

RESP-Daten
  status: STR


## 3.) alle Fragen
REQ-Daten
  function: 'get'

RESP-Daten
  daten: [
    ARRAY(frage, antwortenx4, richtigIndex)
  ]


## RESPONSE bei ERROR
  error: INT

Error-Codes
  404: Frage gibt es nicht
  500: Es stimmt was nicht
  501: delete ohne id
  700: Datenbank-Parameter fehlt
  999: function-Parameter wird nicht erkannt