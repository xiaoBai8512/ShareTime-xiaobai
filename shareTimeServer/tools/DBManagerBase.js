var mysql = require("mysql");

function DBManager(dbConfig) {

    this.connectDB(dbConfig);
}

//连接数据库
DBManager.prototype.connectDB = function (dbConfig) {

    this.connection = mysql.createConnection(dbConfig);

    this.connection.connect();

};

//数据库操作的方法
DBManager.prototype.opretation = function (sql,values) {

    return new Promise(function (res,rej) {

        this.connection.query({
            sql:sql,
            values:values
        },function (error,result) {

            if (error){
                rej(error);
            }else {
                res(result);
            }

        });

    }.bind(this));
};

module.exports = DBManager;