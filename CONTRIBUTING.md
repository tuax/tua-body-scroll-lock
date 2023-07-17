# Contributing Guide

Hi! We are really excited that you are interested in contributing to tua-body-scroll-lock. Before submitting your contribution, please make sure to take a moment and read through the following guide:

## 👨‍💻 Repository Setup

The package manager used to install and link dependencies must be [pnpm](https://pnpm.io/).

Run `pnpm install` to install the dependencies.

## 💡 Commands
> 💡 If you use VS Code, you can hit `⇧ ⌘ B` or `Ctrl + Shift + B` to launch all the necessary dev tasks.

### test
- Run `npm test` to run core tests
- Run `npm run test:unit:tdd` to run tests in watch mode

### dev
Run `npm start` or `npm run dev` to build sources in watch mode

### play
- `npm play:v` to play with `examples/vanilla` project
- `npm play:vue` to play with `examples/vue` project
- `npm play:react` to play with `examples/react` project

### build
Run `npm run build` to build this package.

## 🙌 Sending Pull Request
### Discuss First
Before you start to work on a feature pull request, it's always better to open a feature request issue first to discuss with the maintainers whether the feature is desired and the design of those features. This would help save time for both the maintainers and the contributors and help features to be shipped faster.

For typo fixes, it's recommended to batch multiple typo fixes into one pull request to maintain a cleaner commit history.

### Commit Convention
We use [Commitlint](https://commitlint.js.org/#/) for commit messages, which allows the changelog to be auto-generated based on the commits. Please read the guide through if you aren't familiar with it already.

Only `fix:` and `feat:` will be presented in the changelog.

Note that `fix:` and `feat:` are for **actual code changes** (that might affect logic). For typo or document changes, use `docs:` or `chore:` instead:

- ~~`fix: typo`~~ -> `docs: fix typo`

### Pull Request

If you don't know how to send a Pull Request, we recommend reading [the guide](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request).

When sending a pull request, make sure your PR's title also follows the [Commitlint](https://commitlint.js.org/#/).

If your PR fixes or resolves an existing issue, please add the following line in your PR description (replace `123` with a real issue number):

```markdown
fix: close #123
```

This will let GitHub know the issues are linked, and automatically close them once the PR gets merged. Learn more at [the guide](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword).
