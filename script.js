//Nur sinnvolle Sachen und Namen ihr Hurens
var madchenWerte = new Array(6);

madchenWerte[0] = [3.648, 0.0066];
madchenWerte[1] = [3.998, 0.0066];
madchenWerte[2] = [4.0062, 0.00656];
madchenWerte[3] = [1.0935, 0.00208];
madchenWerte[4] = [1.4149, 0.01039];
madchenWerte[5] = [2.0232, 0.00874];

var jungenWerte = new Array(6);
jungenWerte[0] = [3.79, 0.0069];
jungenWerte[1] = [4.1, 0.00664];
jungenWerte[2] = [4.341, 0.00676];
jungenWerte[3] = [1.15028, 0.00219];
jungenWerte[4] = [1.936, 0.0124];
jungenWerte[5] = [2.8, 0.011];

var werte = [jungenWerte, madchenWerte];

var jungenUrkunde = new Array(12);
jungenUrkunde[0] = [450, 575];
jungenUrkunde[1] = [525, 675];
jungenUrkunde[2] = [600, 775];
jungenUrkunde[3] = [675, 875];
jungenUrkunde[4] = [750, 975];
jungenUrkunde[5] = [825, 1050];
jungenUrkunde[6] = [900, 1125];
jungenUrkunde[7] = [975, 1225];
jungenUrkunde[8] = [1050, 1325];
jungenUrkunde[9] = [1125, 1400];
jungenUrkunde[10] = [1200, 1475];
jungenUrkunde[11] = [1275, 1550];

var madchenUrkunde = new Array(12);
madchenUrkunde[0] = [475, 625];
madchenUrkunde[1] = [550, 725];
madchenUrkunde[2] = [625, 825];
madchenUrkunde[3] = [700, 900];
madchenUrkunde[4] = [775, 975];
madchenUrkunde[5] = [825, 1025];
madchenUrkunde[6] = [850, 1050];
madchenUrkunde[7] = [875, 1075];
madchenUrkunde[8] = [900, 1100];
madchenUrkunde[9] = [925, 1125];
madchenUrkunde[10] = [950, 1150];
madchenUrkunde[11] = [950, 1150];

var urkunde = [jungenUrkunde, madchenUrkunde];

var ballGewicht;
var sprintDistanz;
var sprintDistanzm;
var a;
var c;
let header;
let dateiName;
var klasse;
var leeresFeld = "";
const myForm = document.getElementById("myForm");
const csvFile = document.getElementById("csvFile");

//CSV in Array umwandeln
myForm.addEventListener("submit", function (e) {
  //nameSpeichern();

  e.preventDefault();

  const input = csvFile.files[0];

  console.log(input);
  dateiName = input.name;
  console.log(dateiName);

  let reader = new FileReader();
  reader.readAsText(input, "windows-1252");
  reader.onload = function (e) {
    const text = e.target.result;
    if (kommaCheck(text)) {
      window.alert("Komma gefunden. Bitte Datei überprüfen.");
    } else {
      console.log(text);
      let data = $.csv.toObjects(text);
      console.log(data.length);

      console.log(data.length);
      main(data);
    }

    //let data = csvToArray(text);
  };
});

function kommaCheck(text) {
  if (text.search(",") != -1) {
    return true;
  } else {
    return false;
  }
}

//Function ruft weitere aus zum Berechnen und am Ende exportieren
function main(data) {
  /*for (var i = 0; i < data.length; i++) {
    delete data[i]["\r"];
  }*/

  stringtoint(data);

  data = ErgebnisseBerechnen(data);

  console.log(data);
  newExport(data);
}
//Rechnung Anfang
function rechnung(geschlecht, jahrgang, klassenstufe, sprint, sprung, wurf) {
  var intGeschlecht;
  var gesamtPunkte;
  if (geschlecht == "m" || geschlecht == "M") {
    intGeschlecht = 0;
    gesamtPunkte = rechnung2(
      geschlecht,
      jahrgang,
      klassenstufe,
      sprint,
      sprung,
      wurf,
      intGeschlecht
    );
  } else if (geschlecht == "w" || geschlecht == "W") {
    intGeschlecht = 1;
    gesamtPunkte = rechnung2(
      geschlecht,
      jahrgang,
      klassenstufe,
      sprint,
      sprung,
      wurf,
      intGeschlecht
    );
  } else {
    gesamtPunkte = 0;
  }

  return gesamtPunkte;
}

