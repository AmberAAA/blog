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
