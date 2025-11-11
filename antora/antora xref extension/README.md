# Antora Xref Extension

The [antora-xref-extension](https://github.com/spring-io/antora-xref-extension) augments Antora’s support for xref macros with the following features:

* Validate that the target file contains an anchor that matches the fragment.

* Use default link text from the title or reftext of the target.

* Stub links that don’t yet exist

* Produce warnings if link text is unnecessary

Note that this extension will slightly increase build times since .adoc files are parsed twice. 

Note that this extension has its own repository and is referenced here only. For more details including a detailed description see the [Antora Xref Extension](https://github.com/spring-io/antora-xref-extension) repository.
