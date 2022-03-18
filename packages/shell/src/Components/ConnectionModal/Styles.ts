import styled from "styled-components";

export const SelectionList = styled.div`
  margin-top: 1rem;
`;
export const ItemName = styled.span``;

export const ItemTags = styled.div`
  margin-left: auto;
  font-size: 1.2rem;

  > span {
    &:not(:first-of-type) {
      margin-left: 0.5rem;
    }
  }
`;

export const ItemLogo = styled.img`
  width: 1.8rem;
  margin-right: 0.5rem;
  border-radius: 50%;
`;

export const SelectionListItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.4rem 0.8rem;
  background: ${(p) => p.theme.bg};
  border-radius: ${(p) => p.theme.borderRadius};
  border: 2px solid transparent;
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition: 0.25s all;

  &.selected {
    cursor: default;
    color: ${(p) => p.theme.primary};
    border-color: ${(p) => p.theme.primary};
    background: ${(p) => p.theme.bgAlt};
  }

  &:hover {
    background: ${(p) => p.theme.bgAlt2};
  }
`;
