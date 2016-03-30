/**
 * Created by 杨阵雨大人 on 2016/3/29 0029.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//Schema  ：  一种以文件形式存储的数据库模型骨架，不具备数据库的操作能力
//
//Model   ：  由Schema发布生成的模型，具有抽象属性和行为的数据库操作对
//
//Entity  ：  由Model创建的实体，他的操作也会影响数据库
//Schema生成Model，Model创造Entity，Model和Entity都可对数据库操作造成影响，但Model比Entity更具操作性。
//命名规则：
//PersonSchema;   //Person的文本属性
//PersonModel;    //Person的数据库模型
//PersonEntity;   //Person实体

var UserSchema = new Schema({
    username: {type: String, index: {unique: true}},
    name:String,
    password: String,
    avatar: {
        type: String,
        default: '/images/default-avatar.jpeg'
    },
    title: {
        type: String,
        default: '未命名博客'
    },
    description: {
        type: String,
        default: '博主很懒，还没有添加任何描述……'
    }
});
var passportLocalMongoose = require('passport-local-mongoose');
//npm install --save passport-local-mongoose passport-local passport
//上面这几个包都是可以用来做加密、验证的。
//Node.js内置的crypto模块封装了OpenSSL的诸多算法：hash、hmac、cipher、decipher，还有签名和验证方法。我们可以使用它来进行密码加密。当然我们除了手动实现该过程，也可以使用工具来进行加密与验证。
UserSchema.plugin(passportLocalMongoose);
//上述的配置为UserSchema添加了一个插件，该插件为User模型添加了一些验证和加密方法，这些方法马上就会看到。
module.exports = mongoose.model('User', UserSchema);