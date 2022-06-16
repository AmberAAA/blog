---
toc: 'menu'
group:
  title: React
  order: 2
---


# React Context

[Context - React](https://zh-hans.reactjs.org/docs/context.html)

将公共的变量抽离到顶部，注入到组件当中。涉及到的核心API有三个。

## 创建Context

使用React.createContext创建Context组件

```ts
export interface Theme {
  foreground: string,
  background: string
}

export interface Themes {
  light: Theme,
  dark: Theme,
  [key: string]: Theme
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

const ThemeContext = createContext<ThemeContextInterface>({ theme: themes.dark, setTheme: () => {} })
```

## 注入Context

通过ThemeContext.Provider注入Context，必添参数value指定Context的值。

```
<ThemeContext.Provider value={ { theme, setTheme } }>
      { props.children }
</ThemeContext.Provider>
```

## 消费Context

### 方案一

使用ThemeContext.Consumer进行消费，传入一个接受value的函数。

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

使用hook

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

## 动态Context

有时需要更新Context的值，思路是将stat复制给value，并通过setStat更新，从而渲染新页面。

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
