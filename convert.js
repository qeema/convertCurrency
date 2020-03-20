// https://script.google.com/macros/s/AKfycbygcJDLcIs7ljLR-M9WxsLvqqlY4LFSUPLiisSE8YYY6880_VU/exec?currencyTo=JPY&price=100&currencyFrom=CAD

const MAXCURRENCY = 33;
let returnMsg = {};

function doGet(e) {
  let currency = {
    to: e.parameter.currencyTo,
    from: e.parameter.currencyFrom,
    price: Number(e.parameter.price)
  };

  if(validations(currency)) {
    return apiResponse(returnMsg, "error");
  } else {
    let convertedPrice = calcRate(currency);
    return apiResponse({convertedPrice: convertedPrice, currency: currency.to}, "success");
  }
}

function validations(currency) {
  if(validationUndef(currency)) {
    returnMsg = {msg: "Null parameter"};
    return true;
  } else  if(validationPrice(currency)) {
    returnMsg = {msg: "Not int"};
    return true;
  } else  if(validationCurrency(currency)) {
    returnMsg = {msg: "Not supported currency"};
    return true;
  }
  
  return false;
}

function validationUndef(currency) {
  if(currency.to == undefined || currency.from == undefined || currency.price == undefined){
    return true;
  }
  return false;
}

function validationPrice(currency) { 
  if(isNaN(currency.price)) {
    return true
  } else {
    return false;
  }
}

function validationCurrency(currency) {
  let sheet = SHEET.getSheetByName("JPY");
  let range = sheet.getRange(1, 1, MAXCURRENCY, 2);

  let currencyCheck = function(target) {
    let result = [];
    let arr = range.getValues();
    for(key in arr) {
      result.push(arr[key][0] == target ? true : false);
    }

    return result.includes(true) ? true : false;
  }
  
  let includeTo = currencyCheck(currency.to);
  let includeFrom = currencyCheck(currency.from);
  
  if(includeTo && includeFrom) {
    return false;
  } else {
    return true;
  }
}

function calcRate(currency) {
  let sheetApp = SpreadsheetApp.openById('1bGCTs4z7F9UjnXt310RfSSrZ739eRp31NTiYW4ATnEo');
  let sheet = sheetApp.getSheetByName(currency.from);
  let range = sheet.getRange(1, 1, MAXCURRENCY, 2);
  let arr = range.getValues();

  let result = 0;
  for(key in arr) {  
    if(arr[key][0] == currency.to) {
      result = arr[key][1] * Number(currency.price);
    }  
  }

  return result;
}

function apiResponse(returnMsg, statusMsg) {
    Logger.log("api1");

    let result = {
      data: returnMsg,
      meta: { status: statusMsg }
    };
    
    return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
}
