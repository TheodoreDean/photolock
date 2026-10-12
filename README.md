# photoLock legal site

中英切换的静态页面，给 App Store Connect 的隐私政策网址和支持网址使用。

- 隐私政策：`privacy.html`
- 使用条款：`terms.html`
- 支持：`support.html`

文案按当前 app 的行为编写：照片和视频只在设备上用 AES-GCM 加密保存，密码只存哈希，没有账号和上传服务器。

## 发布前要改

联系邮箱在 `src/config.js` 的 `contactEmail`，当前是 `bobojensen@163.com`。

适用法律写在 `src/i18n.js` 的条款「条款变更与适用法律」一节。如果开发者不在中国，请改掉中英两段。

## 本地预览

```bash
cd web
npm install
npm run dev
```

## 构建

```bash
npm run build
```

产物在 `dist`。上传方式与 PhotoTalk 的 website 相同：源码在 `main`，`npm run deploy` 把构建结果推到 `gh-pages`。步骤见 [SOP.md](SOP.md)。
