# Include Content via URL

Allow including external content sourced from an URL via the `include::` macro.

This extension is different compared to the [Antora Collector](https://gitlab.com/antora/antora-collector). Antora Collector gathers defined content into a family directory where it can be referenced as usual. It also offers offline capabilities.

The `Include Content via URL` extension requires content referenced via an include macro to be available during the build process. It always downloads during the build process that content from the source referenced by the URL and makes it part of the build process. The big bonus is, that you can define the URL dynamically via attributes like when using versioned content.

Such a mechanism is ideal when the sourcing repo contains many versioned auto-generated asciidoc files like product relevant tables and provides that content for a documentation which only needs to be included.

**Example:** Create a partial that only defines the include macro where the url for the source is assembled with attributes. This partial can now be used in pages that follow a particular recurring but distinctive content scheme. The attribute definition can be split e.g. in antora.yml for static and version relevant components and attributes that are defined in the calling page for page relevant components:

`include::{antora_yml_raw_url}{antora_yml_url_component}{page_final_path}adoc/{page_service_name}_table.adoc[]`

Here, the `raw_url` and `url_component` are defined in `antora.yml` as they are version dependent, while `final_path` and `service_name` are attributes that are defined in the page before including the partial.

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

`include::https://raw.githubusercontent.com/...{attribute}.../myfile.adoc`\
or\
`include::https://raw.githubusercontent.com/.../myfile.adoc[leveloffset=+1]`
