/**
 * Created by taw on 16/6/21.
 */
var page = require('webpage').create();
//网址换成本公司的了，自私一下
page.open('http://www.baidu.com/',function(status){//打开页面
    if(status !== 'success'){
        console.log('FAIL to load the address');
    }
    else{
        console.log(page.toSource());
    }
    phantom.exit();
});