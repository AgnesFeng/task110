let inputs1 = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
let inputs2 = ["ITEM0013 x 4", "ITEM0022 x 1"];
let inputs3 = ["ITEM0013 x 4"];

let arrBuy = [];
let sumOut;
let strCut;
let priceAndName = {cutType1:0,
                    cutType2:0,
                    name:[],
                    sumOut:0,
                    type:0};
module.exports =
function bestCharge(selectedItems) {
  //得到点单商品属性
  let arrBuyOut = getObjectBuy(selectedItems);
  sumOut = CountAllObjetsPrices(arrBuyOut);  //没有优惠时候的输出
  countCheper(sumOut,arrBuyOut);
  let str1 = printBuy(arrBuyOut);
  let str2 = printYouHui(priceAndName,sumOut);
  let strAll = '\n============= 订餐明细 =============\n'+ str1 +'\n-----------------------------------'+ str2;
  console.log(strAll);
  return  strAll;
};
//bestCharge(inputs1);

//let selectedItems = inputs2;

//得到点单商品属性
function getObjectBuy(inputs){
  let obj = {};
  for (var i = 0; i < inputs.length; i++) {
    obj = loadAllItems().filter(function (temp) {
      return (temp.id === inputs[i].slice(0,8))
    });
    //console.log(Number(inputs[i].slice(11,12)));
    arrBuy.push({id:obj[0].id,
                name:obj[0].name,
                num:Number(inputs[i].slice(11,12)),
                price:obj[0].price,
                sumPrice: obj[0].price * Number(inputs[i].slice(11,12))
    });
  }
  //console.log(arrBuy);
  return arrBuy;
}

//let arrBuyOut = getObjectBuy(selectedItems);

//计算总价
function CountAllObjetsPrices(arrBuyOut) {
  let sum = 0;
  arrBuyOut.map(function (tem) {
    //console.log(tem.sumPrice);
    sum += tem.sumPrice;
  });
  //console.log(sum);
  return sum;
}
//sumOut = CountAllObjetsPrices(arrBuyOut);  //没有优惠时候的输出

//计算优惠
function countCheper(sumOut,arrBuyOut){
  //第一种
  if(sumOut >= 30){
    priceAndName.cutType1 = 6;
    priceAndName.type = 1;
  }
  //第二种
  arrBuyOut.map(function (tempBuy) {
    loadPromotions()[1].items.map(function (temp) {
      if(temp === tempBuy.id){
        priceAndName.cutType2 += tempBuy.price/2;
        priceAndName.name.push([tempBuy.name]);
      }
    });
  });
  //比较两种
  if(priceAndName.cutType1 >= priceAndName.cutType2){
    priceAndName.sumOut = sumOut - priceAndName.cutType1;
  }else{
    priceAndName.sumOut = sumOut - priceAndName.cutType2;
    priceAndName.type = 2;
  }
  //console.log(priceAndName);
  return priceAndName;
}

//countCheper(sumOut,arrBuyOut);

function printYouHui(priceAndName,sumOut){
  //console.log(sumOut);
  if(priceAndName.type === 0){
    priceAndName.sumOut = sumOut;
    strCut = '';
  }else if(priceAndName.type === 1){
    strCut = '\n使用优惠:\n满30减6元，省'+priceAndName.cutType1+'元\n-----------------------------------'
  }else if(priceAndName.type === 2){
    let strName = priceAndName.name.join('，');
    console.log(strName);
    strCut = '\n使用优惠:\n指定菜品半价('+ strName +')，省'+ priceAndName.cutType2 +'元\n-----------------------------------'
  }
  strCut = strCut + '\n总计：'+ priceAndName.sumOut +'元\n===================================';
  //console.log(strCut);
  return strCut;
}
//printYouHui(priceAndName);




//打印购买的商品
function printBuy(arrBuy) {
  let result = arrBuy.map(function (temp) {
    let strBuy = temp.name +' x '+ temp.num + ' = ' +
      temp.sumPrice + '元';
    return strBuy;
  });
  //console.log(result.join('\n'));
  return result.join('\n');
}


function loadPromotions() {
  return [{
    type: '满30减6元'
  }, {
    type: '指定菜品半价',
    items: ['ITEM0001', 'ITEM0022']
  }];
}

function loadAllItems() {
  return [{
    id: 'ITEM0001',
    name: '黄焖鸡',
    price: 18.00
  }, {
    id: 'ITEM0013',
    name: '肉夹馍',
    price: 6.00
  }, {
    id: 'ITEM0022',
    name: '凉皮',
    price: 8.00
  }, {
    id: 'ITEM0030',
    name: '冰锋',
    price: 2.00
  }];
}
