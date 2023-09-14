#! /usr/bin/env bash
#
# Run this script locally to update the external-main branch in the remote repo
# with the all the new changes from the master branch.
#
# Run without argument
# $ ./scripts/update-external-main.sh

set -o errexit
set -o xtrace

git clean -df

git fetch origin
git checkout -B external-main origin/external-main

# Reset your local external-main branch to the master branch and stage changes.
git diff origin/external-main origin/master | git apply --whitespace=fix

# Remove sensitive or irrelevant information
rm -Rf ./src/internal
mv ./src/main_public.tsx ./src/main.tsx
mv ./src/SidebarNavigation_public.tsx ./src/SidebarNavigation.tsx

# need to regenerate the yarn.lock file after all the changes
yarn install

git add .

# Run script with node directly instead of yarn version:current so we avoid
# installing dependencies.
current_version=$(node ./scripts/current-version.cjs)
target_tag="v${current_version}"

# Commit changes using current package.json.
git commit -m "Release ${target_tag}"

# Push to the destination branch. This should be a fast-forward update, so no
# force is needed.
git push origin HEAD:external-main
