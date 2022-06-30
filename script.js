const quoteText = document.querySelector(".quote"),
authorName = document.querySelector(".author .name"),
btn = document.querySelector(".btn"),
speechBtn = document.querySelector(".speech"),
copyBtn = document.querySelector(".copy"),
twitterBtn = document.querySelector(".twitter"),
synth = speechSynthesis;

function randomQuote(){
    btn.classList.add("loading");
    btn.innerText = "Loading Quote...";

    fetch("https://api.quotable.io/random").then(res => res.json()).then(result => {
        quoteText.innerText = result.content;
        authorName.innerText = result.author;
        btn.classList.remove("loading");
        btn.innerText = "New Quote";
    });
}

speechBtn.addEventListener("click", () =>{
    if(!btn.classList.contains("loading")){
        let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`);
        synth.speak(utterance);
        setInterval(()=>{
            synth.speaking ? speechBtn.classList.add("active") : speechBtn.classList.remove("active");
        }, 10);
    }
});

copyBtn.addEventListener("click", ()=>{
    navigator.clipboard.writeText(quoteText.innerText);
});

twitterBtn.addEventListener("click", ()=>{
    let tweetUrl = `https://twitter.com/intent/tweet?url=${quoteText.innerText}`;
    window.open(tweetUrl, "_blank");
});

btn.addEventListener("click", randomQuote);