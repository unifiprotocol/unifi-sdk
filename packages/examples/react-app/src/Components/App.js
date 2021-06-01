import { Container } from "@material-ui/core";
import styled from "styled-components";
import { ConnectionAssistant } from "./ConnectionAssistant";
import { OnlinePanel } from "./OnlinePanel";

const AppWrapper = styled.div`
  h4 {
    margin: 0;
  }
`;

function App() {
  return (
    <AppWrapper>
      <Container>
        <ConnectionAssistant />
        <OnlinePanel />
      </Container>
    </AppWrapper>
  );
}

export default App;
