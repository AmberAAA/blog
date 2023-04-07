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
