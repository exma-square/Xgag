# Xgag

Express.js starter, collection for most usage library.

## pre-install

 * node.js@0.10.22
 * npm
 * [mongojs](https://github.com/mafintosh/mongojs)
 * [express@4.11.1rc](http://github.com/strongloop/express/)
 * npm install -g bower

## loca env setup

`sudo vim /etc/hosts`

```
127.0.0.1    dev.xgag.com
```

`sudo vim /usr/local/etc/nginx/nginx.conf`

```
server {
    listen 80;
    server_name dev.xgag.com;
    location / {
      proxy_set_header Host      $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_pass http://127.0.0.1:1337;
    }
}
```


## how to start

```
npm start
open http://localhost:7000
```

##include

 * jade
 * bootstrap

#TODO  

 * bootstrap build in
 * collect sample page for jade

#schema

```
user:{
  name:
  password:
  email:
}
post:{
  voteId:
  userId:
  commentId:
  title:
  url:
  description:
  img:
  site_name:
}
vote:{
  userId:
  postId:
  good:
  bad:
}
comment:{
  userId:
  message:
}
```
## 大家安安
