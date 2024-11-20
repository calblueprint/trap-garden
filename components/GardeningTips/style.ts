import styled from 'styled-components';

export const Container = styled.div`
  background-color: #f9f9f9;
  padding: 1.5rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-family: Arial, sans-serif;
  color: #333;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 6px;
`;

export const IconWrapper = styled.span`
  margin-right: 6px;
  color: #8bc34a;
`;

export const TipsList = styled.ol`
  margin: 0;
  padding-left: 0;
  font-size: 1rem;
  line-height: 1.5;
  list-style-position: inside;
`;
