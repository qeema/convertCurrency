// https://script.google.com/macros/s/AKfycbygcJDLcIs7ljLR-M9WxsLvqqlY4LFSUPLiisSE8YYY6880_VU/exec?currencyTo=JPY&price=100&currencyFrom=CAD
//const GID = '1bGCTs4z7F9UjnXt310RfSSrZ739eRp31NTiYW4ATnEo';
//const SHEET = SpreadsheetApp.openById(GID);

function doGet(e) {
  var currencyTo = e.parameter.currencyTo;
  var currencyFrom = e.parameter.currencyFrom;
  var price = e.parameter.price;
  
  //JSONオブジェクト格納用の入れ物
  if(e.parameter == undefined) {
    console.log('unde');
  } else {
    console.log(currencyTo);
    console.log(currencyFrom);
    console.log(price);
    
    let responseList = {
      "currencyTo": currencyTo,
      "currencyFrom": currencyFrom,
      "price": price
    };
    
    let response = {
      data: responseList,
      meta: { status: 'success' }
    };
    
    return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);
  }
}
