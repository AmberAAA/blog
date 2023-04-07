/**
 * title: Hello World
 * description: 使用styled将样式与组件分离
 */
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