# Requirement: Checklists and Notes 

## Data
+ Group
    + Category
        + Subject
            + checklist
                + Counter
            + notes
                + Counter

## Functional
- [x] Create a CLI App.
    - [x] Generate new Checklist, Notes or both (based on templates).
    - [x] Generate Checklist for Training Videos.
    - [ ] Generate Checklist for Youtube channels using a Bookmarklet.
- [x] Create a API.
  - [x] /structure
  - [ ] /file
- [ ] Create a React App.

## Tests
- [ ] CLI
    - [ ] call without command ``` node cli ```.
    - [ ] call without path ``` node cli new-notes ```.
    - [ ] call with path less than 4 levels ``` node cli new-notes dev/devops/git/```.
    - [ ] call with path more than 4 levels ``` node cli new-notes dev/devops/git/gitflow/wrong```.
- [ ] API
    - [ ] check schema ``` /structure ```
