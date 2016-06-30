/**
 * Created by taw on 16/6/20.
 */
var phantom = require('phantom');

var sitepage = null;
var phInstance = null;
phantom.create()
    .then(instance => {
    phInstance = instance;
return instance.createPage();
})
.then(page => {
    sitepage = page;
return page.open('http://www.kuaidaili.com/free/');
})
.then(status => {
    console.log(status);
return sitepage.property('content');
})
.then(content => {
    console.log(content);
sitepage.close();
phInstance.exit();
})
.catch(error => {
    console.log(error);
phInstance.exit();
});