function rechnung2(
  geschlecht,
  jahrgang,
  klassenstufe,
  sprint,
  sprung,
  wurf,
  intGeschlecht
) {
  klasseInDisziplin(klassenstufe);
  a = werte[intGeschlecht][sprintDistanz][0];
  c = werte[intGeschlecht][sprintDistanz][1];
  // console.log(a);
  // console.log(c);
  // console.log(sprintDistanzm);
  // console.log(sprint);
  if (sprint == 0 || sprint == leeresFeld) {
    var punkteSprint = 0;
  } else {
    var punkteSprint = Math.floor((sprintDistanzm / sprint - a) / c);
    if (punkteSprint < 0) {
      punkteSprint = 0;
    }
  }
  console.log("Sprint: " + punkteSprint);

  a = werte[intGeschlecht][3][0];
  c = werte[intGeschlecht][3][1];
  if (sprung == 0 || sprung == leeresFeld) {
    var punkteSprung = 0;
  } else {
    var punkteSprung = Math.floor((Math.sqrt(sprung) - a) / c);
    if (punkteSprung < 0) {
      punkteSprung = 0;
    }
  }
  console.log("Sprung " + punkteSprung);

  a = werte[intGeschlecht][ballGewicht][0];
  c = werte[intGeschlecht][ballGewicht][1];
  if (wurf == 0 || wurf == leeresFeld) {
    var punkteWurf = 0;
  } else {
    var punkteWurf = Math.floor((Math.sqrt(wurf) - a) / c);
    if (punkteWurf < 0) {
      punkteWurf = 0;
    }
  }
  console.log("Wurf " + punkteWurf);

  var gesamtPunkte = punkteSprint + punkteSprung + punkteWurf;
  console.log("Gesamtpunkte " + gesamtPunkte);
  return gesamtPunkte;
}

function klasseInDisziplin(klassenstufe) {
  if (klassenstufe >= 10) {
    sprintDistanz = 2;
    sprintDistanzm = 100;
    ballGewicht = 4;
  } else if (klassenstufe >= 7) {
    sprintDistanz = 1;
    sprintDistanzm = 75;
    ballGewicht = 4;
  } else if (klassenstufe >= 5) {
    sprintDistanz = 0;
    sprintDistanzm = 50;
    ballGewicht = 5;
  }
}

function welcheUrkunde(geschlecht, jahrgang, gesamtPunkte, data, i) {
  var intGeschlecht;
  if (geschlecht == "m" || geschlecht == "M") {
    intGeschlecht = 0;
  } else if (geschlecht == "w" || geschlecht == "W") {
    intGeschlecht = 1;
  }

  var newAlter = new Date().getFullYear() - jahrgang - 8;
  var welcheUrkunde;
  if (
    gesamtPunkte > 0 ||
    data[i].Wurf != leeresFeld ||
    data[i].Sprung != leeresFeld ||
    data[i].Sprint != leeresFeld
  ) {
    if (urkunde[intGeschlecht][newAlter][0] > gesamtPunkte) {
      console.log("Teilnehmerurkunde");
      welcheUrkunde = "Teilnehmerurkunde";
    } else if (
      urkunde[intGeschlecht][newAlter][0] <= gesamtPunkte &&
      urkunde[intGeschlecht][newAlter][1] > gesamtPunkte
    ) {
      console.log("Siegerurkunde");
      welcheUrkunde = "Siegerurkunde";
    } else {
      console.log("Ehrenurkunde");
      welcheUrkunde = "Ehrenurkunde";
    }
  } else {
    welcheUrkunde = leeresFeld;
  }
  return welcheUrkunde;
}

function ErgebnisseBerechnen(data) {
  for (i = 0; i < data.length; i++) {
    data[i].Ergebnis = rechnung(
      data[i].Geschlecht,
      data[i].Jahrgang,
      data[i].Klasse,
      data[i].Sprint,
      data[i].Sprung,
      data[i].Wurf
    );
    data[i].Urkunde = welcheUrkunde(
      data[i].Geschlecht,
      data[i].Jahrgang,
      data[i].Ergebnis,
      data,
      i
    );
    if (
      (data[i].Ergebnis == 0 &&
        data[i].Wurf == leeresFeld &&
        data[i].Sprung == leeresFeld &&
        data[i].Sprint == leeresFeld) ||
      data[i].Name == ""
    ) {
      data[i].Ergebnis = leeresFeld;
    }
  }

  return data;
}

function stringtoint(data) {
  klasse = new Array(data.length);
  for (var i = 0; i < data.length; i++) {
    data[i].Jahrgang = isNumeric(data[i].Jahrgang);
    klasse[i] = data[i].Klasse;
    data[i].Klasse = isNumeric(data[i].Klasse);
    data[i].Sprint = isNumeric(data[i].Sprint);
    data[i].Sprung = isNumeric(data[i].Sprung);
    data[i].Wurf = isNumeric(data[i].Wurf);
  }
}

function isNumeric(str) {
  var whattoreturn;
  if (typeof str == "number") {
    whattoreturn = str;
  } else if (typeof str == "string") {
    if (str != "") {
      whattoreturn = parseFloat(str.replace(/[^0-9.]/g, ""));
    } else {
      whattoreturn = leeresFeld;
    }

    //whattoreturn = parseFloat(str);
  }
  return whattoreturn;
}
//Rechnung Ende

function newExport(data) {
  for (var i = 0; i < data.length; i++) {
    data[i].Klasse = klasse[i];
  }

  var csvData = $.csv.fromObjects(data);

  var hiddenElement = document.createElement("a");
  hiddenElement.href =
    "data:text/csv;charset=utf-8,%EF%BB%BF" + encodeURI(csvData);
  hiddenElement.target = "_blank";
  dateiName = dateiName.replace(/.csv/g, "");
  hiddenElement.download = dateiName + "_ausgefüllt.csv";
  hiddenElement.click();
}
