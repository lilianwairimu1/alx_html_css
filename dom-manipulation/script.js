const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteButton =document.getElementById('newQuote');
const newQuoteText = documentgetElementById('newQuoteText');
const newQuoteCategory = document.getElementByID('newQuoteCategory');
const addQuoteButton = document.getElementById('addQuoteButton');
const exportQuotesButton = document.getElementById('exportQuotes');
const importFile = document.getElementById('importFile');
const categoryFilter = document.getElementById('categoryFilter');
const syncStatus = document.getElementById('syncStatus');

//implementing web storage an JSON handling
let quote =  [];
let categories = [];

const serverUrl = "https://jsonplaceholder.typicode.com/posts";



const storedQuotes = localStorage.getItem('quote');
if (storedQuotes){
    quote.JSON.parse(storedQuotes);
    populatedCategories();
}
//fetching quotes from server
async function fetchQuotesFromServer() {
    try {
        const response = await fetch(serverUrl1 + '/quotes');
        const serverQuotes = await response.json();
    }catch (error) {
        console.error('Error fetching quotes:', error);
    }
} 
//syncing quotes with server
function syncQuotes() {

}

async function loadQuotes() {
    const storedQuotes = localStorage.getItem('quote');
    if(storedQuotes) {
        quote = JSON.parse(storedQuotes);
    }else {
        try {
            constant response = await fetch(serverUrl1 + '/quote');
            quote = await response.json();
            localStorage.setItem('quote', JSON.stringify(quote));
        } catch (error) {
            console.error('Error fetching quotes', error);
        }
    }
    popuöateCategories();
}

function showRandmQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.legth);
    const randomQuote = quotes[random.index];

    // elements for styling flexibility
const quoteElement = document.createElement('p');
const authorElement =document.createElement('p');

quoteElement.textContent = `"${randomQuote.text}"`;
authorElement.textContent = `- ${randomQuote.author}`;

quoteDisplay.innerHTML = ''; 
quoteDisplay.appendChild(quoteElement);
quoteDisplay.appendChild(authorElement);

//store last viewed quote 
sesssionStorage.setItem('lastViewedQuote', JSON.stringify(randomQuote));
}

let quotes = [
    {text: 'There is no shortcut in life.you have to put in the hard work', author: 'Lilian Kinyanjui', category: 'inspirational'},
{text: 'Riches dont come overnight and so does failure.', author: 'Abraham Rincoln', category: 'inspirational'}
];


function createAddQuoteForm() {
    //adding quote form(implementation)
}

function addQuote() {
    const newQuote = newQuoteText.value.trim();
    const newCategory = newQuoteCategory.value.trim();
    saveQuotes();

    if (newQuote && newCategory) {
        const newQuoteObject = {text: newQuote, category: newCategory};
        quotes.push(newQuoteObject);
        saveQuotes();
        sendQuotesToServer(newQuoteObject);
        newQuoteText.value = '';
        newQuoteCategory.value = '';
        //update DOM to display the new quote
    } else {
        alert('Please enter quotes and categories');
    }
   

    newQuoteText.value = '';
    newQuoteCategory.value = '';
}

function saveQuotes() {
localStorage.setItem('quote', JSON.stringify(quote));
}
function exportQuoteToJson() {
    const quotesJson = JSON.stringify(quotes);
    const blob = new Blob([quotesJson], {type: 'application/json'});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'quotes.json';
    link.click();
}
function importFromJsonFile(event) {
const fileReader = new FileReader();
fileReader.onload = functin(event) 
    try {
        const importQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        saveQuotes();
        alert('quotes imported successfully!');
    }catch (error) {
        alert('Error importing quotes: '+ error.messsage);
    };
    fileReader.readAsText(event.target.files[0]);
}

function filterQuotes() {
    const selectedCategory = categoryFilter.value;
    const filteredQuotes = selectedCategory === 'all' ? quotes : quotes.filter(quote => quote.category === selectedCategory);
}
function populatedCategories() {
    categories = [...new Set(quotes.map(quote => quote.category))];
    categoryFilter.innerHTML = '';
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.text = category;
        categoryFilter.appendChild(option);
    });
}

function sendQuoteToServer(quote) {
    fetch(serverUrl + '/quote', {
        method: 'POST',
        headers: {
            'Content-Type': 'application.json'
        },
        body: JSON.stringify(quote)
    })
    .then(response => {
        if(!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Quote sent successfully:', data);
syncStatus.textContent = 'Quotes synced with server!';
    })
    .catch(error => {
        console.error('Error sending quote:', error);
    });
}

setInterval(fetchQuotesFromServer, 5000);

newQuoteButton.addEventListener('click', showRandomQuote);
addQuoteButton.addEventListener('click', addQuote);
exportQuotesButton.addEventListener('click', exportQuoteToJson);
importFile.addEventListener('change', importFromJsonFile);
categoryFilter.addEventListener('change', filterQuotes);