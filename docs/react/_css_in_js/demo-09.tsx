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
