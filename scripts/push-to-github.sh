#! /usr/bin/env bash
#
# This script is designed to be run locally.
# This pushes the external-main branch on GitLab to the main branch on GitHub

# Run from the root directory without any argument
# $ ./scripts/push-to-github.sh

set -o errexit
set -o xtrace

GITHUB_URL=git@github.com:sisense/compose-sdk-react-demo.git

# check out the external-main branch
git clean -df
git fetch origin
git checkout -B external-main origin/external-main

# Remove .gitlab-ci.yml from the repo.
rm -f .gitlab-ci.yml
git add .

# Re-commit with compose-sdk-release-bot's author metadata.
git commit --amend --no-edit --reset-author

# Run script with node directly instead of yarn version:current so we avoid
# installing dependencies.
current_version=$(node ./scripts/current-version.cjs)
new_published_tag="v${current_version}-external"

# Push tag to GitLab
git tag -f ${new_published_tag}
git push -f origin ${new_published_tag}

# Push external-main to GitHub's main branch
if [ ! -z $(git remote | grep -w external) ]; then
  git remote remove external
fi

git remote add external ${GITHUB_URL}
git fetch external
git push -f external HEAD:main

# Force update external-main in GitLab (since the bot amended the last commit)
git push -f origin external-main
