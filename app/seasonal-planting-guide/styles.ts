import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: 1rem;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2px 24px 20px 24px;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  width: 100%;
`;

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  margin-top: 12px;
  overflow-x: auto;
`;

export const StateOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const PageTitle = styled.div`
  margin-bottom: 8px;
`;

export const PlantListContainer = styled.div`
  width: 100%;
`;
