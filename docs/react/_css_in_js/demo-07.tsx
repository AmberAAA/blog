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
