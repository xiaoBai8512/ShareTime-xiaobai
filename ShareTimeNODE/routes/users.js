var express = require('express');
var router = express.Router();
var DBManager = require("../tools/DBManager");
var defaultInfo = require("../tools/default")
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/register",function (req,res) {

});

router.get(defaultInfo.GET_USER_INFO,function (req,res) {
    if (req.query.userID){
        DBManager.getUserInfo([req.query.userID]).then(function (result) {
            if (result){
                defaultInfo.SEARCH_USER_SUCCESS.data = result;
                res.send(defaultInfo.SEARCH_USER_SUCCESS);
            }
        }).catch(function (error) {
            res.send(defaultInfo.ERROR_SEARCH_USER_FAIL);
        });
    }else {
        res.send(defaultInfo.ERROR_NOT_VALIDITY_PARAM);
    }
});

module.exports = router;
