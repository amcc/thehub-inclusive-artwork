// fraction sizes relative to width.
let ratio = 16 / 9;

// button relative sizes
let buttonSize = 0.12;
let backButtonX = 0;
let backButtonY = 0;
let button1X = 0.43;
let button1Y = 0.30;
let button2X = 0.66;
let button2Y = 0.35;
let button3X = 0.43;
let button3Y = 0.70;
let button4X = 0.63;
let button4Y = 0.70;
let button5X = 0.55;
let button5Y = 0.13;
let buttonsOn = []

let clickToStart = true;
let enableButtons = true;
let buttonHover1 = false;
let buttonHover2 = false;
let buttonHover3 = false;
let buttonHover4 = false;
let buttonHovers = [buttonHover1, buttonHover2, buttonHover3, buttonHover4]

// responsive sizing for 'cover' style positioning/sizing
let modX = 0;
let modY = 0;
let vidWidth;
let vidHeight

let colour = "white"
// arrays for audio/video
let names
let audio;
let videos;
// last video is the home screen
let homeVid = 5
let currentVideo = homeVid;
let currentHover = null
let vidFade = 0;
let vidFading = false;
let fontSize;

// variable for mobile/touch detection
let touch = false
if ("ontouchstart" in document.documentElement) {
  touch = true;
}

function preload() {
  videoMain = createVideo(['https://res.cloudinary.com/the-hub/video/upload/v1606759311/hopes-and-aspirations/Inclusive_Futures_Tree_holding_shot_FADE_AUDIO_oedczu.mp4']);
  castro = createAudio('https://res.cloudinary.com/the-hub/video/upload/v1606240744/hopes-and-aspirations/Castro_name_audio_trimmed_jtsa0r.m4a');
  rajah = createAudio('https://res.cloudinary.com/the-hub/video/upload/v1606240744/hopes-and-aspirations/Rajah_name_audio_trimmed_rcz9cc.m4a');
  robyn = createAudio('https://res.cloudinary.com/the-hub/video/upload/v1606240744/hopes-and-aspirations/Robyn_name_audio_trimmed_noxfqf.m4a');
  thomas = createAudio('https://res.cloudinary.com/the-hub/video/upload/v1606240744/hopes-and-aspirations/Thomas_name_audio_trimmed_igcesv.m4a');
  aysen = createAudio('https://res.cloudinary.com/the-hub/video/upload/v1606915082/hopes-and-aspirations/Aysen_name_audio_s9lrel.m4a')
  videoCastro = createVideo(['https://res.cloudinary.com/the-hub/video/upload/v1606239878/hopes-and-aspirations/Castro_subs_gehkxc.mp4']);
  videoRajah = createVideo(['https://res.cloudinary.com/the-hub/video/upload/v1606239876/hopes-and-aspirations/Rajah_subs_a55dzf.mp4']);
  videoRobyn = createVideo(['https://res.cloudinary.com/the-hub/video/upload/v1606239874/hopes-and-aspirations/Robyn_subs_a17igr.mp4']);
  videoThomas = createVideo(['https://res.cloudinary.com/the-hub/video/upload/v1606239877/hopes-and-aspirations/Thomas_subs_z5njgt.mp4']);
  videoAysen = createVideo(['https://res.cloudinary.com/the-hub/video/upload/v1606239826/hopes-and-aspirations/Aysen_Al_VO_lgyxzs.mp4'])
  // videoMain.hide();
  // videoCastro.hide();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // playsinline allows mobile to have the video on the canvas
  // otherwise it plays fullscreen in quicktime on ios
  videoMain.elt.setAttribute("playsinline", "");
  videoCastro.elt.setAttribute("playsinline", "");
  videoRajah.elt.setAttribute("playsinline", "");
  videoRobyn.elt.setAttribute("playsinline", "");
  videoThomas.elt.setAttribute("playsinline", "");
  castro.elt.setAttribute("playsinline", "");
  rajah.elt.setAttribute("playsinline", "");
  robyn.elt.setAttribute("playsinline", "");
  thomas.elt.setAttribute("playsinline", "");
  // playMain();
  videos = [videoRajah, videoCastro, videoAysen, videoThomas, videoRobyn, videoMain]
  audio = [rajah, castro, aysen, thomas, robyn]
  names = ["Rajah", "Castro", "Aysen", "Thomas", "Robyn"]
  background(0);
  fontSize = width / 10
  rectMode(CENTER);
  textFont('Amatic SC')
  textSize(fontSize);
  textStyle(BOLD);
  smooth();
}

function draw() {
  // background(0)
  clear();
  cursorChange()
  fill(colour)

  // calculate x and y offset for elements
  // calculate 'cover' size width and height
  if (width / height < ratio) {
    vidWidth = width
    vidHeight = height * (width / height) / ratio
    modY = height / 2 - vidHeight / 2;
  } else {
    vidWidth = width / ((width / height) / ratio)
    vidHeight = height
    modX = width / 2 - vidWidth / 2;
  }

  // initial text
  if (clickToStart) {
    cursor(HAND)
    noStroke()
    // textSize(40);
    textAlign(CENTER);
    fill(255)
    text("click to start", width / 2, height / 2)
  }

  // squares for button positions
  noFill()
  strokeWeight(4)
  stroke(255, 100)
  noStroke();
  if (enableButtons && !clickToStart) {
    square(vidWidth * button1X + modX, vidHeight * button1Y + modY, vidWidth * buttonSize);
    square(vidWidth * button2X + modX, vidHeight * button2Y + modY, vidWidth * buttonSize);
    square(vidWidth * button3X + modX, vidHeight * button3Y + modY, vidWidth * buttonSize);
    square(vidWidth * button4X + modX, vidHeight * button4Y + modY, vidWidth * buttonSize);
    square(vidWidth * button5X + modX, vidHeight * button5Y + modY, vidWidth * buttonSize);
  } else if (!clickToStart) {
    noStroke()
    rect(vidWidth * backButtonX + modX, vidHeight * backButtonY + modY, width, height);
  }

  // hit detection on rollover
  isMouseInside(vidWidth * button1X + modX, vidHeight * button1Y + modY, vidWidth * buttonSize, 0)
  isMouseInside(vidWidth * button2X + modX, vidHeight * button2Y + modY, vidWidth * buttonSize, 1)
  isMouseInside(vidWidth * button3X + modX, vidHeight * button3Y + modY, vidWidth * buttonSize, 2)
  isMouseInside(vidWidth * button4X + modX, vidHeight * button4Y + modY, vidWidth * buttonSize, 3)
  isMouseInside(vidWidth * button5X + modX, vidHeight * button5Y + modY, vidWidth * buttonSize, 4)

  touchButtons()
}

