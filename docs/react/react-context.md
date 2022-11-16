---
toc: 'menu'
nav:
  title: React
---

# React Context

[Context - React](https://zh-hans.reactjs.org/docs/context.html)

将公共的变量抽离到顶部，注入到组件当中。涉及到的核心 API 有三个。

## 创建 Context

使用 React.createContext 创建 Context 组件

```ts
export interface Theme {
  foreground: string;
  background: string;
}

export interface Themes {
  light: Theme;
  dark: Theme;
  [key: string]: Theme;
}

export const themes: Themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
  },
};

const ThemeContext = createContext<ThemeContextInterface>({
  theme: themes.dark,
  setTheme: () => {},
});
```

## 注入 Context

通过 ThemeContext.Provider 注入 Context，必添参数 value 指定 Context 的值。

```
<ThemeContext.Provider value={ { theme, setTheme } }>
      { props.children }
</ThemeContext.Provider>
```

## 消费 Context

### 方案一

使用 ThemeContext.Consumer 进行消费，传入一个接受 value 的函数。

```
<ThemeContext.Consumer>
    {({ theme, setTheme }) => (
      <React.Fragment>
        <div>Hello World! - { theme.background } - { theme.foreground } </div>
        <Button onClick={() => setTheme(theme === themes.dark ? themes.light : themes.dark)} > Change </Button>
      </React.Fragment>
    )}
</ThemeContext.Consumer>
```

### 方案二

使用 hook

```
const Word:FC = () => {
  const { theme, setTheme } = useContext(ThemeContext)
  return (
    <div style={{color: theme.background, backgroundColor: theme.foreground}}>
      <p>Hello Wolrd</p>
      <Button onClick={() => setTheme(theme === themes.dark ? themes.light : themes.dark)} >Change</Button>
    </div>
  )
}
```

## 动态 Context

有时需要更新 Context 的值，思路是将 stat 复制给 value，并通过 setStat 更新，从而渲染新页面。

```
const ThemeProvider: FC = (props) => {

  const [ theme, setTheme ] = useState(themes.dark)

  return (
    <ThemeContext.Provider value={ { theme, setTheme } }>
      { props.children }
    </ThemeContext.Provider>
  )
}

const Word:FC = () => {
  const { theme, setTheme } = useContext(ThemeContext)
  return (
    <div style={{color: theme.background, backgroundColor: theme.foreground}}>
      <p>Hello Wolrd</p>
      <Button onClick={() => setTheme(theme === themes.dark ? themes.light : themes.dark)} >Change</Button>
    </div>
  )
}
```

## 代码

[react-playground/App.tsx at react-context · AmberAAA/react-playground](https://github.com/AmberAAA/react-playground/blob/react-context/src/App.tsx)
