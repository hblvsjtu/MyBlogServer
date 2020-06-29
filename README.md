# myBlogServer

博客系统后台

## 使用方法

```bash
npm i # 安装依赖

npm run build # 编译文件
npm run server # 启动服务器
npm run start # 启动监控
npm run pretty # 美化代码
npm run genlog # 创建changelog
npm run commit # 提交代码
nom run test # 测试
```

## 上线步骤

### 1、安装依赖

`npm run install`

### 2、编译

`npm run build`

### 3、启动 mysql 数据库

### 4、启动 redis

`npm run redis`

### 5、启动 crontab 定时任务

```bash
crontab -e
* 0 * * * sh /Users/lvhongbin/Desktop/github/MyBlogServer/bash/copy.sh
```

### 6、启动服务

`npm run server`

### 7、启动 nginx

`nginx`

### 8、启动 pm2

`npm run online`

## pm2 常用方法

-   pm2 logs
-   pm2 monit
-   pm2 [start|restart|stop|delete] ecosystem.config.js
