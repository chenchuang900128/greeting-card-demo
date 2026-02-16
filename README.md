# 除夕快乐 · 问候卡片演示

基于 React + Vite + Tailwind CSS + Framer Motion 的问候卡片组件，带红包雨彩蛋。

## 运行

```bash
cd greeting-card-demo
npm install
npm run dev
```

浏览器打开终端显示的本地地址（如 http://localhost:5173）即可查看。点击「点我领红包」触发红包雨。

## 技术栈

- **React 18** + **TypeScript**
- **Vite** 构建
- **Tailwind CSS** 样式
- **Framer Motion** 动画与红包雨效果

## 项目结构

```
greeting-card-demo/
├── src/
│   ├── GreetingCard.tsx   # 问候卡片 + 红包雨
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── vite.config.ts
```

## 自定义

在 `App.tsx` 中修改 `message` 可更换祝福文案：

```tsx
<GreetingCard message="新年快乐！" />
```
