import React from "react";
import { BN, isNaN, localiseNumber } from "@unifiprotocol/utils";
import AnimatedNumber from "animated-number-react";
import { useCallback } from "react";

interface PrettyAmountProps {
  value: string;
  localise?: boolean;
  decimals?: number;
  animationDuration?: number;
  exponentialNotation?: boolean;
}
export const PrettyAmount: React.FC<PrettyAmountProps> = ({
  value,
  localise = false,
  decimals = 6,
  animationDuration = 0,
  exponentialNotation = false,
}) => {
  const bnVal = BN(value);
  decimals = decimals = bnVal.dp() === 0 ? 0 : decimals;

  const formatValue = useCallback(
    (value) => {
      if (isNaN(value)) {
        return <>0</>;
      }

      let formatted = BN(value).toFixed(decimals);
      if (bnVal.dp() === 0) {
        bnVal.decimalPlaces(0);
      }
      if (localise) {
        formatted = localiseNumber(formatted);
      }
      return formatted;
    },
    [bnVal, decimals, localise]
  );

  if (bnVal.isGreaterThan("100000") && exponentialNotation) {
    /*<LightTooltip title={formatValue(value)}>*/
    return <>{bnVal.toExponential(2)}</>;
  }

  if (animationDuration === 0) {
    return <>{formatValue(value)}</>;
  }
  return (
    <AnimatedNumber
      duration={animationDuration}
      value={value}
      formatValue={formatValue}
    />
  );
};
