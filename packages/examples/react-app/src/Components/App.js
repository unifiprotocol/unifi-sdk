import { Card, CardContent, Container } from "@material-ui/core";
import styled from "styled-components";
import { useConnection } from "../Hooks/useConnection";
import { ConnectionAssistant } from "./ConnectionAssistant";
import { Erc20Info } from "./Erc20Info";
import { OnlinePanel } from "./OnlinePanel";
import { PoolInfo } from "./PoolInfo";
const AppWrapper = styled.div`
  h4 {
    margin: 0 0 0.5rem 0;
  }

  .mb-4 {
    margin-bottom: 1rem;
  }
`;

function App() {
  const { adapter } = useConnection();
  return (
    <AppWrapper>
      <Container>
        <ConnectionAssistant />
        {!adapter && (
          <Card elevation={0}>
            <CardContent>Connect to start interacting</CardContent>
          </Card>
        )}

        {adapter && (
          <div className="mb-4">
            <OnlinePanel />
          </div>
        )}

        {adapter && <Erc20Info />}
        {adapter && <PoolInfo />}
      </Container>
    </AppWrapper>
  );
}

export default App;
