const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader= document.getElementById('loader');

function showLoadingSpinner(){
    loader.hidden=false;
    quoteContainer.hidden=true;
}
function removeLoadingSpinner(){
    if(!loader.hidden){
        quoteContainer.hidden=false;
        loader.hidden=true;
    }
}
//Get Quote from API
async function getQuote(){
   showLoadingSpinner();
    const proxyUrl='https://cors-anywhere.herokuapp.com/';
    const apiUrl='http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
        const response= await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        quoteText.innerText= data.quoteText;
        //if author is blank, add unknown
        if(data.quoteAuthor===''){
            authorText.innerText='Unknoown';
        }else{
            authorText.innerText= data.quoteAuthor;
        }

        // Reduce font size for long quotes
        if(data.quoteText.length >120){
            quoteText.classList.add('long-quote');
        }else{
            quoteText.classList.remove('long-quote');
        }
        console.log(data);
        //stop loader, show the quote
        removeLoadingSpinner();
    }catch(error){
        getQuote();
        console.log('Woops, no quotes ', error);
    }
}

//post quote on twitter 
function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl= `https://twitter.com/intent/tweet?text = ${quote} - ${author}`;
    window.open(twitterUrl,'_blank');
}
//Event Listener
newQuoteBtn.addEventListener('click',getQuote);
twitterBtn.addEventListener('click', tweetQuote);

//on Load
getQuote();