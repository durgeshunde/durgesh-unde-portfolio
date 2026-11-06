# Restore the previous portfolio

The complete portfolio from before this redesign is preserved on the remote branch:

`backup/before-premium-redesign-2026-11-06`

Original commit: `c20036f90a90ee7cf8a54417abfd9a5cad986bba`.

To restore it without rewriting Git history, start with a clean checkout, then run:

```bash
git fetch origin
git switch main
git pull --ff-only
git restore --source=origin/backup/before-premium-redesign-2026-11-06 --staged --worktree .
git commit -m "Restore portfolio before portrait redesign"
git push origin main
```

The existing GitHub Pages workflow will publish the restored version. The backup includes the original source, resume, screenshots, research PDFs, dependency lockfile, and deployment configuration.
