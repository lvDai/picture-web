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

function loading() {

}

export default {
    compileStr,
    uncompileStr
}