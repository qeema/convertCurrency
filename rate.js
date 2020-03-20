// https://docs.google.com/spreadsheets/d/XXXXXXXXXXXXXXXXXXXXX/edit#gid=0
let GID = '1bGCTs4z7F9UjnXt310RfSSrZ739eRp31NTiYW4ATnEo';
let SHEET = SpreadsheetApp.openById(GID);
const COUNTRIES = [
  'CAD','HKD','ISK','PHP','DKK','HUF','CZK','GBP','RON','SEK','IDR','INR','BRL','RUB','HRK','JPY','THB','CHF','EUR','MYR','BGN','TRY','CNY','NOK','NZD','ZAR','USD','MXN','SGD','AUD','ILS','KRW','PLN'
];

function myFunction() {
  // COUNTRIESに国一覧を定義
  setCountries();
  
  for(key in COUNTRIES) {
    let countryCode = COUNTRIES[key];
    // apiで通貨ごとにレート一覧を取得
    let rates = getRate(countryCode);
    writeRate(rates, countryCode);
  }
}

// JPYの通貨一覧を元にCOUNTRIESを定義
function setCountries() {
  let sheet = SHEET.getSheetByName('JPY');
  //getRange(開始行, 開始列, 何行)
  let range = sheet.getRange(1, 1, 33);
  let countriesArr = range.getValues();
  let countries = [];
  for(key in countriesArr) {
    countries.push(countriesArr[key][0]);
  }
  
  const COUNTRIES = countries;
}

// 国コードからapiでレート一覧を取得
function getRate(countryCode) {
  // https://exchangeratesapi.io/
  let url = "https://api.exchangeratesapi.io/latest?base=" + countryCode;
  let response = UrlFetchApp.fetch(url);
  let result = JSON.parse(response.getContentText("UTF-8"));
  return result["rates"];
}

function writeRate(rates, countryCode) {
  let sheet = SHEET.getSheetByName(countryCode);
  let count = 1;
  for(let key in rates) {
    sheet.getRange("A" + count).setValue(key);
    sheet.getRange("B" + count).setValue(rates[key]);
    count += 1;
  }
}

// シート作成用
/*
function createSheet() {
  for(key in COUNTRIES) {
    SHEET.insertSheet(COUNTRIES[key], Number(key));
  }
}
*/
