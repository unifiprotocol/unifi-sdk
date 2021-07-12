import { Button, Card, CardContent } from "@material-ui/core";
import { stakingAdapterFactory } from "@unifiprotocol/staking";
import { useCallback, useMemo } from "react";
import { useConnection } from "../../Hooks/useConnection";
export const Staking = () => {
  const { adapter } = useConnection();
  const stakingAdapter = useMemo(
    () => stakingAdapterFactory(adapter),
    [adapter]
  );
  const validator = "0x6667e90b789cc04981f090ad6a03ab691934a497";
  const vote = useCallback(() => {
    stakingAdapter.vote(adapter.getAddress(), validator, "100");
  }, [stakingAdapter, adapter]);
  return (
    <Card elevation={1}>
      <CardContent>
        <h4>Stake</h4>

        <Button onClick={vote}>Vote</Button>
      </CardContent>
    </Card>
  );
};
