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
