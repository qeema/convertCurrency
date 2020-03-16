https://docs.google.com/spreadsheets/d/XXXXXXXXXXXXXXXXXXXXX/edit#gid=0
const GID = '1_TTXUFG57FfSFJwhmb_iaEfiy5opGYR8QzWsHaUQaxE';
const SHEET = SpreadsheetApp.openById(GID);
// https://ja.wikipedia.org/wiki/ISO_4217
const COUNTRIES = [
  'CAD','HKD','ISK','PHP','DKK','HUF','CZK','GBP','RON','SEK','IDR','INR','BRL','RUB','HRK','JPY','THB','CHF','EUR','MYR','BGN','TRY','CNY','NOK','NZD','ZAR','USD','MXN','SGD','AUD','ILS','KRW','PLN'
];
function myFunction() {
  for(key in COUNTRIES) {
    let countryCode = COUNTRIES[key];
    let rates = getRate(countryCode);
    setRate(rates, countryCode);
  }
}
function getRate(countryCode) {
  // https://exchangeratesapi.io/
  let url = "https://api.exchangeratesapi.io/latest?base=" + countryCode;
  let response = UrlFetchApp.fetch(url);
  let result = JSON.parse(response.getContentText("UTF-8"));
  return result["rates"];
}

function setRate(rates, countryCode) {
  let sheet = SHEET.getSheetByName(countryCode);
  let count = 1;
  for(let key in rates) {
    sheet.getRange("A" + count).setValue(key);
    sheet.getRange("B" + count).setValue(rates[key]);
    count += 1;
  }
}

function createSheet() {  
  for(key in COUNTRIES) {
    //SpreadsheetApp.create("新規SS");
    //console.log(arr[key]);
    SHEET.insertSheet(COUNTRIES[key], Number(key));
  }
}
