function myFunction() {
  // https://script.google.com/macros/s/AKfycbygcJDLcIs7ljLR-M9WxsLvqqlY4LFSUPLiisSE8YYY6880_VU/exec?currencyTo=JPY&price=100&currencyFrom=CAD
 // let GID = '1bGCTs4z7F9UjnXt310RfSSrZ739eRp31NTiYW4ATnEo';
  const SHEET = SpreadsheetApp.openById("1bGCTs4z7F9UjnXt310RfSSrZ739eRp31NTiYW4ATnEo");
 
  let sheet = SHEET.getSheetByName("JPY");
  let range = sheet.getRange(1, 1, 33, 2);
  let arr = range.getValues();
  
  for(key in arr) {  
    if(arr[key][0] == "USD") {
      console.log(arr[key][1] * 1000);
    }  
  }  
}

