# 上传 photoLock 网页到 GitHub

方式和 PhotoTalk 的 `website` 一样：源码推到 `main`，构建结果用 `npm run deploy` 推到 `gh-pages`。不要使用 `.github/workflows`。

只在 `web` 目录操作。iOS 代码留在本机。

发布后的地址：

- `https://theodoredean.github.io/photolock/`
- `https://theodoredean.github.io/photolock/privacy.html`
- `https://theodoredean.github.io/photolock/terms.html`
- `https://theodoredean.github.io/photolock/support.html`

App Store Connect 的隐私政策填 `privacy.html`，支持网址填 `support.html`。

## 当前这一步

远程 `origin` 已经是 `https://github.com/TheodoreDean/photolock`。不要再执行 `git remote add`。

```bash
cd /Users/pengyi/Desktop/coding/photoLock/web
git push -u origin main
npm install
npm run deploy
```

`npm run deploy` 会先构建，再把 `dist` 推到 `gh-pages` 分支。

然后打开仓库 **Settings → Pages**：

1. **Source** 选 **Deploy from a branch**
2. Branch 选 **gh-pages**，文件夹选 **/ (root)**
3. Save，等一两分钟后打开上面的地址

## 以后改了网页

```bash
cd /Users/pengyi/Desktop/coding/photoLock/web
git add .
git commit -m "Update legal site"
git push
npm run deploy
```

`git status` 没有改动时，跳过 `git add` 和 `git commit`，直接 `npm run deploy`。
