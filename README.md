# gobang
简单的五子棋，基于Canvas，使用原生JS编写，不使用第三发中间件，只包含项目构建时候用的开发工具

# DEMO
* 使用Circle CI自动构建Github Pages ![](https://img.shields.io/circleci/project/qzm/gobang/master.svg)
* Github Pages：https://qzm.github.io/gobang/

## 简介
* webpack + webpack-dev-server
* babel-loader + babel-es2015-preset + babel-env-preset + babel-stage-2-preset
* postcss with cssnano and autoprefixer
* css-loader / style-loader / file-loader / html-loader
* less and less-loader

## 相关技术
* service worker 可以离线玩游戏
* MVC模式，Model,View,Controller分离，切换到Dom的时候，只需更改View层
* 悔棋功能，通过堆栈实现悔棋功能
* 对象池
* 使用defineProperty实现简单的MVVM双向数据绑定
* less 做的 OOCSS
* ES6 的class
* 配置了postcss的autoprefixer，cssnano
* 配置了npmrc使用国内镜像加速下载
* 配置了编辑器.editorconfig
* 使用Git做项目代码管理
* 使用Facebook的yarn（类似npm）做包管理
* 简单实现了Util里的方法
* 封装了requestAnimationFrame函数
* cache纯函数结果

## 安装
```shell
yarn install
```

## 开发
```shell
yarn start
# or
yarn run dev
```

## 编译打包
```shell
yarn run build
```

