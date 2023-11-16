import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

export const Header = () => {
  const location = useLocation();

  return (
    <StyledHeader isregist={location.pathname === '/regist'}>
      <h1>{location.pathname === '/regist' ? 'Make Your Plan' : 'What to do Today'}</h1>
    </StyledHeader>
  );
};

const StyledHeader = styled.div<{ isregist: boolean }>`
  background-color: ${(p) => p.isregist && '#d9d9d9'};
  text-align: center;
  margin: 0 auto;

  width: 360px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;

  h1 {
    padding: 20px 0;
    margin: 0;
  }
`;
