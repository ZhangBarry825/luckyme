import axios from 'axios'
import $ from 'jquery'
import { Message } from 'element-ui';


let domain = ""; //api域名
let baseParams = { //基础参数
    token: "",
    userid: 0
    //......
};

function dataGet(apiName, params, callback){
    let url = domain + apiName;
    let obj = initFn(params, callback, arguments[1]); //init方法实现见后
    let nparams = obj.nparams;
    callback = obj.callback;

    axios.get(url, {params: nparams}).then((response) => {
        let all = response; //返回所有数据
        let data = response.data; //根据后端实际返回修改
        //根据后端实际返回修改
        if(data.code===200){ //成功
            if(callback) callback(data, all);
        }else{ //失败
            console.log(data.msg);
        }
    }).catch((error)=>{
        console.log(error);
    });
}

function dataPost(apiName, params, callback){
    let url = domain + apiName;
    let obj = initFn(params, callback, arguments[1]);
    let nparams = obj.nparams;
    callback = obj.callback;

    axios.post(url, nparams).then((response) => {
        let all = response;
        let data = response.data; //根据后端实际返回修改

        //根据后端实际返回修改
        if(data.code===200){ //成功
            if(callback) callback(data, all);
        }else{ //失败
            console.log(data.msg);
        }
    }).catch((error)=>{
        console.log(error);
    });
}

function dataPostXD(apiName, params, callback){
    let url = domain + apiName;
    let obj = initFn(params, callback, arguments[1]);
    let nparams = obj.nparams;
    callback = obj.callback;

    axios.post(url, nparams).then((response) => {
        let all = response;
        let data = response.data; //根据后端实际返回修改

        //根据后端实际返回修改
        if(data.code===200){ //成功
            Message({message: '操作成功！', type: 'success'});
            if(callback) callback(data, all);
        }else{ //失败
            console.log(data.msg);
            Message({message: '操作失败！', type: 'error'});
        }

    }).catch((error)=>{
        console.log(error);
        Message({message: '操作失败！', type: 'error'});
    });
}

function initFn(params, callback, argument){
    //如果没有参数
    if (typeof argument === "function"){
        callback = argument;
        params = {};
    }
    //对象合并,确定最终参数
    return {
        nparams: $.extend({}, params, baseParams),
        callback: callback
    }
}

export{
  dataGet,
  dataPost,
  dataPostXD
}

