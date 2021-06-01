import styled from "styled-components";

export const StepperWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
  flex-basis: 0;
`;

export const StepNum = styled.div`
  background: #ededed;
  width: 2rem;
  height: 2rem;
  line-height: 2rem;
  border-radius: 1rem;
  text-align: center;
  font-weight: bold;
  margin-right: 0.5rem;
  transition: 0.25s background;
  color: ${(p) => (p.active ? "#fff" : "#000")};
  background: ${(p) => (p.active ? "#3f51b5" : "#ededed")};
`;

export const Step = styled.div`
  padding: 1rem;
  background: #fff;
  display: flex;
  align-items: center;
  width: 33%;
`;

export const StepAction = styled.div``;
export const StepContent = styled.div``;
