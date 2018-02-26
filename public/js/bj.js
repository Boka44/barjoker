
$('document').ready(function(){

  document.getElementsByTagName("h1")[0].style.fontSize = "80px";
  var easy = [
    "Pick an opponent, first one to wear a stranger's hat wins.",
    "Squirt ketchup onto someones table, but make it so it seems totally normal and not out of context",
    "Get a stranger to walk up to another friend and have the use the phrase 'Goose gonna get ya!'",
    "Tell a stranger that another stranger thinks they are cute."
  ];
  var medium = [
    "Create a secret handshakewith someone at the bar with 5 different handshakes.",
    "Walk up to someone, create a fake porn star name and in front of their group claim you are their biggest fan.",
    "Have a conversation with someone, where you include the phrase 'Goose gonna get ya!' 10 times without raising suspicion.",
    "Switch two strangers hats."
  ];
  var hard = [
    "Switch places with the bouncer and ID an old person. Do not let them in due to the driver's license being 'fake'.",
    "Start a conga line that circles the bar with at least 10 participants.",
    "Create a 5 step dance and have someone copy your moves as you are dancing.",
    "Go up to a table with an open seat and tell a ridiculous story involving three unrelated topics of your choice."
  ];

  $('#easy').click(function easyF() {
    var random = Math.floor(Math.random() * easy.length);
    $(".dare").html(easy[random]);
  });
  $('#medium').click(function mediumF() {
    var random = Math.floor(Math.random() * medium.length);
    $(".dare").html(medium[random]);
  });
  $('#hard').click(function hardF() {
    var random = Math.floor(Math.random() * hard.length);
    $(".dare").html(hard[random]);
  });
  $('#punish').click(function punishF() {
    alert(
      "No punishments yet... other than shame and dishonoring your family, of course."
    );
  });

  

  $('#addE').click(function subEasy(text) {
    text = $(".newDareProto").val();
    easy.push(text);
    console.log(easy);
  });
  $('#addM').click(function subMedium(text) {
    text = $(".newDareProto").val();
    medium.push(text);
    console.log(medium);
  });
  $('#addH').click(function subHard(text) {
    text = $(".newDareProto").val();
    hard.push(text);
    console.log(hard);
  });


  $('#addDare').click(function subEasy(text) {
    text = $(".newDare").val();
    easy.push(text);
    console.log(easy);
  });

  function deleteDare(id) {
    console.log("clicked");
  }

  let daresArr = [];
  let punsArr = [];
  

  const urlDare = '/customGame/dares';

  fetch(urlDare).then((response) => {
    console.log(response)
    return response.json() }).then((response) => {
    console.log(response)
    response.map((result) => {
        daresArr.push(result.dare)
      })
    console.log(daresArr)
    $('.fetchCheck').html("Fetch finished dares.")
  })  

  const urlPun = '/customGame/punishments';
  fetch(urlPun).then((response) => {
    console.log(response)
    return response.json() }).then((response) => {
    console.log(response)
    response.map((result) => {
        punsArr.push(result.pun)
      })
    console.log(punsArr)
    $('.fetchCheck2').html("Fetch finished punishments.")
  })  


  $('#playCustom').click(function easyF() {
    let random = Math.floor(Math.random() * daresArr.length);
    $(".dareCustom").html(daresArr[random]);
    let randomPuns = Math.floor(Math.random() * punsArr.length);
    $(".punCustom").html(punsArr[randomPuns]);
    $("#togglePun").show();
    $(".punCustom").hide();
  })

  $('#togglePun').click(() => {
    $('.punCustom').toggle('slow');
  })

});