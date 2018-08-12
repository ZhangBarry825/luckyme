//本地调试
export const log = (msg) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(msg);
  }
};

// 遍历对象
export const objForEach = (obj, fn) => {
  let key, result;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      result = fn.call(obj, key, obj[key]);
      if (result === false) {
        break;
      }
    }
  }
};

// 遍历类数组
export const arrForEach = (fakeArr, fn) => {
  let i, item, result;
  const length = fakeArr.length || 0;
  for (i = 0; i < length; i++) {
    item = fakeArr[i];
    result = fn.call(fakeArr, item, i);
    if (result === false) {
      break;
    }
  }
};
/**
 * 日期格式化
 * @param date 时间戳
 * @param fmt
 * @returns {string}
 */
export const dateFormat = (date, fmt = 'YYYY-MM-DD HH:mm:ss') => {
  if (!date) {
    return '';
  }
  if (typeof date === 'string') {
    date = new Date(date.replace(/-/g, '/'));
  }
  if (typeof date === 'number') {
    date = new Date(date);
  }
  let o = {
    'M+': date.getMonth() + 1,
    'D+': date.getDate(),
    'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S' : date.getMilliseconds()
  };
  let week = {
    '0': '\u65e5',
    '1': '\u4e00',
    '2': '\u4e8c',
    '3': '\u4e09',
    '4': '\u56db',
    '5': '\u4e94',
    '6': '\u516d'
  };
  if (/(Y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '\u661f\u671f' : '\u5468') : '') + week[date.getDay() + '']);
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    }
  }
  return fmt;
};


function unify(time) {
  time -= 0;
  if (("" + time).length === 10) {
    time *= 1000;
  }
  return time;
}

/**
 * 时间格式化2
 * @param time
 * @returns {string}
 */
export const formatDiffTime = (time) => {

  let ago, curTime, diff, int;
  time = unify(time);
  int = parseInt;
  curTime = +new Date();
  diff = curTime - time;
  ago = "";
  if (1000 * 60 > diff) {
    ago = "刚刚";
  } else if (1000 * 60 <= diff && 1000 * 60 * 60 > diff) {
    ago = int(diff / (1000 * 60)) + "分钟前";
  } else if (1000 * 60 * 60 <= diff && 1000 * 60 * 60 * 24 > diff) {
    ago = int(diff / (1000 * 60 * 60)) + "小时前";
  } else if (1000 * 60 * 60 * 24 <= diff && 1000 * 60 * 60 * 24 * 30 > diff) {
    ago = int(diff / (1000 * 60 * 60 * 24)) + "天前";
  } else if (1000 * 60 * 60 * 24 * 30 <= diff && 1000 * 60 * 60 * 24 * 30 * 12 > diff) {
    ago = int(diff / (1000 * 60 * 60 * 24 * 30)) + "月前";
  } else {
    ago = int(diff / (1000 * 60 * 60 * 24 * 30 * 12)) + "年前";
  }
  return ago;
};

/**
 * 时间格式化3
 * @param time
 * @param fmt
 * @returns {string}
 */
export const formatHybridTime = (time, fmt = 'YYYY-MM-DD') => {

  let ago, curTime, diff, int;
  time = unify(time);
  int = parseInt;
  curTime = +new Date();
  diff = curTime - time;
  ago = "";
  if (1000 * 60 > diff) {
    ago = "刚刚";
  } else if (1000 * 60 <= diff && 1000 * 60 * 60 > diff) {
    ago = int(diff / (1000 * 60)) + "分钟前";
  } else if (1000 * 60 * 60 <= diff && 1000 * 60 * 60 * 24 > diff) {
    ago = int(diff / (1000 * 60 * 60)) + "小时前";
  } else {
    ago = dateFormat(time, fmt);
  }
  return ago;
};

//分钟格式转化为时分格式
export const minuteToHour = (m) => {
  let minute = m % 60
  let hour = Math.floor(m / 60)
  if (hour > 0) {
    return hour + "时" + minute + "分"
  } else {
    return minute + "分"
  }

}


/**
 * 应用运行环境标识
 * @returns {{isTablet: boolean, isChrome: boolean, isPhone: boolean, isAndroid: boolean, isPc: boolean, isWx: boolean, isDev: boolean, isApp: boolean}}
 */
export const osEnv = () => {
  let ua = process.client ? navigator.userAgent : '',
    isWindowsPhone = /(?:Windows Phone)/.test(ua),
    isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
    isAndroid = /(?:Android)/.test(ua),
    isFireFox = /(?:Firefox)/.test(ua),
    isChrome = /(?:Chrome|CriOS)/.test(ua),
    isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
    isPhone = /(?:iPhone)/.test(ua) && !isTablet,
    isPc = !isPhone && !isAndroid && !isSymbian,
    isWx = /(?:MicroMessenger)/.test(ua),
    isDev = /(?:Dev)/.test(ua),
    isApp = /(?:UmAPP)/.test(ua);
  return {
    isTablet,
    isChrome,
    isPhone,
    isAndroid,
    isPc,
    isWx,
    isDev,
    isApp
  };
};

