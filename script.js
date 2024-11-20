const answer = document.querySelector(".ans");
const main = document.querySelector(".main");
const inneruploadimg = document.querySelector(".uoload_image");
const input = inneruploadimg.querySelector(".input");
let image = document.getElementById("image");
let text = document.getElementById("solution");
let output = document.querySelector(".math_answer");

let filedetails = {
    mime_type: null,
    data: null
};
const apiurl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCz2eU-q7f-l0zsOziPd_SBgqmS-KBiqGw";


async function generate() {

    const RequestOption = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "contents": [{
                "parts": [
                    { "text": "solve the mathecial problem" },
                    {
                        "inline_data": {
                            "mime_type": filedetails.mime_type,
                            "data": filedetails.data
                        }
                    }
                ]
            }]
        })

    }
    try {
        let response = await fetch(apiurl, RequestOption);
        let data = await response.json();
        // console.log(data);
        let apiresponse = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
        console.log(apiresponse);
        text.innerHTML = apiresponse;
        output.style.display = "block";
    }
    catch (error) {
        console.error(error);
    }
   
    

    
}
input.addEventListener("change", (e) => {
    const file = input.files[0];
    if (!file) return;

    let reader = new FileReader();
    reader.onload = (e) => {
        let base64data = e.target.result.split(",")[1];
        filedetails.mime_type = file.type;
        filedetails.data = base64data;

        // Hide elements and display the selected image
        inneruploadimg.querySelector("span").style.display = "none";
        inneruploadimg.querySelector(".plus").style.display = "none";
        image.style.display = "block";
        image.src = `data:${filedetails.mime_type};base64,${filedetails.data}`;
        output.style.display="none";
    };
    reader.readAsDataURL(file);
});
answer.addEventListener("click", generate);


inneruploadimg.addEventListener("click", () => {
    input.click();

});