function mousePressed() {
  // set the video to loop and start playing

  // hit detection on click/tap
  if (enableButtons) {
    isMouseInside(vidWidth * button1X + modX, vidHeight * button1Y + modY, vidWidth * buttonSize, 0, true)
    isMouseInside(vidWidth * button2X + modX, vidHeight * button2Y + modY, vidWidth * buttonSize, 1, true)
    isMouseInside(vidWidth * button3X + modX, vidHeight * button3Y + modY, vidWidth * buttonSize, 2, true)
    isMouseInside(vidWidth * button4X + modX, vidHeight * button4Y + modY, vidWidth * buttonSize, 3, true)
    isMouseInside(vidWidth * button5X + modX, vidHeight * button5Y + modY, vidWidth * buttonSize, 4, true)
  } else {
    backButton(vidWidth * backButtonX + modX, vidHeight * backButtonY + modY, width, height)
  }
  if (clickToStart) {
    playMain()
    clickToStart = false;
  }
}

// hit detection for audio and video clips
function isMouseInside(x, y, size, clip, click = false) {
  if (enableButtons && !clickToStart) {
    if (mouseX > x - size / 2 && mouseX < x + size / 2 && mouseY > y - size / 2 && mouseY < y + size / 2) {
      buttonsOn[clip] = true
      currentHover = clip;
      if (touch && click && !buttonHovers[clip]) {
        playAudio(clip)
      }
      if (!buttonHovers[clip]) {
        playAudio(clip)

      }
      if (click) {
        playNewVideo(videos[clip], videos[currentVideo], clip)
      }
      buttonHovers[clip] = true
    } else {
      // colour = "red"
      buttonHovers[clip] = false
      buttonsOn[clip] = false;
      // return false;
    }

    // console.log('touch', touch)
    // console.log('click', click)
  } else {

  }
}

function cursorChange() {
  let checker = arr => arr.every(v => v === false);
  if (checker(buttonsOn)) {
    cursor(ARROW)
  } else {
    cursor(HAND)
    // noFill()
    // stroke(255)
    // strokeWeight(10)
    // let circleDiameter = width / 8
    // circle(mouseX, mouseY, circleDiameter)
    if (currentVideo === homeVid) {
      showName(names[currentHover], mouseX, mouseY)
    }
  }
}

function touchButtons() {
  if (touch && !clickToStart) {
    showName(names[0], vidWidth * button1X + fontSize * 0.1 + modX, vidHeight * button1Y + modY + fontSize * 0.2, 0.5)
    showName(names[1], vidWidth * button2X + modX, vidHeight * button2Y + modY + fontSize * 0.2, 0.5)
    showName(names[2], vidWidth * button3X + modX, vidHeight * button3Y + modY + fontSize * 0.25, 0.5)
    showName(names[3], vidWidth * button4X + modX, vidHeight * button4Y + modY + fontSize * 0.25, 0.5)
    showName(names[4], vidWidth * button5X + modX, vidHeight * button5Y + modY - fontSize * 0.45, 0.5)
  }
}

function showName(name, x, y, scale = 1) {
  fill(0)
  noStroke()
  textSize(fontSize * scale)
  text(name, x + 2, y + fontSize / 3 + 2)
  fill(255)
  noStroke()
  textSize(fontSize * scale)
  text(name, x, y + fontSize / 3)
}

// hit detection for back button
function backButton(x, y, width, height) {
  if (!enableButtons && !clickToStart) {
    if (mouseX > x && mouseX < x + width && mouseY > y && mouseY < y + height) {
      enableButtons = false;
      console.log('click')
      playMain(videos[currentVideo])
    }
  }
}

// play the home page video and clean up
function playMain(oldVideo) {
  vidFade = 0;
  vidFading = true;
  enableButtons = true;
  currentVideo = homeVid;
  videos.map(clip => {
    clip.stop()
    clip.addClass("out")
    clip.removeClass("in")
  })
  videos[homeVid].removeClass("out")
  videos[homeVid].addClass("in")
  videos[homeVid].loop()

}

function playNewVideo(newVideo, oldVideo, clip) {
  enableButtons = false
  vidFade = 0;
  vidFading = true;
  newVideo.removeClass("out")
  newVideo.addClass("in")
  newVideo.stop()
  newVideo.play()
  oldVideo.pause();
  currentVideo = clip;
  newVideo.onended(playMain);
  vidFading = true;
}

// play audio clip and stop others
function playAudio(clip) {
  audio.map(clip => {
    clip.pause()
  })
  audio[clip].play()
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
