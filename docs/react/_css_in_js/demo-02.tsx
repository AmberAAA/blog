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
