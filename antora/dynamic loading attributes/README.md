# Load Global Site Attributes

This extension loads attributes from a file sourced either via filesystem or URL into the playbook.

The primary usecase is, when you have a multi-repo docs environment, though it is not limited to.

Usually you will use a URL like `https://raw.githubusercontent.com/.../global-attributes.yml` to
source the file, but you also can use a local file for testing like `./global-attributes.yml`.

Naming:\
local ... referencing an individual content source, like a repo with an actual version checked out\
global ... referencing the master repository for building the full docs env.

**IMPORTANT**
* If you have local attributes in your playbook (site.yml) and there are global ones with the same key,
the local ones take precedence. This allows configuring the loading repo for individual test builds
with adapted keys. This can be necessary like when you include and cross reference multiple versions globally but
you do not include the versions in the local build.
* The attribute file to include must only contain the attributes and comments but no other yaml structures. Leading blanks before keys do no harm.

## Setup

1. Save the extension to a location where you store your antora extensions like `./ext-antora/`.
2. Add the extension to your playbook (site.yml), use any url/name that fits your needs:
   ```yml
   antora:
     extensions:
     - require: ./ext-antora/load-global-site-attributes.js
       attributefile: https://raw.githubusercontent.com/.../global-attributes.yml
       #attributefile: ./global-attributes.yml
       enabled: true
   ```
3. Prepare the global attribute file you want to include and make it available.\
Most easiest, _move_ all attributes from the global existing playbook (site.yml) into an own file. The playbook should the only contain the attributes definition:
   ```
   asciidoc:
     attributes:
     # branch-specific-variables: 'see antora.yml'
     # global attributes loaded via antora extension
     # any attributes added here will overwrite those loaded from the global file if extists
     extensions:
     ...
   ```
4. Add `"js-yaml": "^4.1.0",` --> `dependencies` --> `package.json`\
Run `npm install` to update your dependencies.

## Check the Result

To double check the successful integration, use and enable the `attributes-used-in-site-yml` extension. Run a build and pipe the result into a file for ease of reviewing. The loaded attributes are now part of the playbook and of each component built.
