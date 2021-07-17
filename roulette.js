$(function(){
  "use strict";

  var
    max = 7,
    cnt = 0,
    bingo = [],
    status = true,
    roulette,
    random,
    number,
    result,
    nextflg = true,
    pod1 = ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    pod2 = ['H', 'I', 'J', 'K', 'L', 'M', 'N'],
    pod3 = ['O', 'P', 'Q', 'R', 'S', 'T', 'U'],
    group1 = [],
    group2 = [],
    group3 = [],
    $pod = $("#pod"),
    $target = $("#target"),
    $number = $("#number"),
    $result = $("#result"),
    $sound_play = $("#sound-play"),
    $sound_pause = $("#sound-pause");

  $(document).ready(function(){
    $target.text(pod1[cnt]);
  });

  for(var i = 1; i <= max; i++) {
    bingo.push(i);
    if(i == max){
      $number.append($("<li>").text("Seed"));
    } else {
      $number.append($("<li>").text("Group " + i));
    }

  }

  $("#button").on("click", function(){
    if(!nextflg) return false;
    if(status) {
      status = false;
      $(this).text("STOP");
      $sound_play.trigger("play");
      $sound_pause.trigger("pause");
      $sound_pause[0].currentTime = 0;

      roulette = setInterval(function(){
        random = Math.floor(Math.random() * bingo.length);
        number = bingo[random];
        $result.text(number);
      }, 10);
    } else {
      status = true;
      nextflg = false;
      $(this).text("START");
      $sound_pause.trigger("play");
      $sound_play.trigger("pause");
      $sound_play[0].currentTime = 0;

      clearInterval(roulette);

      result = bingo[random];
      bingo.splice(random, 1);

      $result.text(result);
      $number.find("li").eq(parseInt(result, 10) - 1).addClass("hit");

      var groupClass = "roulette-result-" + result;
      var current_pod = $pod.val();
      switch(current_pod){
        case 'pod1':
          var targetName = pod1[cnt];
          break;

        case 'pod2':
          var targetName = pod2[cnt];
          break;

        case 'pod3':
          var targetName = pod3[cnt];
          break;

        default: break;
      }
      $("#" + groupClass).children('.group-member.' + current_pod).text(targetName);
    }
  });

  $("#button-nxt").on("click", function(){
    if(nextflg) return false;
    cnt++;
    nextflg = true;
    var current_pod = $pod.val();
    switch(current_pod){
      case 'pod1':
        $target.text(pod1[cnt]);
        break;

      case 'pod2':
        $target.text(pod2[cnt]);
        break;

      case 'pod3':
        $target.text(pod3[cnt]);
        break;

      default: break;
    }
  });

  $( ".select" ).selectCF({
    change: function(){
      bingo = [];
      cnt = 0;
      nextflg = true;
      for(var i = 1; i <= max; i++) {
        bingo.push(i);
      }

      $result.text();
      $number.find("li").each(function(){
        $(this).removeClass("hit");
      });

      switch($(this).val()){
        case 'pod1':
          $target.text(pod1[cnt]);
          break;

        case 'pod2':
          $target.text(pod2[cnt]);
          break;

        case 'pod3':
          $target.text(pod3[cnt]);
          break;

        default: break;
      }

      /*
      var value = $(this).val();
      var text = $(this).children('option:selected').html();
      console.log(value+' : '+text);
      event_change.html(value+' : '+text);*/
    }
  });
});
