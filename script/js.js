const select = document.querySelectorAll("select");
const input = document.querySelector("#input");
const translation = document.querySelector("#translation"); 
const translate = document.querySelector("#button");
const switch_languages = document.querySelector("#switch_languages");
const input_sound = document.querySelector("#input_sound");
const translate_sound = document.querySelector("#translation_sound");
const input_copy = document.querySelector("#input_copy");
const translate_copy = document.querySelector("#translation_copy");


fetch('./json/languages.json')
  .then(response => response.json())
  .then(languages => {
    select.forEach(function(lang,id){
      for(let i = 0; i < languages.length; i++){
        let country_id = languages[i].code;
        let selected = "";
        if(id == 0 && country_id == "en-GB"){
          selected = "selected";
        }else if (id == 1 && country_id == "ja-JP"){
          selected = "selected";
        }
        let option = `<option value="${country_id}" ${selected}>${languages[i].language}</option>`
        lang.insertAdjacentHTML("beforeend", option);
      }
    });
  });

switch_languages.addEventListener("click", () =>{
    const new_text = input.value;
    const new_language = select[0].value;
        input.value = translation.value;
        select[0].value = select[1].value;
        translation.value = new_text;
        select[1].value = new_language;
})

translate.addEventListener("click", () =>{
  const text = input.value;
  const from = select[0].value;
  const to = select[1].value;

  if(text.trim() === "") {
    input.value = "Please enter some text to translate.";
      return;
  }

let url =  `https://api.mymemory.translated.net/get?q=${text}&langpair=${from}|${to}`;
  fetch(url).then(res => res.json()).then(data =>{
    document.querySelector("#translation").value = data.responseData.translatedText;
  });
})


input_copy.addEventListener("click", function(){
    navigator.clipboard.writeText(input.value);
});

translate_copy.addEventListener("click", function(){
    navigator.clipboard.writeText(translation.value);
});



input_sound.addEventListener("click", function(){
    let utterance = new SpeechSynthesisUtterance(input.value);
        utterance.lang = select[0].value
        speechSynthesis.speak(utterance);
});


translate_sound.addEventListener("click", function(){
    let utterance = new SpeechSynthesisUtterance(translation.value);
        utterance.lang = select[1].value
        speechSynthesis.speak(utterance);
});
