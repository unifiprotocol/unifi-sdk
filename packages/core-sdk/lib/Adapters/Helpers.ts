import { ExecutionResponse } from "../Types";

export const nonSuccessResponse = (
  value: Partial<ExecutionResponse> = {}
): ExecutionResponse => ({
  success: false,
  value: "",
  hash: "",
  ...value,
});

export const successResponse = (
  value: Partial<ExecutionResponse> = {}
): ExecutionResponse => ({
  success: true,
  value: "",
  hash: "",
  ...value,
});
