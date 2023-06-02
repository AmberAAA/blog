---
toc: 'menu'
nav:
  title: React
---

# Styled-components

## CSS-in-JS 优点 (个人理解)

1.  向 Vue 一样，单页面文件。
2.  减少死代码
3.  降低相互之间的干扰（虽然可以使用其他手段）
4.  easy theme

:::info
我们需要通过实践去验证，它可以战胜 LESS+CSS 变量
:::

## 文档

[Why use Styled](https://styled-components.com/docs/basics#motivation)

## 使用

[前置知识-标签模板](https://es6.ruanyifeng.com/#docs/string#%E6%A0%87%E7%AD%BE%E6%A8%A1%E6%9D%BF)

```jsx
import React from 'react';
import styled from 'styled-components';

const Title = styled.div`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const Wrapper = styled.section`
  padding: 4em;
  background-color: papayawhip;
`;

export default () => (
  <Wrapper>
    <Title>Hello World</Title>
  </Wrapper>
);
```

```tsx
/**
 * title: 适配Props
 * description: 根据Props确定CSS样式
 */
import styled from 'styled-components';

export interface ButtonProps {
  primary?: boolean;
}

export const Button = styled.button<ButtonProps>`
  background-color: ${(props) => (props.primary ? 'palevioletred' : 'white')};
  color: ${(props) => (!props.primary ? 'palevioletred' : 'white')};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  cursor: pointer;
`;

export default () => (
  <div>
    <Button>Normal</Button>
    <Button primary> Primary </Button>
  </div>
);

```

```tsx
/**
 * title: 样式继承以及扩展
 * description: 可以扩展替换其他组件样式，并返回新的样式。你也可以通过`as`关键字，指定外在的表现形式，当然`as`的值也可以是一个React组件
 */

import React from 'react';
import styled from 'styled-components';
import { Button, ButtonProps } from './demo-02';

const TomatoButton = styled(Button)`
  color: tomato;
  border-color: tomato;
`;

const ReversedButton = (props: React.PropsWithChildren<ButtonProps>) => (
  <Button
    {...props}
    children={props.children?.toString().split('').reverse()}
  />
);

export default () => (
  <div>
    <TomatoButton>Tomato Button</TomatoButton>
    <Button
      primary
      as="a"
      target="_blank"
      href={'https://www.baidu.com/s?wd=' + encodeURIComponent('css in js')}
    >
      百度一下
    </Button>
    <ReversedButton>Welcome to Use CSS in JS</ReversedButton>
    <Button as={ReversedButton}>Welcome to Use CSS in JS</Button>
  </div>
);

```

```tsx
/**
 * title: 给任何组件添加样式
 * description: 需要`className`属性
 *
 */
import { FC } from 'react';
import styled from 'styled-components';

const Link: FC<{ className: string; children: any }> = (props) => (
  <a className={props.className}>{props.children}</a>
);

const StyleLink = styled(Link)`
  color: palevioletred;
  font-weight: bold;
`;

export default () => {
  return (
    <div>
      <Link className="">My Link</Link>
      <br />
      <StyleLink className="">My StyleLink</StyleLink>
    </div>
  );
};

```

```tsx
/**
 * title: 通过Props计算CSS
 * description: 注意这里是CSS上的覆盖，并不是直接替换
 *
 */
import styled from 'styled-components';
import { Button, ButtonProps } from './demo-02';

interface CustomButtonProps extends ButtonProps {
  backgroundColor?: string;
}

const CustomButton = styled(Button)`
  background-color: ${(props: CustomButtonProps) =>
    props.backgroundColor ?? 'pink'};
`;

export default () => {
  return (
    <div>
      <Button>Common Button</Button>
      <CustomButton backgroundColor="orange"> Custom Button </CustomButton>
      <br />
      <p>
        因为没有origin这个颜色，所以配置不生效，Button的属性依然在，所以表现出的背景是Button的背景
      </p>
      <CustomButton backgroundColor="origin"> Origin Button </CustomButton>
    </div>
  );
};
```


```tsx
/**
 * title: 不在Reader方法内定义样式
 * defaultShowCode: true
 */
import styled from 'styled-components';

/** 在这里定义组件样式 */
const Button = styled('button')`
  background-color: palegreen;
  border: none;
  padding: 4px;
  color: gray;
`;

export default () => {
  /* 在这里定义组件样式，是非常糟糕的写法
  const Button = styled('button')`
  `;
  */
  return (
    <div>
      <Button>Common Button</Button>
    </div>
  );
};
```

```tsx
/**
 * title: 伪元素 伪类 嵌套
 */
import React from 'react';
import styled from 'styled-components';

const Thing = styled.div.attrs(() => ({
  tabIndex: 0,
}))`
  color: blue;

  &:hover {
    color: red;
  }

  & ~ & {
    background-color: tomato;
  }

  & + & {
    background: lime; // <Thing> next to <Thing>
  }

  &.something {
    background: orange; // <Thing> tagged with an additional CSS class ".something"
  }

  .something-else & {
    border: 1px solid; // <Thing> inside another element labeled ".something-else"
  }
`;

export default () => {
  /* 在这里定义组件样式，是非常糟糕的写法
  const Button = styled('button')`
  `;
  */
  return (
    <React.Fragment>
      <Thing>Hello world!</Thing>
      <Thing>How ya doing?</Thing>
      <Thing className="something">The sun is shining...</Thing>
      <div>Pretty nice day today.</div>
      <Thing>Do not you think?</Thing>
      <div className="something-else">
        <Thing>Splendid.</Thing>
      </div>
    </React.Fragment>
  );
};

```

```tsx
/**
 * title: 修改实类
 * description: 当我们进行条件覆盖时；使用&&表示当前实例；此外，也可是使用&&进行优先级提升
 */
import styled, { css } from 'styled-components';

const Input = styled.input.attrs({ type: 'checkbox' })``;

const Label = styled.label`
  align-items: center;
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
`;

interface LabelTextProps {
  $mode?: 'dark' | 'light';
}

const LabelText = styled.span<LabelTextProps>`
  ${(props) => {
    switch (props.$mode) {
      case 'dark':
        return css`
          background-color: black;
          color: white;
          ${Input}:checked + && {
            color: blue;
          }
        `;
      default:
        return css`
          background-color: white;
          color: black;
          ${Input}:checked + && {
            color: red;
          }
        `;
    }
  }}
`;

export default () => {
  /* 在这里定义组件样式，是非常糟糕的写法
  const Button = styled('button')`
  `;
  */
  return (
    <div>
      <Label>
        <Input defaultChecked />
        <LabelText>Foo</LabelText>
      </Label>
      <Label>
        <Input />
        <LabelText $mode="dark">Foo</LabelText>
      </Label>
      <Label>
        <Input defaultChecked />
        <LabelText>Foo</LabelText>
      </Label>
      <Label>
        <Input defaultChecked />
        <LabelText $mode="dark">Foo</LabelText>
      </Label>
    </div>
  );
};

```


```tsx
/**
 * title: 覆盖子类
 * description: 当选择器中没有&,则为覆盖子类
 */
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: red;
  .hello {
    background-color: green;
    &:hover {
      background-color: yellow;
    }
  }
`;

export default () => {
  return (
    <Wrapper>
      <h1>HEADER</h1>
      <div className="hello">Hello CSS IN JS</div>
    </Wrapper>
  );
};

```


```tsx
/**
 * title: 标签属性
 * description: 当选择器中没有&,则为覆盖子类
 */
import styled from 'styled-components';

interface InputProps {
  size?: number;
  placeholder?: string;
}

const Input = styled.input.attrs((props) => ({
  // 你可以定义静态属性
  type: 'text',
  // 你也可以根据属性进行动态计算
  size: props.size ?? 12,
  placeholder: props.placeholder ?? '请输入',
  readOnly: true,
}))``;

export default () => {
  return (
    <div>
      <Input />
    </div>
  );
};

```

