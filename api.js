// https://script.google.com/macros/s/AKfycbygcJDLcIs7ljLR-M9WxsLvqqlY4LFSUPLiisSE8YYY6880_VU/exec?currencyTo=JPY&price=100&currencyFrom=CAD

const MAXCURRENCY = 33;

function doGet(e) {
  let currencyTo = e.parameter.currencyTo;
  let currencyFrom = e.parameter.currencyFrom;
  let price = e.parameter.price;
  console.log("main1");
  //JSONオブジェクト格納用の入れ物
  if(e.parameter == undefined) {
    console.log('unde');
  } else {
   
  console.log("main2");
    // validationチェック
    validation(currencyTo, currencyFrom, price);

  console.log("main3");
    let rateConverted = calcRate(currencyTo, currencyFrom, price);
    
    let responseList = {
      "currencyTo": currencyTo,
      "currencyFrom": currencyFrom,
      "price": price
    };

    let result = {
      data: responseList,
      meta: { status: "aa" }
    };
    
    return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
    // apiResponse(responseList, "success");
  }
}

function calcRate(currencyTo, currencyFrom, price) {
  let sheetApp = SpreadsheetApp.openById('1bGCTs4z7F9UjnXt310RfSSrZ739eRp31NTiYW4ATnEo');
  let sheet = sheetApp.getSheetByName(currencyFrom);
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
  console.log("val1");
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
  console.log("val2");
  let isCurrencyToValid = currencyCheck(currencyTo);
  let isCurrencyFromValid = currencyCheck(currencyFrom);
  
  console.log("val3");
  // isPriceValid isCurrencyToValid isCurrencyFromValid 
}

function apiResponse(response, statusMsg) {
    let result = {
      data: response,
      meta: { status: statusMsg }
    };
    
    return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
}
