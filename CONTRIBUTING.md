# Contributing to VanVenture

## Branches

`main` is the production branch. Do not work directly on it.

Create one focused branch per change:

- `feature/<short-topic>` for a new capability
- `fix/<short-topic>` for a bug fix
- `content/<short-topic>` for website content
- `chore/<short-topic>` for maintenance and tooling

Update your local `main` before starting a branch:

```bash
git switch main
git pull --ff-only
git switch -c feature/<short-topic>
```

## Change process

1. Keep each change focused and reversible.
2. Check the website locally before committing.
3. Use an imperative commit title, for example `Add vehicle profile section`.
4. Push the branch and open a pull request into `main`.
5. Merge only after the change has been reviewed and explicitly approved for public release.

## Content and publishing

All public-facing text, images, links, social posts, DNS changes, and production releases require Helmut's explicit approval immediately before publication.  
