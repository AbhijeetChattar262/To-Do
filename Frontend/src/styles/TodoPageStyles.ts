import styled from "styled-components";

export const Container = styled.div`
  max-width: 1010px;
  margin: 30px auto;
  padding: 17px;
  border-radius: 15px;
  background-color: #f7f7f7;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 35px;
`;

export const Col = styled.div`
  flex: 1;
  margin: 0 10px;
  padding: 15px;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease, transform 0.3s ease;

  &:hover {
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
    transform: translateY(-5px);
  }
`;

export const TaskTitle = styled.h3`
  color: #333;
  margin-bottom: 30px;
  font-weight: 600;
  text-align: center;
  font-size: 1.8rem;
  letter-spacing: 0.5px;
`;
