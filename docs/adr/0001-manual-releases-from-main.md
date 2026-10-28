# Manual releases from `main`, with no `dev` branch

All work merges to `main`, but merging no longer publishes. A release is cut by hand by running the Release workflow (`workflow_dispatch`) on `main`. semantic-release then bundles every commit since the last tag into one version. We made this change because a feature is often built in several slices (e.g. #192 as #194–#196), and releasing on every push shipped each half-finished slice to npm as its own version.

## Considered Options

- **Release on every push to `main`** (the previous setup): every merged `feat:`/`fix:` was published straight away, so we couldn't choose when a feature was ready to ship.
- **A long-lived `dev` branch, with `main` only for releases**: rejected because it means two branches to keep in sync, a release PR every time, and PRs aimed away from the default branch, which the agent workflows and `gh` assume. That's too much process for a one-maintainer package.
- **A semantic-release prerelease branch (`next`)**: not needed yet. Add it if people ever need to try builds before a stable release.

## Consequences

- `main` can hold unreleased work. Check what's waiting with `git log $(git describe --tags --abbrev=0)..main`.
- Every slice merged to `main` should still leave the overlay working, because a release can be cut at any time.
