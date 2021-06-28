import * as Throttle from "promise-parallel-throttle";

import { ExecutionResponse, IAdapter } from "../../Adapters";
import { GenericUseCase } from "../../Entities";
import { MulticallBaseAdapter } from "./MulticallBaseAdapter";

export class MulticallFallbackAdapter extends MulticallBaseAdapter {
  constructor(adapter: IAdapter) {
    super(adapter);
  }

  async execute(useCases: GenericUseCase[]): Promise<ExecutionResponse[]> {
    const promises: Throttle.Tasks<ExecutionResponse> = useCases.map(
      (useCase) => () => useCase.execute(this.adapter)
    );
    const { taskResults } = await Throttle.raw<ExecutionResponse>(promises, {
      maxInProgress: 2,
    });
    return taskResults;
  }
}
