import React from "react";
import { CollapsibleCard } from ".";
import styled from "styled-components";

export default {
  title: "Components/CollapsibleCard",
};

const ExampleWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
`;

const CollapsibleContent = () => {
  return <div>Collapsible Content</div>;
};

export const Default: React.FC = () => (
  <>
    <h1>CollapsibleCard</h1>
    <ExampleWrapper>
      <CollapsibleCard details={<CollapsibleContent />}>
        Content
      </CollapsibleCard>
      <CollapsibleCard details={<CollapsibleContent />}>
        Content
      </CollapsibleCard>
      <CollapsibleCard details={<CollapsibleContent />}>
        Content
      </CollapsibleCard>
      <CollapsibleCard details={<CollapsibleContent />}>
        Content
      </CollapsibleCard>
      <CollapsibleCard>Content</CollapsibleCard>
      <CollapsibleCard>Content</CollapsibleCard>
    </ExampleWrapper>
  </>
);
