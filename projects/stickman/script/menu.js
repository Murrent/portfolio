//---------Hides the startscreen, unpauses the game and starts the music--------
function startGame() {
  document.getElementById('startMenu').style.display = "none";
  pause = false;
  music = true;
}
//----------------------------------OPTIONS-------------------------------------
function openOptions() {
  //----Pauses the game and shows the options, if opened it does the reverse----
  if (document.getElementById('optionsBackground').style.display == "flex") {
    document.getElementById('optionsBackground').style.display = "none";
    if (document.getElementById('startMenu').style.display == "none") {
      pause = false;
    }
  }
  else {
    document.getElementById('optionsBackground').style.display = "flex";
    pause = true;
  }
}
function opt1() {
  //--------------------------DARK MODE ON/OFF----------------------------------
  //Sets the HTML and startmenu background to white of darkmode is OFF----------
  if (document.getElementById('optSwitch1').innerHTML == "ON") {
    //-------------------------------button-------------------------------------
    document.getElementById('optSwitch1').innerHTML = "OFF";
    document.getElementById('optSwitch1').style.background = "red";
    //--------------------------------Background--------------------------------
    document.body.parentElement.style.background = "#fff";
    document.getElementById('startMenu').style.background = "#fff";
    document.getElementById('madeWith').style.background = "#000";
  }

  else {
    //--------------------------button------------------------------------------
    document.getElementById('optSwitch1').innerHTML = "ON";
    document.getElementById('optSwitch1').style.background = "green";
    //--------------------------background--------------------------------------
    document.body.parentElement.style.background = "#202020";
    document.getElementById('startMenu').style.background = "#202020";
    document.getElementById('madeWith').style.background = "#fff";
  }
}

document.getElementById('musicController').oninput = function() {
  //------------text for the slider is equal to the slider value----------------
  document.getElementById('musicAmount').innerHTML = document.getElementById('musicController').value;
  musicVolume();
}
function musicVolume() {
  //Music volume is equal to sliders value/100. song.volume needs a value
  //ranging for 0-1 therefore I divide by 100
  var volume = document.getElementById('musicController').value/100;
  song.volume = volume;
}
document.getElementById('effectsController').oninput = function() {
  //------------text for the slider is equal to the slider value----------------
  document.getElementById('sfxAmount').innerHTML = document.getElementById('effectsController').value;
  soundEffects();
  wood1.play();
}
function soundEffects() {
  //explained in musicVolume()
  var volume = document.getElementById('effectsController').value/100;
  wood1.volume = volume;
  wood2.volume = volume;
  wood3.volume = volume;
  akShot.volume = volume;
  akShotSingle.volume = volume;
  woodBreakSound.volume = volume;
  metalShot.volume = volume;
  metalBreakSound.volume = volume;
  explosionSound.volume = volume;
  grenadeCollide.volume = volume;
  throwItem.volume = volume;
  loadGunAudio.volume = volume;
  unloadGunAudio.volume = volume;
  lootPickup.volume =  volume;
}
