import styled from 'styled-components';

export const SearchBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  position: relative;
`;

export const IconWrapper = styled.div`
  position: absolute;
  left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none; /* Prevent the icon from blocking input clicks */
`;

export const SearchBarInput = styled.input`
  padding: 8px 8px 8px 32px;
  border: none;
  border-radius: 16px;
  background-color: #f7f7f7;
  width: 100%;
  color: #888;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
