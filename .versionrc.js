module.exports = {
  types: [
    { type: "feat", section: "✨ Features" },
    { type: "fix", section: "🐛 Bug Fixes" },
    { type: "docs", section: "📝 Documentation" },
    { type: "style", section: "🎨 Styles" },
    { type: "refactor", section: "♻️ Code Refactoring" },
    { type: "perf", section: "⚡ Performance Improvements" },
    { type: "test", section: "✅ Tests" },
    { type: "revert", section: "⏪ Revert" },
    { type: "build", section: "📦 Build System" },
    { type: "chore", section: "🔧 chore" },
    { type: "ci", section: "👷 CI" },
  ],
  skip: {
    bump: false,
    changelog: false,
    commit: false,
    tag: false,
  },
};
