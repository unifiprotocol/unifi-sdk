import { Button, Card, CardContent, TextField } from "@material-ui/core";
import { useCallback, useEffect, useMemo, useState } from "react";
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
const SESAMESEED_TRX_VALIDATOR = "TGzz8gjYiYRqpfmDwnLxfgPuLVNmpCswVp";
export const Staking = () => {
  const { adapter } = useConnection();
  const stakingAdapter = useMemo(
    () => stakingAdapterFactory(adapter),
    [adapter]
  );

  const [state, setState] = useState(Status.Idle);
  const [votes, setVotes] = useState({ available: "0", total: "0" });
  const [amount, setAmount] = useState();

  useEffect(() => {
    if (stakingAdapter) {
      stakingAdapter.getVotingPower().then(setVotes);
    }
  }, [stakingAdapter]);

  const action = useCallback(async () => {
    // eslint-disable-next-line default-case
    switch (state) {
      case Status.Idle:
        setState(Status.Staking);
        await stakingAdapter.vote(SESAMESEED_TRX_VALIDATOR, amount);
        setState(Status.Staked);
        break;
      case Status.Staking:
      case Status.Staked:
        stakingAdapter.getVotingPower().then(setVotes);
        setState(Status.Idle);
        break;
    }
  }, [state, stakingAdapter, amount]);
  return (
    <Card elevation={1}>
      <CardContent>
        <div>
          You have {votes.available} of {votes.total} votes available
        </div>
        <FormField>
          <TextField
            onChange={(evt) => setAmount(evt.target.value)}
            label="Amount"
            value={amount}
          />

          <Button
            variant="contained"
            color="primary"
            elevation={1}
            onClick={action}
          >
            {console.log(state)}
            {state === Status.Idle && "Vote"}
            {state === Status.Staking && "Voting..."}
            {state === Status.Staked && "Done"}
          </Button>
        </FormField>
      </CardContent>
    </Card>
  );
};
