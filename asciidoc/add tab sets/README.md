# Add Tab Sets

Extends the AsciiDoc syntax to support a tabset element.\
The tabset is created from a dlist that is enclosed in an example block marked with the tabs style.

Derived from [Asciidoctor Tabs](https://github.com/asciidoctor/asciidoctor-tabs).

Usage:
```asciidoc 
[tabs]
====
Tab A::
+
--
Contents of tab A.
--
Tab B::
+
--
Contents of tab B.
--
====
```

## Setup

1. Save the extension to a location where you store your asciidoc extensions like `./ext-asciidoc/`.
2. Add the extension to your playbook (site.yml):
   ```yml
   asciidoc:
     extensions:
     - ./ext-asciidoc/tabs.js
   ```
3. Integrate tabs to your UI:\
File: `tabs.css` --> `src/css/`\
File: `07-tabs.js` --> `src/js/` (name it as required)\
Include: `@import url("tabs.css");` --> `src/css/site.css`
