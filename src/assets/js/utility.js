//对字符串进行加密   
function compileStr(code) {
    var encode = encodeURI(code);
    // 对编码的字符串转化base64
    code = btoa(encode);
    var c = String.fromCharCode(code.charCodeAt(0) + code.length);
    for (var i = 1; i < code.length; i++) {
        c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
    }
    return escape(c);
}
//字符串进行解密   
function uncompileStr(code) {
    code = unescape(code);
    var c = String.fromCharCode(code.charCodeAt(0) - code.length);
    for (var i = 1; i < code.length; i++) {
        c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
    }
    var decode = atob(c);
    // 编码转字符串
    decode = decodeURI(decode);
    return decode;
}

// cookie存值
function setCookie(name, value, Days = 30 * 60 * 1000) {
    var exp = new Date()
    exp.setTime(exp.getTime() + Days)
    document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString()
}

// cookie取值
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}


// 清除指定cookie值
function delCookie(name) {
    setCookie(name, "", -1)
}


//   清除全部cookie值
function clearCookie() {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g)
    if (keys) {
        for (var i = keys.length; i--;) {
            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
        }
    }
}

function loading() {

}

export default {
    compileStr,
    uncompileStr,
    setCookie,
    getCookie,
    delCookie,
    clearCookie
}