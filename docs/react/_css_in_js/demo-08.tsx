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
