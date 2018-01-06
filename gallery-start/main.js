var displayedImage = document.querySelector('.displayed-img');
var thumbBar = document.querySelector('.thumb-bar');

btn = document.querySelector('button');
var overlay = document.querySelector('.overlay');

/* Looping through images */
var xxx=['images/pic1.jpg','images/pic2.jpg','images/pic3.jpg','images/pic4.jpg','images/pic5.jpg'];
for(var i=0;i<xxx.length;i++){
  var newImage = document.createElement('img');
  newImage.setAttribute('src', xxx[i]);
  thumbBar.appendChild(newImage);
  newImage.onclick=function(e){
    var imgSrc=e.target.getAttribute('src');
    displayImage(imgSrc);
  }
}

function displayImage(imgSrc) {
  displayedImage.setAttribute('src',imgSrc);
}

btn.onclick=function(e){
  var btnClass=btn.getAttribute('class');
  DarkenImage(btnClass);
}

function DarkenImage(btnClass) {
  if (btnClass==='dark'){
  btn.setAttribute('class','light');
  btn.textContent="White";
  overlay.style.backgroundColor='rgba(0,0,0,0.5)';
} else {
  btn.setAttribute('class','dark');
  btn.textContent='Darken';
  overlay.style.backgroundColor='rgba(0,0,0,0)';
}
}

/* Wiring up the Darken/Lighten button */

