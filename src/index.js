import Promise from 'bluebird';
const dustinpic = require('./images/DustinMalik.png');

function getImage(url){
  return new Promise(function(resolve, reject){
    var img = new Image()
    img.onload = function(){
      resolve(url)
    }
    img.onerror = function(){
      reject(url)
    }
    img.src = url
  })
}

getImage(dustinpic.substring(6)).then(function(successurl){
  document.getElementById('dustinpic').innerHTML = '<img src="' + successurl + '" />'
});

console.log('Image = ', as3.substring(6));
