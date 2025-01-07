# Print Component Version File Table

This extension prints a table with component, version and files including a total number of files

Example:
```
┌─────────┬───────────────────┬─────────┬───────┐
│ (index) │       Name        │ Version │ Files │
├─────────┼───────────────────┼─────────┼───────┤
│    0    │      'ROOT'       │   '~'   │  83   │
│    1    │     'server'      │ '10.14' │ 1087  │
│    2    │     'server'      │ '10.15' │ 1087  │
│    3    │     'server'      │ 'next'  │ 1087  │
│    4    │      'ocis'       │  '5.0'  │  287  │
│    5    │      'ocis'       │  '7.0'  │  309  │
│    6    │      'ocis'       │ 'next'  │  309  │
│    7    │      'webui'      │ 'next'  │  290  │
│    8    │     'desktop'     │  '5.2'  │  170  │
│    9    │     'desktop'     │  '5.3'  │  170  │
│   10    │     'desktop'     │ 'next'  │  172  │
│   11    │     'ios-app'     │ '12.2'  │  152  │
│   12    │     'ios-app'     │ '12.3'  │  150  │
│   13    │     'ios-app'     │ 'next'  │  150  │
│   14    │     'android'     │  '4.3'  │  111  │
│   15    │     'android'     │  '4.4'  │  111  │
│   16    │     'android'     │ 'next'  │  111  │
│   17    │ 'branded_clients' │ 'next'  │  224  │
│   20    │                   │         │ 6060  │
└─────────┴───────────────────┴─────────┴───────┘
```

## Setup

1. Save the extension to a location where you store your antora extensions like `./ext-antora/`.
2. Add the extension to your playbook (site.yml):
   ```yml
   antora:
     extensions:
     - ./ext-antora/comp-version.js
   ```
3. Comment the extension if not used.

## Check the Result

To double check the successful integration, run a build and watch the log printed.
