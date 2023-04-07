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
