import { Button, Card, CardContent, TextField } from "@material-ui/core";
import { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { useConnection } from "../Hooks/useConnection";
import { stakingAdapterFactory } from "@unifiprotocol/staking";

const Status = {
  Idle: "Idle",
  Staking: "Staking",
  Staked: "Staked",
};

const FormField = styled.div`
  display: flex;
  align-items: baseline;
`;

export const Staking = () => {
  const { adapter } = useConnection();
  const stakingAdapter = useMemo(
    () => stakingAdapterFactory(adapter),
    [adapter]
  );

  const [state, setState] = useState(Status.Idle);
  const [amount, setAmount] = useState();

  const action = useCallback(async () => {
    switch (state) {
      case Status.Idle:
        setState(Status.Staking);
        await stakingAdapter.vote(amount);
        setState(Status.Staked);
        break;
      case Status.Staking:
      default:
        break;
    }
  }, [state, stakingAdapter, amount]);
  return (
    <Card elevation={1}>
      <CardContent>
        <FormField>
          <TextField
            onChange={(evt) => setAmount(evt.target.value)}
            label="Transaction"
            value={amount}
          />

          <Button
            variant="contained"
            color="primary"
            elevation={1}
            onClick={action}
          >
            {console.log(state)}
            {state === Status.Idle && "Sign"}
            {state === Status.Staking && "Staking..."}
            {state === Status.Staked && "Done"}
          </Button>
        </FormField>
      </CardContent>
    </Card>
  );
};
