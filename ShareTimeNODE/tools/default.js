/**
 * Created by liuyujing on 2017/9/6.
 */
var defaultInfo = {};

//API
//用户
//获取用户信息
defaultInfo.GET_USER_INFO = "/userInfo";
//new API
defaultInfo.NEWS = "/news";
//发布
defaultInfo.ADD_NEWS = "/addNews";
//查询发布的内容
defaultInfo.SEARCH_All_NEWS = "/searchAllNews";
//查询每一个用户发布的最后一条数据
defaultInfo.SEARCH_ALL_USERS_LAST_NEWS = "/searchAllUsersLastNews";
//消息
defaultInfo.CHATS = "/chats";
//发送消息
defaultInfo.SEND_CHAT = "/sendChat";
//接收消息
defaultInfo.RECEIVE_CHAT = "/receiveChat";

//SQL
//news
//建表
defaultInfo.SQL_CREATE_NEWS_TABLE = "CREATE TABLE `sharetime`.`news` ( `newsID` BIGINT(100) NOT NULL AUTO_INCREMENT , `type` INT NOT NULL DEFAULT '0' , `userID` BIGINT(100) NOT NULL , `des` TEXT NOT NULL , `startTime` BIGINT(100) NOT NULL , `endTime` BIGINT(100) NOT NULL , `price` BIGINT(100) NOT NULL , `lat` DOUBLE NOT NULL , `lng` DOUBLE NOT NULL , `isValidity` BOOLEAN NOT NULL DEFAULT FALSE , PRIMARY KEY (`newsID`)) ENGINE = InnoDB; ";

//发布
defaultInfo.SQL_ADD_NEWS = "INSERT INTO `news` (`newsID`, `type`, `userID`, `des`, `startTime`, `endTime`, `price`, `lat`, `lng`) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?);";

//查询发布内容
defaultInfo.SQL_SEARCH_ALL_NEWS = "SELECT * FROM news";

//查询所有用户最后一次发布的内容
defaultInfo.SQL_SEARCH_ALL_USERS_LAST_NEWS = "SELECT * FROM `news` WHERE startTime=(SELECT MAX(startTime) FROM `news` WHERE userID=news.userID)";

//查询指定字段值的SQL SELECT XXX(*) FROM tableName WHERE columName = Value

//SELECT * FROM `news` WHERE startTime=xxx 查询 startTime是多少的数据
//SELECT MAX(startTime) FROM `news` WHERE userID=news.userID
//SELECT MAX(startTime) 只获得startTime这个字段对应的值
//MAX(startTime) SQL里面的函数 最大值

//Chat
//建表
defaultInfo.SQL_CREATE_CHAT_TABLE = "CREATE TABLE `sharetime`.`chats` ( `chatsID` BIGINT(100) NOT NULL AUTO_INCREMENT , `fromID` BIGINT(100) NOT NULL , `toID` BIGINT(100) NOT NULL , `message` VARCHAR(255) NOT NULL , `currentTime` BIGINT(255) NOT NULL , PRIMARY KEY (`chatsID`)) ENGINE = InnoDB;";

//查询表
defaultInfo.SQL_RECIVE_CHAT = "SELECT * FROM `chats` WHERE `fromID` = ? AND `toID` = ?;";

//发送
defaultInfo.SQL_SEND_CHAT = "INSERT INTO `chats` (`chatsID`, `fromID`, `toID`, `message`, `currentTime`) VALUES (NULL, ？, ？, ？, ？);";

//用户相关
defaultInfo.SQL_GET_USER_INFO = "SELECT * FROM users WHERE userid=?;";

//error
//news error
defaultInfo.ERROR_NEWS_ADD_FAIL = {
    code:3000,
    message:"发布失败"
};
defaultInfo.NEWS_ADD_SUCCESS = {
    code:2000,
    message:"发布成功"
};

defaultInfo.ERROR_NEWS_SEARCH_FAIL = {
    code:3000,
    message:"未找到对应数据"
};

defaultInfo.NEWS_SEARCH_SUCCESS = {
    code:2000,
    message:"查询成功"
};

//消息
defaultInfo.CHAT_SEND_SUCCESS = {
    code:2000,
    message:"发送成功"
};
defaultInfo.ERROR_CHAT_SEND_FAIL = {
    code:3000,
    message:"发送失败"
};

//用户消息
defaultInfo.SEARCH_USER_SUCCESS = {
    code:2000,
    message:"查询用户成功"
};
defaultInfo.ERROR_SEARCH_USER_FAIL = {
    code:3000,
    message:"查询错误"
};

//comment
defaultInfo.ERROR_NOT_VALIDITY_PARAM = {
    code:3000,
    message:"未传入指定的参数"
};

module.exports = defaultInfo;
