/**
 * @type {import('semantic-release').GlobalConfig}
 */

const parserOpts = {
  headerPattern: /^(?:\[([A-z]*-\d+)]\s)?(\w*)(?:\((.*)\))?!?:\s(.*)$/,
  headerCorrespondence: ["ticket", "type", "scope", "subject"],
};

const presetConfig = {
  host: "https://github.com",
  owner: "SalahAdDin",
  repository: "strapi-template",
};

module.exports = {
  branches: ["main", "next"],
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "conventionalcommits",
        presetConfig,
        releaseRules: [
          { breaking: true, release: "major" },
          { revert: true, release: "patch" },
          { type: "build", release: "patch" },
          { type: "docs", release: "patch" },
          { type: "feat", release: "minor" },
          { type: "fix", release: "patch" },
          { type: "perf", release: "patch" },
          { type: "refactor", release: "patch" },
        ],
        parserOpts,
      },
    ],
    [
      "@semantic-release/release-notes-generator",
      {
        preset: "conventionalcommits",
        presetConfig: {
          ...presetConfig,
          types: [
            { type: "build", section: "Build", hidden: false },
            { type: "chore", section: "Chores", hidden: true },
            { type: "ci", section: "CI/CD", hidden: false },
            { type: "docs", section: "Docs", hidden: false },
            { type: "feat", section: "Features", hidden: false },
            { type: "fix", section: "Bug Fixes", hidden: false },
            { type: "perf", section: "Performance", hidden: false },
            { type: "refactor", section: "Refactor", hidden: false },
            { type: "style", section: "Code Style", hidden: false },
            { type: "test", section: "Tests", hidden: false },
          ],
        },
        parserOpts,
      },
    ],
    [
      "@semantic-release/changelog",
      {
        changelogFile: "CHANGELOG.md",
        changelogTitle: "# Releases",
      },
    ],
    "@semantic-release/npm",
    [
      "@semantic-release/git",
      {
        assets: ["package.json", "CHANGELOG.md"],
        message:
          "[STP-000] chore(release): ${nextRelease.version} ${nextRelease.type} [skip ci]",
      },
    ],
    "@semantic-release/github",
  ],
};
