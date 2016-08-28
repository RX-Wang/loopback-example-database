module.exports = function(UserInfo) {
  UserInfo.proUserList = function(uId,cb){
    var ds = UserInfo.dataSource;
    // 1 位置参数用'?'代替
    var sql = 'CALL proc_simple(?,@a,@b);';
    // 2 填充参数放在数组中
    ds.connector.execute(sql,[uId],function(err,datas){
      if (err)
        console.error(err);
      var results = datas[0][0];
      console.info(results);
      var data = {
        results : results
      };
      ds.disconnect();
      cb(err, data);
    });

  };

  UserInfo.remoteMethod(
    'proUserList',
    {
      http: {verb: 'post'},
      description: "loopback 调用 mysql 存储过程",
      accepts: [
        {arg: 'uId', type: 'Number',description:'用户ID'}
      ],
      returns: [
        {arg: 'data',type:'object'}
      ]
    }
  );






};
