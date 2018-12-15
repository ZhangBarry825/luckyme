
function timeFormat(data) {
  //三月 31 , 2018
  let time1=Date.parse(data)
  var date = new Date(time1 );
  var Y = date.getFullYear()
  var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1)
  switch (M) {
    case 1:
      M='一月 , '
      break;
    case 2:
      M='二月 , '
      break;
    case 3:
      M='三月 , '
      break;
    case 4:
      M='四月 , '
      break;
    case 5:
      M='五月 , '
      break;
    case 6:
      M='六月 , '
      break;
    case 7:
      M='七月 , '
      break;
    case 8:
      M='八月 , '
      break;
    case 9:
      M='九月 , '
      break;
    case 10:
      M='十月 , '
      break;
    case 11:
      M='冬月 , '
      break;
    case 12:
      M='十二月 , '
      break;

  }
  var D = date.getDate() + ' , ';
  return M+D+Y;

}

export {
  timeFormat
}
