# Include Content via URL in Antora

Allow including external content sourced from an URL via the `include::` directive.

This way is different compared to the [Antora Collector](https://gitlab.com/antora/antora-collector).

Note to check, if needed, a leveloffset like `[leveloffset=+1]`.

## Setup

1. Save the extension to a location where you store your asciidoc extensions like `./ext-asciidoc/`.
2. Add the extension to your playbook (site.yml):
   ```yml
   asciidoc:
     extensions:
     - ./ext-asciidoc/remote-include-processor.js
   ```
## Usage

The following are some examples to get the idea of using this extension:

`include::https://raw.githubusercontent.com/.../myfile.adoc`\
or\
`include::https://raw.githubusercontent.com/.../myfile.adoc[leveloffset=+1]`
