const textarea = document.querySelector('#text');
      let voicelist = document.querySelector('#voice');
      let speechbtn = document.querySelector('.submit');

      let synth = speechSynthesis;
      let isSpeaking = true;

      function voicespeech() {
        for (let voice of synth.getVoices()) { //voices will be picked up through the getVoices method in the synth variable
          let option = document.createElement('option') //creates the option element
          option.text = voice.name // option element texts must be the same as voice names
          voicelist.add(option) // add to ption element a list of voices
          console.log(option) // show them on console
        }
      }

      synth.addEventListener('voiceschanged', voicespeech) //the synth variable is waiting for the "voicechanged" type of event to run the "voicespeech" function

      function texttospeech(text) {
        let utternance = new SpeechSynthesisUtterance(text) //the text that will be synthesized when the utterance is spoken through the method.
        for (let voice of synth.getVoices()) {//voices will be picked up through the getVoices method in the synth variable
          if (voice.name === voicelist.value) {//if the name of the voice is equal to the value of the list of voices inside option
            utternance.voice = voice // the voice of the utterance should match with the voice
          }
        }
        speechSynthesis.speak(utternance)// than the speechSynthesis will speak the utterance with the corresponding voice
      }

      //
      speechbtn.addEventListener('click', (e) => { //the speechbutn variable is waiting for the "click" type of event to run the event function
        e.preventDefault() //Cancels the event if it is cancelable, without stopping its propagation
        if (textarea.value != '') { // if there is something written in the textarea
          if (!synth.speaking) { // if synth is not speaking
            texttospeech(textarea.value) // the function "texttospeech" should run the voice of value of the textarea
          }
          if (textarea.value.length > 80) {// if the text written in the textarea is superior than 80 spaces
            if (isSpeaking) {// if isSpeaking is true 
              synth.resume() //puts the synth into a non-paused state: resumes it if it was already paused.
              isSpeaking = false // so it is not speaking
              speechbtn.innerHTML = 'Pause Speech' // pause the speech
            } else {
              synth.pause() // puts the synthinto a paused state
              isSpeaking = true 
              speechbtn.innerHTML = 'Resume Speech' // resume the speech
            }
            setInterval(() => { // sets interval if nothing is speaking and it's all rigth
              if (!synth.speaking && !isSpeaking) {
                isSpeaking = true
                speechbtn.innerHTML = 'Convert To Speech'
              }
            })
          } else {
            speechbtn.innerHTML = 'Convert To Speech'
          }
        }
      })
      voicespeech()