// ==========================================
// SDSS Sample Objects
// ==========================================


// ==========================================
// SDSS Real Sample Objects
// ==========================================


const samples = [



/* =====================
        STAR ⭐
===================== */


{
    class:"STAR",
    alpha:39.1496906,
    delta:28.10284161,
    u:21.74669,
    g:20.03493,
    r:19.17553,
    i:18.81823,
    z:18.65422,
    redshift:-0.0000079
},


{
    class:"STAR",
    alpha:345.8018744,
    delta:32.67286785,
    u:23.17274,
    g:20.14496,
    r:19.41948,
    i:19.22034,
    z:18.89359,
    redshift:0.0000718
},


{
    class:"STAR",
    alpha:353.2015224,
    delta:3.080795936,
    u:24.54890,
    g:21.44267,
    r:20.95315,
    i:20.79360,
    z:20.48442,
    redshift:-0.000428576
},





/* =====================
        GALAXY 🌌
===================== */


{
    class:"GALAXY",
    alpha:135.6891066,
    delta:32.49463184,
    u:23.87882,
    g:22.27530,
    r:20.39501,
    i:19.16573,
    z:18.79371,
    redshift:0.6347936
},


{
    class:"GALAXY",
    alpha:144.8261006,
    delta:31.27418489,
    u:24.77759,
    g:22.83188,
    r:22.58444,
    i:21.16812,
    z:21.61427,
    redshift:0.779136
},


{
    class:"GALAXY",
    alpha:345.2825932,
    delta:21.1838656,
    u:19.43718,
    g:17.58028,
    r:16.49747,
    i:15.97711,
    z:15.54461,
    redshift:0.1161227
},





/* =====================
        QSO 🔥
===================== */


{
    class:"QSO",
    alpha:340.9951205,
    delta:20.58947628,
    u:23.48827,
    g:23.33776,
    r:21.32195,
    i:20.25615,
    z:19.54544,
    redshift:1.424659
},


{
    class:"QSO",
    alpha:1.494388639,
    delta:3.29174633,
    u:20.38562,
    g:20.40514,
    r:20.29996,
    i:20.05918,
    z:19.89044,
    redshift:2.031528
},


{
    class:"QSO",
    alpha:20.05255573,
    delta:11.49788077,
    u:21.89214,
    g:21.35124,
    r:21.18755,
    i:20.84300,
    z:20.76580,
    redshift:1.528308
}


];



// ==========================================
// Load Random Sample
// ==========================================


function loadSample(){


    const sample =
    samples[
        Math.floor(
            Math.random() * samples.length
        )
    ];



    const features = [

        "alpha",
        "delta",
        "u",
        "g",
        "r",
        "i",
        "z",
        "redshift"

    ];



    features.forEach(feature=>{


        const input =
        document.getElementById(feature);



        if(input){


            input.value =
            sample[feature];



            input.classList.add("sample-fill");



            setTimeout(()=>{


                input.classList.remove(
                    "sample-fill"
                );


            },800);


        }


    });


}









// ==========================================
// Prediction
// ==========================================


async function predict(){



const features = [

"alpha",
"delta",
"u",
"g",
"r",
"i",
"z",
"redshift"

];





for(let feature of features){


    const value =
    document.getElementById(feature).value;



    if(value.trim()===""){


        alert(
        "⚠️ Please fill all astronomical parameters."
        );


        return;

    }


}






const data = {};



features.forEach(feature=>{


    data[feature] =
    Number(
        document.getElementById(feature).value
    );


});







const button =
document.querySelector("#analyze-btn");



if(button){


    button.innerHTML =
    "🔭 Analyzing...";


    button.disabled=true;


}








try{


const response =
await fetch(

"http://127.0.0.1:8000/predict",

{

method:"POST",

headers:{

"Content-Type":
"application/json"

},


body:
JSON.stringify(data)


}

);







const result =
await response.json();








const object =
result.prediction.toUpperCase();



const confidence =
result.confidence;







const resultBox =
document.querySelector(".result");


const icon =
document.getElementById("object-icon");


const title =
document.getElementById("prediction");


const description =
document.getElementById("description");


const score =
document.getElementById("confidence");


const bar =
document.getElementById("confidence-bar");









resultBox.classList.remove(

"star",
"galaxy",
"qso"

);








if(object==="STAR"){


resultBox.classList.add("star");


icon.innerHTML="⭐";


title.innerHTML=
"STAR DETECTED";



description.innerHTML=
"The AI model classified this object as a star.";

}



else if(object==="GALAXY"){


resultBox.classList.add("galaxy");


icon.innerHTML="🌌";


title.innerHTML=
"GALAXY DETECTED";



description.innerHTML=
"The AI model discovered a galaxy containing billions of stars.";

}



else if(object==="QSO"){


resultBox.classList.add("qso");


icon.innerHTML="🔥";


title.innerHTML=
"QSO DETECTED";



description.innerHTML=
"The AI model detected a quasar-like object.";

}



else{


icon.innerHTML="✨";

title.innerHTML =
object;


description.innerHTML =
"Unknown astronomical object.";

}







score.innerHTML =
confidence + "%";



bar.style.width =
confidence + "%";






resultBox.classList.remove(
"pulse"
);


void resultBox.offsetWidth;


resultBox.classList.add(
"pulse"
);



}




catch(error){


console.log(error);


alert(
"❌ API connection failed."
);


}





finally{


if(button){


button.disabled=false;


button.innerHTML=
"🚀 Analyze Object";


}


}



}