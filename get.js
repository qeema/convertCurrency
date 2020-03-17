function doGet(e) {
  var currencyTo = e.parameter.currencyTo;
  var currencyFrom = e.parameter.currencyFrom;
  var price = e.parameter.price;
  
  //JSONオブジェクト格納用の入れ物
  if (e.parameter == undefined) {
    console.log('unde');
  }else{
    console.log(currencyTo);
    console.log(currencyFrom);
    console.log(price);
  }
}

