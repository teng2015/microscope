Meteor (流星)

##去掉autopublish包
##添加route包
##添加spin包 (帅气的动画加载画面)
meteor add sacha:spin
##添加bootstrap-3包
meteor add ian:accounts-ui-bootstrap-3
meteor add accounts-password
##去掉insecure 包(恢复数据安全)
meteor remove insecure
##添加安全检查
meteor add audit-argument-checks
##延迟补偿(添加futures 包)
----------------------------------------------
#### 一些有用的指令
打开mongo shell => meteor mongo 
去掉autopublish => meteor remove autopublish

----------------------------------------------
####个人心得：
模板+数据
<template name="postSubmit">

----------------------------------------------
####accounts 包提供currentUser 的 Helper 
它相当于是 Meteor.user() 的调用
 