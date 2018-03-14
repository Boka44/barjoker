$('document').ready(function(){

  function deleteDare(id) {
    console.log("clicked");
  }

  let defaultDares = [
    "Pick an opponent, first one to wear a stranger's hat wins.",
    "Bum a cigarrete and light it backwards.",
    "Group writes a note to give to the person of their choosing. Without peaking, give it to them and roll with whatever happens.",
    "Introduce yourself as a rapper, and offer to incorporate three words into a short freestyle rap for them.",
    "Get a kiss on the cheek from a stranger.",
    "Give someone a lapdance.",
    "Offer to buy someone a drink, order, then thank them for the drink and walk away with it.",
    "Get half the bar to sing happy birthday to a stranger whose birthday it is not.",
    "Start a chant of the groups choosing.",
    "Create a dare.",
    "Create a dare.",
    "Create a dare.",
    "Create a dare.",
    "Put on a fake accent, then introduce yourself from the wrong country.",
    "Get someone to join you in doing 10 jumping jacks in the middle of the bar.",
    "Convince a stranger to give you a sip of their drink.",
    "Grab a cup of water and cheers five people while giving a toast made by the group.",
    "Find someone wearing American flag clothing and pledge allegiance.",
    "Squirt ketchup onto someones table, but make it so it seems totally normal and not out of context.",
    "Get a stranger to walk up to another friend and have them use the phrase 'Goose gonna get ya!'",
    "Tell a stranger that another stranger thinks they are cute.",
    "Create a secret handshake with someone at the bar with 5 different handshakes.",
    "Walk up to someone, create a fake porn star name and in front of their group claim you are their biggest fan.",
    "Have a conversation with someone, where you include the phrase 'Goose gonna get ya!' 10 times without raising suspicion.",
    "Switch two strangers hats.",
    "Switch places with the bouncer and ID an old person. Do not let them in due to the driver's license being 'fake'.",
    "Start a conga line that circles the bar with at least 10 participants.",
    "Create a 5 step dance and have someone copy your moves as you are dancing.",
    "Go up to a table with an open seat and tell a ridiculous story involving three unrelated topics of your choice.",
    "Give a presentation to a group of strangers on a bad idea of the groups choosing.",
    "Walk up to a stranger and give them five reasons why they should hate you.",
    "Start a conversation with a stranger, after every sentence they say, repeat their last phrase and say 'No thanks, I'm good!' three times before exiting."
  ];

  let defaultPuns = [
    "Create a drink for the loser. Each player adds an ingredient.",
    "Buy the one who dared you a drink.",
    "Stand outside, face the bar, and sing a song of the groups choice. At least 1 verse and 1 chorus.",
    "Wear your pants backwards until you finish 2 drinks.",
    "Order a drink on the rocks, hold the ice. Then argue that you are right.",
    "Group chooses a karoake song to sing. With or without karaoke available.",
    "Introduce yourself to an attractive person of the groups choice, and immediately apologize for bad breathe or body odor.",
    "Challenge someone to a game to pool, talk mad shit, then lose tremendously.",
    "Spend half hour shoeless.",
    "Try licking your elbow while singing the alphabet.",
    "Make a toilet paper necklace and wear it for two drinks.",
    "Try and speak in shakespeare for 20 minutes.",
    "Create a punishment.",
    "Create a punishment.",
    "Create a punishment."
  ];

  let defaulSuccess = [
    "Choose the who plays next.", 
    "Choose the who plays next.",
    "Choose the who plays next.",
    "Choose the who plays next.",
    "Choose the who plays next.",
    "Tallest person plays next.",
    "Smallest person plays next.",
    "Whoever dared you plays again.",
    "Person to your right plays next.",
    "Person to your left plays next.",
    "Last person to touch the bathroom door plays next.",
    "Last person to go outside of the bar plays next.",
    "First person to sip their drink plays next.",
    "Group chooses who plays next"
  ];

  $('#playDefault').click(() => {
    let randomDefault = Math.floor(Math.random() * defaultDares.length);
    $(".dareDefault").html(defaultDares[randomDefault]);
    let randomPunsDefault = Math.floor(Math.random() * defaultPuns.length);
    $(".punDefault").html(defaultPuns[randomPunsDefault]);
    let randomSuccessesDefault = Math.floor(Math.random() * defaulSuccess.length);
    $(".successDefault").html(defaulSuccess[randomSuccessesDefault]);
    $("#toggleSuccessDefault").show();
    $("#togglePunDefault").show();
    $(".punDefault").hide();
    $('.successDefault').hide();
  })

  $('#togglePunDefault').click(() => {
    $('.punDefault').toggle('slow');
    $('.successDefault').hide();
  })
  $('#toggleSuccessDefault').click(() => {
    $('.successDefault').toggle('slow');
    $('.punDefault').hide();
  })

  let daresArr = [];
  let punsArr = [];
  let successArr = [];
  
  $('#customGamePage').onload = customGameFetch();
  function customGameFetch() {
    const urlDare = '/customGame/dares';

    fetch(urlDare).then((response) => {
      return response.json() }).then((response) => {
      response.map((result) => {
          daresArr.push(result.dare)
        })
      console.log("Fetch finished: dares.")
    })  

    const urlPun = '/customGame/punishments';
    fetch(urlPun).then((response) => {
      return response.json() }).then((response) => {
      response.map((result) => {
          punsArr.push(result.pun)
        })
      console.log("Fetch finished: punishments.")
    })  

    const urlSuccess = '/customGame/successes';
    fetch(urlSuccess).then((response) => {
      return response.json() }).then((response) => {
      response.map((result) => {
          successArr.push(result)
        })
      console.log("Fetch finished: successes.")
    })  
  }

  $('#playCustom').click(() => {
    let random = Math.floor(Math.random() * daresArr.length);
    $(".dareCustom").html(daresArr[random]);
    let randomPuns = Math.floor(Math.random() * punsArr.length);
    $(".punCustom").html(punsArr[randomPuns]);
    let randomSuccesses = Math.floor(Math.random() * successArr.length);
    $(".successCustom").html(successArr[randomSuccesses]);
    $("#toggleSuccess").show();
    $("#togglePun").show();
    $(".punCustom").hide();
    $('.successCustom').hide();
  })

  $('#togglePun').click(() => {
    $('.punCustom').toggle('slow');
    $('.successCustom').hide();
  })
  $('#toggleSuccess').click(() => {
    $('.successCustom').toggle('slow');
    $('.punCustom').hide();
  })

});