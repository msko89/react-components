import styled from '@emotion/styled/macro';
import { keyframes, css } from '@emotion/react';
import { useEffect, useMemo, useState } from 'react';

interface Props {
  width?: number;
  height?: number;
  circle?: boolean;
  rounded?: boolean;
  count?: number;
  unit?: string;
  animation?: boolean;
  color?: string;
  style?: React.CSSProperties;
}

const pulseKeyframe = keyframes`
	0% {
		opacity: 1;
	}
	50% {
		opacity: 0.4;
	}
	100% {
		opacity: 1;
	}
`;

const pulseAnimation = css`
  animation: ${pulseKeyframe} 1.5s ease-in-out infinite;
`;

const Base = styled.div<Props>`
  ${({ color }) => color && `background-color: ${color}`};
  ${({ rounded }) => rounded && 'border-radius: 8px'};
  ${({ circle }) => circle && 'border-radius: 50%'};
  ${({ width, height }) => (width || height) && 'display: block'};
  ${({ animation }) => animation && pulseAnimation}
  width: ${({ width, unit }) => width && unit && `${width}${unit}`};
  height: ${({ height, unit }) => height && unit && `${height}${unit}`};
`;

const Content = styled.span`
  opacity: 0;
`;

const Skeleton: React.FC<Props> = ({
  animation = true,
  children,
  width,
  height,
  circle,
  rounded,
  count,
  unit = 'px',
  color = '#F4F4F4',
  style,
}) => {
  const content = useMemo(
    () => [...Array({ length: count })].map(() => '-').join(''),
    [count]
  );
  return (
    <Base
      style={style}
      rounded={rounded}
      circle={circle}
      width={width}
      height={height}
      animation={animation}
      unit={unit}
      color={color}
    >
      <Content>{content}</Content>
    </Base>
  );
};

const BasePage = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(5, 1fr);
  column-gap: 12px;
  row-gap: 24px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: rgb(0 0 0 / 4%) 0px 4px 16px 0px;
  border-radius: 4px;
`;

const ImageWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Info = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
`;

const Title = styled.h4`
  margin: 0;
  padding: 0;
  font-size: 24px;
`;

const Description = styled.p`
  margin: 8px 0 0 0;
  padding: 0;
  font-size: 16px;
`;

const Placeholder: React.FC = () => (
  <Container>
    <ImageWrapper>
      <Skeleton width={320} height={220} />
    </ImageWrapper>
    <Info>
      <Skeleton width={150} height={29} rounded />
      <div style={{ height: '8px' }} />
      <Skeleton width={200} height={19} rounded />
    </Info>
  </Container>
);

const Item: React.FC = () => {
  return (
    <Container>
      <ImageWrapper>
        <Image src='https://img1.daumcdn.net/thumb/R750x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fbc4USA%2Fbtq69WpP9fO%2FVuOSUpuTidKClnqKzUri90%2Fimg.jpg' />
      </ImageWrapper>
      <Info>
        <Title>Skeleton Title</Title>
        <Description>Skeleton Description</Description>
      </Info>
    </Container>
  );
};

const SkeletonPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <BasePage>
      {loading
        ? Array.from({ length: 25 }).map((_, idx) => <Placeholder key={idx} />)
        : Array.from({ length: 25 }).map((_, idx) => <Item key={idx} />)}
    </BasePage>
  );
};

export default SkeletonPage;
