# Artwork → Post — iOS app (Capacitor wrapper)

Native iOS shell around the web tool (`www/`). The same code runs on the web at
https://yanjin-ai.github.io/artworktopost/ and inside this native app.

- **appId:** `com.yanjinli.artworktopost`  (change in `capacitor.config.json` to match your App Store Connect bundle ID)
- **appName:** Artwork
- **Plugins:** `@capacitor/share`, `@capacitor/filesystem` (exports go through the native iOS share sheet → Save Image / send to Instagram)

## Update the web content
The web app lives in `www/`. To pull in a new build of the tool:

```bash
cp /path/to/post-maker.html www/index.html   # (+ icons / manifest / sw.js if changed)
npx cap sync ios
```

## Build & run / submit (Xcode)
```bash
npx cap open ios          # opens ios/App in Xcode
```
In Xcode:
1. Select the **App** target → **Signing & Capabilities** → set your **Team** (your Apple Developer account) and a unique **Bundle Identifier**.
2. Pick a simulator or your iPhone → **Run** (⌘R) to test.
3. To submit: **Product → Archive** → **Distribute App → App Store Connect**.

## Regenerate icons / splash
Source art is in `assets/` (`icon.png` 1024², `splash.png` 2732²):
```bash
npx @capacitor/assets generate --ios
```

🤖 Generated with [Claude Code](https://claude.com/claude-code)
