#!/bin/bash
git stash --all
git checkout master
git push -f deploy master >/dev/null 2>&1
