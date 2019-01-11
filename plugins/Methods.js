
function timeFormat(data) {
  //三月 31 , 2018
  let time1=Date.parse(data);
  var date = new Date(time1 );
  var Y = date.getFullYear();
  var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
  switch (M) {
    case '01':
      M='一月 , ';
      break;
    case '02':
      M='二月 , ';
      break;
    case '03':
      M='三月 , ';
      break;
    case '04':
      M='四月 , ';
      break;
    case '05':
      M='五月 , ';
      break;
    case '06':
      M='六月 , ';
      break;
    case '07':
      M='七月 , ';
      break;
    case '08':
      M='八月 , ';
      break;
    case '09':
      M='九月 , ';
      break;
    case '10':
      M='十月 , ';
      break;
    case '11':
      M='冬月 , ';
      break;
    case '12':
      M='十二月 , ';
      break;

  }
  var D = date.getDate() + ' , ';
  return M+D+Y;

}

function toTop() {
  (function smoothscroll() {
    var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
      window.requestAnimationFrame(smoothscroll);
      window.scrollTo(0, currentScroll - (currentScroll / 20));
    }
  })();
}
export {
  timeFormat,
  toTop
}