/**
 * 判断是否为有效手机号
 */
export const isPoneAvailable = (phone) => {
  let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
  return myreg.test(phone);
};

/**
 * 数组平均分割
 * @param arr
 * @returns {Array}
 */
export const arraySlice = (arr) => {
  let result = [];
  for (let i = 0, len = arr.length; i < len; i += 3) {
    result.push(arr.slice(i, i + 3));
  }
  return result;
};

/**
 * 文件上传
 * @param files
 * @param host
 * @param param
 * @param options
 */

export const uploadFile = (files, host, param, options) => {
  // 添加图片数据
  const formdata = new FormData();

  Object.keys(param).forEach(key => {
    formdata.append(key, param[key])
  });
  files.forEach(file => {
    formdata.append('file', file)
  });
  // 定义 xhr
  const xhr = new XMLHttpRequest();
  xhr.open('POST', host);
  // 设置超时
  xhr.ontimeout = (res) => {

    options.error && options.error(res);
  };
  // 返回数据
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        options.success && options.success('upload success');

      } else {
        options.error && options.error('upload error');

      }
    }
  };
  // 发送请求
  xhr.send(formdata)
};

/**
 * 判断是否为有效身份证号
 */
export const isCard = (sId) => {
  let aCity = {
    11: "北京",
    12: "天津",
    13: "河北",
    14: "山西",
    15: "内蒙古",
    21: "辽宁",
    22: "吉林",
    23: "黑龙江",
    31: "上海",
    32: "江苏",
    33: "浙江",
    34: "安徽",
    35: "福建",
    36: "江西",
    37: "山东",
    41: "河南",
    42: "湖北",
    43: "湖南",
    44: "广东",
    45: "广西",
    46: "海南",
    50: "重庆",
    51: "四川",
    52: "贵州",
    53: "云南",
    54: "西藏",
    61: "陕西",
    62: "甘肃",
    63: "青海",
    64: "宁夏",
    65: "新疆",
    71: "台湾",
    81: "香港",
    82: "澳门",
    91: "国外"
  };

  let iSum = 0;
  let info = "";
  if (!/^\d{17}(\d|x)$/i.test(sId)) return {
    res: false,
    msg: "你输入的身份证长度或格式错误"
  };
  sId = sId.replace(/x$/i, "a");
  if (aCity[parseInt(sId.substr(0, 2))] == null) return {
    res: false,
    msg: "你的身份证地区非法"
  };
  let hBirthday = sId.substr(6, 4) + "-" + (sId.substr(10, 2)) + "-" + (sId.substr(12, 2));
  let sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2));
  let d = new Date(sBirthday.replace(/-/g, "/"));
  if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) return {
    res: false,
    msg: "身份证上的出生日期非法"
  };
  for (let i = 17; i >= 0; i--) iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11);
  if (iSum % 11 !== 1) return {
    res: false,
    msg: "请仔细检查身份证号是否正确"
  };
  //此次还可以判断出输入的身份证号的人性别
  return {
    res: true,
    msg: {
      city    : aCity[parseInt(sId.substr(0, 2))],
      birthday: hBirthday,
      sex     : (sId.substr(16, 1) % 2 ? "男" : "女")
    }
  };
};

/**
 * 处理regtime时间
 */
export const regtime = (time) => {
  let timestamp = new Date().getTime();
  return Math.ceil((timestamp / 1000 - time) / (60 * 60 * 24))
};

/**
 * 字符串是否为json
 * @param str
 * @returns {boolean}
 */
export const isJsonString = (str) => {
  try {
    if (typeof JSON.parse(str) === "object") {
      return true;
    }
  } catch (e) {
  }
  return false;
};

export const inArray = (elem, array, i) => {
  let len;

  if (array) {

    len = array.length;
    /*
      i ? （i < 0 ? Math.max( 0, len + i ) : i ）: 0 如果 i 未定义 或者i为0 则 把0赋值给i
      i < 0 ? Math.max( 0, len + i ) : i
    */
    i = i ? i < 0 ? Math.max(0, len + i) : i : 0;

    for (; i < len; i++) {
      // Skip accessing in sparse arrays
      if (i in array && array[i] === elem) {
        return i;
      }
    }
  }

  return -1;
};


/**
 * dataURL to blob, ref to https://gist.github.com/fupslot/5015897
 * @param dataURI
 * @returns {Blob}
 */
export const dataURItoBlob = (dataURI) => {
  let byteString = atob(dataURI.split(',')[1]);
  let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  let ab = new ArrayBuffer(byteString.length);
  let ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], {type: mimeString})
};


