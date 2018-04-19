'use strict';
const $ = require('jquery');
          require('jquery-ui-bundle');
const global = Function('return this;')();
global.jQuery = $;
const jqueryUI = require('jquery-ui');
const bootstrap = require('bootstrap');
const introJs = require('intro.js');

$(function(){
  $('.tiles').draggable({ 
    helper: "clone",
    snap: ".hand, .drawnTile, .dora",
    snapMode: "inner",
    snapTolerance:32
  });
  $('.hand, .drawnTile, .dora').droppable({
    accept: ".tiles",
    drop: function(e,ui) {
      $(this).empty();
      const newTiles = $(ui.helper).clone().addClass('movedTiles').removeClass('ui-draggable-dragging tiles');
      $(this).append(newTiles);
      $('.movedTiles').draggable({
        stop: function(e, ui){
        $(this).fadeOut(100, function() { $(this).remove(); });
        }
      });
    }
  });

  $('.submit').on('click', function(){
    let Tiles = new Array(15);
    for(let i = 0; i<13; i++){
      let tileId = $( '.hand:eq('+ i +') > img').attr('tileId');
      Tiles[i] = tileId;
    }
    Tiles.sort();
    Tiles[13] = ($('.drawnTile > img').attr('tileId'));
    
    let isDuplicate = false;
    let counts = {};
    Tiles.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });
    delete counts['undefined'];
    for (let count in counts) {
      if(parseInt(counts[count]) > 4) {
        alert('牌の重複は４枚以下にしてください');
        isDuplicate = true;
        break;
      }
    }
    if (!isDuplicate) {
      Tiles[14] = ($('.dora > img').attr('tileId'));
      if( Tiles.indexOf(undefined) === -1 ) {
        let prevalentWind = $('[name=prevalentWind]').val();
        let handNum =$('[name=handNum]').val();
        let turnNum =$('[name=turnNum]').val();
        let seatWind =$('[name=seatWind]').val();
        let comment = $('[name=comment]').val();
        let csrfToken = $('[name=_csrf]').val();
        $.ajax({
          url: '/quiz',
          type: 'POST',
          data: JSON.stringify({ 
            "Tiles": Tiles,
            "prevalentWind": prevalentWind,
            "handNum": handNum,
            "turnNum": turnNum,
            "seatWind": seatWind,
            "comment": comment,
            "_csrf": csrfToken
          }),
          contentType: 'application/json',
          timeout: 10000 
          }).done(function(data) {
            alert("登録しました");
          }).fail(function(XMLHttpRequest, textStatus, errorThrown) {
            alert("エラーが発生しました");
          })
      } else {
        alert('牌が足りません！');
      }
    }
  });

  $('.reset').on('click', function(){
    $('.movedTiles').remove();
  });

  $('.howto').on('click', function(){
    introJs.introJs().setOptions({
      'nextLabel': '次へ',
      'prevLabel': '前へ',
      'skipLabel': 'スキップ',
      'doneLabel': '完了！'
    }).start();
  });
});