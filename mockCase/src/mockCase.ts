const IS_CHAR = /[a-zA-Z]/;
export function mockCase(input: string): string {
  const chars = input.split("");
  let upperCaseNext = false;

  const output = [];
  for (const char of chars) {
    if (!IS_CHAR.test(char)) {
      output.push(char);
    } else if (upperCaseNext) {
      output.push(char.toUpperCase());
      upperCaseNext = false;
    } else {
      output.push(char.toLowerCase());
      upperCaseNext = true;
    }
  }
  return output.join("");
}
