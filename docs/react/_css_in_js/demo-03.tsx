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
