// fraction sizes relative to width.
let ratio = 16 / 9;

// button relative sizes
let buttonSize = 0.13;
let backButtonX = 0;
let backButtonY = 0;
let button1X = 0.43;
let button1Y = 0.30;
let button2X = 0.66;
let button2Y = 0.33;
let button3X = 0.43;
let button3Y = 0.70;
let button4X = 0.63;
let button4Y = 0.70;
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
let audio;
let videos;
// last video is the home screen
let currentVideo = 4;
let vidFade = 0;
let vidFading = false;

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
  videoCastro = createVideo(['https://res.cloudinary.com/the-hub/video/upload/v1606239878/hopes-and-aspirations/Castro_subs_gehkxc.mp4']);
  videoRajah = createVideo(['https://res.cloudinary.com/the-hub/video/upload/v1606239876/hopes-and-aspirations/Rajah_subs_a55dzf.mp4']);
  videoRobyn = createVideo(['https://res.cloudinary.com/the-hub/video/upload/v1606239874/hopes-and-aspirations/Robyn_subs_a17igr.mp4']);
  videoThomas = createVideo(['https://res.cloudinary.com/the-hub/video/upload/v1606239877/hopes-and-aspirations/Thomas_subs_z5njgt.mp4']);
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
  videos = [videoCastro, videoRajah, videoRobyn, videoThomas, videoMain]
  audio = [castro, rajah, robyn, thomas]
  background(0);
  rectMode(CENTER);
}

function draw() {
  // background(0)
  cursorChange()
  clear();
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
    textSize(40);
    textAlign(CENTER);
    fill(0)
    text("click to start", width / 2, height / 2)
  }


  //   // add the video
  //   if(vidFading){
  //     if(vidFade < 256) {
  //       vidFade +=3;
  //     } else {
  //       vidFade = 0;
  //       vidFading = false;
  //     }

  //   }
  //   tint(255, vidFading ? vidFade : 255);
  //   image(videos[currentVideo], modX, modY, vidWidth, vidHeight);

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
  } else if (!clickToStart) {
    noStroke()
    rect(vidWidth * backButtonX + modX, vidHeight * backButtonY + modY, width, height);
  }

  // hit detection on rollover
  isMouseInside(vidWidth * button1X + modX, vidHeight * button1Y + modY, vidWidth * buttonSize, 0)
  isMouseInside(vidWidth * button2X + modX, vidHeight * button2Y + modY, vidWidth * buttonSize, 1)
  isMouseInside(vidWidth * button3X + modX, vidHeight * button3Y + modY, vidWidth * buttonSize, 2)
  isMouseInside(vidWidth * button4X + modX, vidHeight * button4Y + modY, vidWidth * buttonSize, 3)

  //   background(220);
  // image(video, 10, 10); // draw the video frame to canvas
  //   filter(GRAY);
  //   image(video, 150, 150); // draw a second copy to canvas
}

function mousePressed() {
  // set the video to loop and start playing
  if (clickToStart) {
    playMain()
    clickToStart = false;
  }
  // hit detection on click/tap
  if (enableButtons) {
    isMouseInside(vidWidth * button1X + modX, vidHeight * button1Y + modY, vidWidth * buttonSize, 0, true)
    isMouseInside(vidWidth * button2X + modX, vidHeight * button2Y + modY, vidWidth * buttonSize, 1, true)
    isMouseInside(vidWidth * button3X + modX, vidHeight * button3Y + modY, vidWidth * buttonSize, 2, true)
    isMouseInside(vidWidth * button4X + modX, vidHeight * button4Y + modY, vidWidth * buttonSize, 3, true)
  } else {
    backButton(vidWidth * backButtonX + modX, vidHeight * backButtonY + modY, width, height)
  }

}

// hit detection for audio and video clips
function isMouseInside(x, y, size, clip, click = false) {
  if (enableButtons) {
    if (mouseX > x-size/2 && mouseX < x + size/2 && mouseY > y-size/2 && mouseY < y + size/2) {
      buttonsOn[clip] = true
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
  }
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
  currentVideo = 4;
  videos.map(clip => {
    clip.stop()
    clip.addClass("out")
    clip.removeClass("in")
  })
  videos[4].removeClass("out")
  videos[4].addClass("in")
  videos[4].loop()

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