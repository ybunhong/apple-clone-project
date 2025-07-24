module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2, //0 is ignore, 1 is allow commit but show warining, 2 is block commit
      "always", //conditon
      ["feat", "init", "add", "change", "fix", "chore", "refactor", "docs", "style", "test", "perf", "ci", "build"], // Customize here
    ],
    "subject-case": [2, "always", "lower-case"]
  },
};
