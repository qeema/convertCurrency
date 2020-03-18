// https://script.google.com/macros/s/AKfycbygcJDLcIs7ljLR-M9WxsLvqqlY4LFSUPLiisSE8YYY6880_VU/exec?currencyTo=JPY&price=100&currencyFrom=CAD
// const GID = '1bGCTs4z7F9UjnXt310RfSSrZ739eRp31NTiYW4ATnEo';
// const SHEET = SpreadsheetApp.openById(GID);
const MAXCURRENCY = 33;

function doGet(e) {
  let currencyTo = e.parameter.currencyTo;
  let currencyFrom = e.parameter.currencyFrom;
  let price = e.parameter.price;
  
  //JSONオブジェクト格納用の入れ物
  if(e.parameter == undefined) {
    console.log('unde');
  } else {
    // validationチェック
    validation(currencyTo, currencyFrom, price);

    let rateConverted = calcRate(currencyTo, currencyFrom, price);
    
    let responseList = {
      "currencyTo": currencyTo,
      "currencyFrom": currencyFrom,
      "price": price
    };

    apiResponse(responseList, "success");
  }
}

function calcRate(currencyTo, currencyFrom, price) {
  let sheet = SHEET.getSheetByName(currencyFrom);
  let range = sheet.getRange(1, 1, MAXCURRENCY, 2);
  let arr = range.getValues();

  let result = 0;
  for(key in arr) {  
    if(arr[key][0] == "USD") {
      result = arr[key][1] * Number(price);
    }  
  }

  return result;
}

function validation(currencyTo, currencyFrom, price) {
  // priceのチェック
  // let isPriceValid = isNaN(price) ? true : false;
  isNaN(price) ? true : apiResponse("Not Integer", "error");

  let sheet = SHEET.getSheetByName("JPY");
  let range = sheet.getRange(1, 1, MAXCURRENCY, 2);

  let currencyCheck = function(currency) {
    let result = [];
    let arr = range.getValues();
    for(key in arr) {
      result.push(arr[key][1] == currency ? true : false);
    }

    return arr.includes(true) ? false : true;
  }

  // let isCurrencyToValid = currencyCheck(currencyTo);
  // let isCurrencyFromValid = currencyCheck(currencyFrom);
  // isPriceValid isCurrencyToValid isCurrencyFromValid 
}

function apiResponse(response, statusMsg) {
    let response = {
      data: response,
      meta: { status: statusMsg }
    };
    
    return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);
}
