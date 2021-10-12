# new-sky
vue3+typescript+element plus+IM

# 多页面
发现vite可以通过vite serve制定根目录，也就说我们可以在启动项目时指定root参数。那这样我们就可以通过配置不同的npm scripts命令来进入不同的入口。
在这个阶段修改根目录后，启动项目会因为配置文件找不到而报错，所以需要重新手动指定 --config 参数。

"scripts": {
    "nested":"vite serve src/nested/ --config ./vite.config.ts",
}