import styled from "styled-components";

export const CardStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
  height: 100%;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const ImageWrapperStyled = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
`;

export const InfoStyled = styled.div`
  margin-top: 10px;
`;

export const PriceStyled = styled.p`
  color: blue;
  margin-bottom: 8px;
`;

export const NameStyled = styled.p`
  font-weight: bold;
  margin-bottom: 8px;
`;
