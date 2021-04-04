prediction_1 = "";
prediction_2 = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 95
});
camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snap() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_img" src="'+data_uri+'">';
    });
}

console.log("ML5 Version -",ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/Ivzz-kYSl/model.json", modelLoaded);
function modelLoaded() {
    console.log("Model Loaded =)");
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data1 = "The First Prediction is " + prediction_1;
    speak_data2 = "The Second Prediction is " + prediction_2;
    var utterthis = new SpeechSynthesisUtterance(speak_data1 + speak_data2);
    utterthis.rate = 0.5;
    synth.speak(utterthis);
}

function check() {
    img = document.getElementById("captured_img");
    classifier.classify(img, prediction);
}

function prediction(error , result) {
    if (error) {
        console.error(error);
    } else {
        console.log(result);
        document.getElementById("result_emotion").innerHTML = result[0].label;
        document.getElementById("result_emotion_2").innerHTML = result[1].label;
        prediction_1 = result[0].label;
        prediction_2 = result[1].label;
        speak();

        if (result[0].label == "Happy") {
            document.getElementById("update_emoji").innerHTML = "&#128522;";
        } 
        if (result[0].label == "Sad") {
            document.getElementById("update_emoji").innerHTML = "&#128532;";
        }
        if (result[0].label == "Angry") {
            document.getElementById("update_emoji").innerHTML = "&#128548;";
        }

        if (result[1].label == "Happy") {
            document.getElementById("update_emoji_2").innerHTML = "&#128522;";
        } 
        if (result[1].label == "Sad") {
            document.getElementById("update_emoji_2").innerHTML = "&#128532;";
        }
        if (result[1].label == "Angry") {
            document.getElementById("update_emoji_2").innerHTML = "&#128548;";
        }
    }
}