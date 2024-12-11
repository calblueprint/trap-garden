import styled from 'styled-components';

export const MoveButton = styled.button<{ $backgroundColor: string }>`
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  color: white;
  border-radius: 20px;
  border: none;
  font-family: inherit;
  margin-bottom: 10px;
  width: 170px;
  height: 50px;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-left: 24px;
`;
export const FooterButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  padding: 24px;
`;
