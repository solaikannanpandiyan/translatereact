import React from "react";
const $ = require("jquery");

export const Transcribe = () => {
  /* Video: https://youtu.be/aLnzojeQpHw */
  /* blog Explaination: https://aakash1282.medium.com/voice-to-text-with-javascript-voice-for-filling-d89c97c581ec*/

  var output = document.getElementById("output");
  var action = document.getElementById("action");
  var SpeechRecognition = SpeechRecognition || window.webkitSpeechRecognition;
  var recognition = new SpeechRecognition();

  // const start = Document.getElementById("start-btn");
  // const stop = Document.getElementById("stop-btn");

  var textbox = $("#textbox");
  var instructions = $("#instructions");

  var content = "";

  recognition.continuous = true;

  $("#start-btn").click(function () {
    if (content.length) {
      content += "";
    }
    recognition.start();
    instructions.text("Voice regnition is on");
  });

  $("#stop-btn").click(function () {
    // if(content.length){
    //     content = ''
    // }
    recognition.stop();
    instructions.text("Voice regnition is off");
    textbox.val("");
  });

  // This runs when the speech recognition service starts
  recognition.onstart = function () {
    instructions.text("Voice regnition is on");
  };

  recognition.onstop = function () {
    instructions.text("Voice regnition is off");
  };

  // recognition.onspeechend = function() {

  //     instructions.text("No Activity");
  // }

  recognition.onerror = function () {
    instructions.text("Try again");
  };
  // This runs when the speech recognition service returns result
  recognition.onresult = function (event) {
    var current = event.resultIndex;

    var transcript = event.results[current][0].transcript;
    var confidence = event.results[0][0].confidence;
    content = transcript;
    textbox.val(content);
  };

  return (
    <>
      <div class="container">
        <h1 class="text-center mt-5">Speech To Text in javascript</h1>
        <div class="form-group">
          <textarea id="textbox" rows="6" class="form-control"></textarea>
          <div class="form-group">
            <div
              class="btn-group"
              style={{ position: "relative", width: "100%" }}
            >
              <button id="start-btn" class="btn btn-success">
                start
              </button>
              <button id="stop-btn" class="btn btn-danger">
                stop
              </button>
            </div>

            <p id="instructions">Press the start button</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Transcribe;
