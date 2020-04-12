# Overview
The use of this package is to determine what commit/s has not yet been cherry picked between two branches. This is useful if you have multiple branches with different release cycles. (i.e. development branch, stable branch, staging branch, etc.)

**Note !!!**
- The package does the filtering by checking the difference of the commit messages. So this will only work correctly for cherry-picked commits that has the same commit message as its source. 
- Requires that git is already installed on the system.

# Installation
- Install the package globally
```
npm install -g git-cherry-diff
```

# How to use
- Go to your project's directory
- Then execute the command on the current directory. Make sure to replace **\<branchA\>** and **\<branchB\>** with actual branch name.
```
npx git-cherry-diff <branchA> <branchB>
```
