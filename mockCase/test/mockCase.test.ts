import { assertEquals } from "../deps.ts";
import { mockCase } from "../src/mockCase.ts";

Deno.test("# Base case", () => {
  const input = "Lorem ipsum dolor sit amet";
  const output = "lOrEm IpSuM dOlOr SiT aMeT";
  assertEquals(mockCase(input), output);
});
