var defaultInfo = require("../tools/default");

var DBManager = require("../tools/DBManager");

var router = require("express").Router();
//发送消息
router.post(defaultInfo.SEND_CHAT,function (req,res) {
    if(req.body.fromID&&req.body.toID&&req.body.message){

       var body = [req.body.fromID,req.body.toID,req.body.message,new Date().getTime()];

        DBManager.sendChat(body).then(function (result) {
            res.send(defaultInfo.CHAT_SEND_SUCCESS);
        }).catch(function (error) {
            console.log(error);
            res.send(defaultInfo.ERROR_CHAT_SEND_FAIL);
        });
    }else{
        res.send(defaultInfo.ERROR_NOT_VALIDITY_PARAM);
    }
});

//接收消息
router.post(defaultInfo.RECEIVE_CHAT,function (req,res) {
    if(req.body.fromID&&req.body.toID){
        DBManager.receiveChat([req.body.fromID,req.body.toID]).then(function (result) {
            defaultInfo.CHAT_SEND_SUCCESS.data = result;
            res.send(defaultInfo.CHAT_SEND_SUCCESS);
        }).catch(function () {
            res.send(defaultInfo.ERROR_CHAT_SEND_FAIL);
        });
    }else {
        res.send(defaultInfo.ERROR_NOT_VALIDITY_PARAM);
    }
});

module.exports = router;