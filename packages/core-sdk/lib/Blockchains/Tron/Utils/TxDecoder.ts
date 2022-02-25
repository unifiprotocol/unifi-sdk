import { utils } from "ethers";

export const decodeTx = (
  transaction: any,
  abis: any[]
): {
  method: string;
  signature: string;
  args: Record<string, any>;
} => {
  for (let i = 0; i < abis.length; i++) {
    try {
      return _decodeTx(transaction, abis[i]);
    } catch (error) {
      // skip invalid abis
    }
  }
  return {
    method: "unknown",
    signature: "external",
    args: {},
  };
};
const _decodeTx = (
  transaction: any,
  abi: any
): {
  method: string;
  signature: string;
  args: Record<string, any>;
} => {
  const data = "0x" + transaction.raw_data.contract[0].parameter.value.data;
  const contractAddress =
    transaction.raw_data.contract[0].parameter.value.contract_address;
  if (contractAddress === undefined)
    throw "No Contract found for this transaction hash.";

  const resultInput = _extractInfoFromABI(data, abi);
  if (!resultInput.method) {
    throw new Error("ABI does not match");
  }
  const names = resultInput.namesInput;

  const types = resultInput.typesInput;
  const args: Record<string, any> = {};
  for (let i = 0; i < names.length; i++) {
    args[names[i]] = resultInput.inputs[i];
  }
  const signature = `${resultInput.method}(${types.join(",")})`;
  return {
    signature,
    method: resultInput.method,
    args,
  };
};

function _extractInfoFromABI(data: any, abi: any) {
  const dataBuf = Buffer.from(data.replace(/^0x/, ""), "hex");

  const methodId = Array.from(dataBuf.subarray(0, 4), function (byte) {
    return ("0" + (byte & 0xff).toString(16)).slice(-2);
  }).join("");

  const inputsBuf = dataBuf.subarray(4);

  return abi.reduce(
    (acc: any, obj: any) => {
      if (obj.type === "constructor") return acc;
      if (obj.type === "event") return acc;
      const method = obj.name || null;
      const typesInput = obj.inputs
        ? obj.inputs.map((x: any) => {
            if (x.type === "tuple[]") {
              return x;
            } else {
              return x.type;
            }
          })
        : [];

      const typesOutput = obj.outputs
        ? obj.outputs.map((x: any) => {
            if (x.type === "tuple[]") {
              return x;
            } else {
              return x.type;
            }
          })
        : [];

      const namesInput = obj.inputs
        ? obj.inputs.map((x: any) => {
            if (x.type === "tuple[]") {
              return "";
            } else {
              return x.name;
            }
          })
        : [];

      const namesOutput = obj.outputs
        ? obj.outputs.map((x: any) => {
            if (x.type === "tuple[]") {
              return "";
            } else {
              return x.name;
            }
          })
        : [];
      const hash = _genMethodId(method, typesInput);
      if (hash === methodId) {
        return {
          method,
          typesInput,
          inputs: utils.defaultAbiCoder.decode(typesInput, inputsBuf),
          namesInput,
          typesOutput,
          namesOutput,
        };
      }
      return acc;
    },
    {
      method: null,
      typesInput: [],
      inputs: [],
      namesInput: [],
      typesOutput: [],
      namesOutput: [],
    }
  );
}

function _genMethodId(methodName: any, types: any) {
  const input =
    methodName +
    "(" +
    types
      .reduce((acc: any[], x: any) => {
        acc.push(handleInputs(x));
        return acc;
      }, [])
      .join(",") +
    ")";

  return utils.keccak256(Buffer.from(input)).slice(2, 10);
}

function handleInputs(input: any) {
  let tupleArray = false;
  if (input instanceof Object && input.components) {
    input = input.components;
    tupleArray = true;
  }

  if (!Array.isArray(input)) {
    if (input instanceof Object && input.type) {
      return input.type;
    }

    return input;
  }

  const ret =
    "(" +
    input
      .reduce((acc, x) => {
        if (x.type === "tuple") {
          acc.push(handleInputs(x.components));
        } else if (x.type === "tuple[]") {
          acc.push(handleInputs(x.components) + "[]");
        } else {
          acc.push(x.type);
        }
        return acc;
      }, [])
      .join(",") +
    ")";

  if (tupleArray) {
    return ret + "[]";
  }
}
