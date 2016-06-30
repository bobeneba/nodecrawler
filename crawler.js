/**
 * Created by taw on 16/6/20.
 * auth :dengtao
 * date:20160624
 */
var request = require('superagent');
var cheerio = require('cheerio');
var log4js = require("log4js");
var log4js_config = require("./logConf.json");
log4js.configure(log4js_config);
// 使用superagent
//使用line-by-line
readwrite(log4js);








request
        .get('http://www.amazon.com/gp/bestsellers/electronics/162020011')
        .set({'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:43.0) Gecko/20100101 Firefox/43.0'})
        .end(function (err, res) {
            test(res,log4js);
            $ = cheerio.load(res.text);
            //console.log($('#index_free_list').text());
            //  console.log($('.table').text());
            var data = [];

            $('.table').each(function (i, elem) {
                data[i] = $(this).text();
              //  console.log(data[i]);



                //    var LogFile = log4js.getLogger();
                //
                //    LogFile.trace('This is a Log4js-Test');
                //    LogFile.debug('We Write Logs with log4js');
                //    LogFile.info('You can find logs-files in the log-dir');
                //    LogFile.warn('log-dir is a configuration-item in the log4js.json');
                //    LogFile.error('In This Test log-dir is : \'./logs/log_test/\'');
                //
                });

            // var temp = $('.table').text().replace(/\s+/g, '').replace(/[\r\n]/g,'');
            //data.push(data);
            // console.log(data[3]);
            //  mysqlConnect(data);


        });
//对抓取链接进行读取,写入,去空行
function readwrite(log4js){
    var LineByLineReader = require('line-by-line');
    var LogFile = log4js.getLogger("log_error");
        lr = new LineByLineReader('seed.txt');

    lr.on('error', function (err) {
        // 'err' contains error object
    });

    lr.on('line', function (line) {
        // 'line' contains the current line without the trailing newline character.

        if(line=="")
        {
            console.log("[trow NULL]::seed.txt line is null ");
            LogFile.error("[trow NULL]::seed.txt line is null ");
        }
        else console.log(line);
        // console.log(line);
    });

    lr.on('end', function () {
        // All lines are read, file is closed now.
    });

}

//抓取的页面输入1.txt,验证是否抓取成功
 function  test(res,log4js){
     var fs = require('fs');
     var LogFile = log4js.getLogger("log_crawler_info");
     var stream = fs.createReadStream('1.txt');
     fs.open('./1.txt', 'a', function (err, fd) {
         var writeBuffer = new Buffer(res.text),
             offset = 0,
             len = writeBuffer.length,
             filePostion = null;

         fs.write(fd, writeBuffer, offset, len, filePostion, function(err, readByte){
             console.log('[ok]:: start crawler html '+readByte+' bytes');
             LogFile.info('[ok]:: start crawler html '+readByte+' bytes' );

         })
     });
 }




 //连接mysql数据库
function  mysqlConnect(data){
    var mysql = require('mysql');
    var pool = mysql.createPool({
        host     : 'localhost',
        user     : 'root',
        password : '123456',
        database : 'nodecrawler'
    });

    pool.getConnection(function(err, connection){
        console.log('1 connected!');
        // 执行SQL语句
        connection.query("INSERT INTO `nodecrawler`.`ip` (`ip`, `port`, `desc`,`type`,`location`,`speed`,`time`,`catchtime`) VALUES ('112.112.134.70', '8090', '高匿名','HTTP','云南省昆明市 电信','3','2016-06-24 14:39:48','2016-06-24 14:39:48')", function(err, result){
            if(err){
                connection.rollback(function(){
                    throw err;
                });
            }
            console.log('connection 1 insert');
            console.log(result);
            // 将连接释放到连接池
            connection.release();
            console.log('connection 1 released');
        });
    });

    pool.getConnection(function(err, connection){
        if(err) throw err;
        console.log('2 connected!');
        // 执行SQL语句
        connection.query('select * from ip ', function(err, rows){
            console.log('connection 2 query');
            console.log(rows);
            // 将连接释放到连接池
            connection.release();
            console.log('connection 2 released');
        });
    });
}