/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "node",
  resolver: "ts-jest-resolver",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  extensionsToTreatAsEsm: [".ts"],
};
