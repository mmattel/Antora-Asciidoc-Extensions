# Print Attributes Used in Playbook

This extension prints the attributes defined the playbook (site.yml) used in each component.

## Setup

1. Save the extension to a location where you store your antora extensions like `./ext-antora/`.
2. Add the extension to your playbook (site.yml):
   ```yml
   antora:
     extensions:
     - ./ext-antora/attributes-used-in-site-yml.js
   ```
3. Comment the extension if not used.

## Check the Result

To double check the successful integration, run a build and pipe the result into a file for ease of reviewing.
