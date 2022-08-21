---
nav:
  title: WebAssembly
  order: 100
toc: menu
order: 100
---

# WASM 简介




## 特点
> [MDN WebAssembly](https://developer.mozilla.org/en-US/docs/WebAssembly)

`WASM` 是一种运行在现代浏览器上的代码，他是一个像C、C++、Rust之类的低级语言，通过编译成字节码，以一个近似原生的速度与Javascript一同运行。
˜
`WASM` 对Web平台有重要意义，他为浏览器运行多种语言，以及接近原生运行速度的方式。

`WASM` 被设计成通Javascript一同运行，通过`WebAssembly Javascript API`加载`WebAssembly modules` 并且两者之间可以互相调用。因此你可以同时得到WASM的高性能以及Javascript的强大灵活性。

## 使用 Rust 编译 WASM 模块

> [Wasm Pack 官方文档](https://rustwasm.github.io/docs/wasm-pack/)
### 安装 wasm-pack


*ubuntu 22 使用cargo安装会报错，这里使用脚本进行安装*
```bash
curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh
```



##  参考资料
> [MDN WebAssembly](https://developer.mozilla.org/en-US/docs/WebAssembly)
> [Wasm Pack 官方文档](https://rustwasm.github.io/docs/wasm-pack/)
