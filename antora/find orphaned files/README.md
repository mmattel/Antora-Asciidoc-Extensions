# Find Orphaned Files

This extension finds orphaned files for each module configured in an antora repo.

## Introduction

In a nutshell, the process of this extension is the following:

It first gathers all files available in the contentCatalog.
Then it looks for all references taken in each pages/partials and nav documents and creates a list of.
Finally it removes all occurrences of found references from the available files list.
The resulting list is now a set of files that are nowhere referenced - and are candidates for removal.

Files that are nowhere referenced may still be a viable part to the content of the repo, like for information purposes. These files can be excluded from the orphaned list so they will not appear anymore in the results.

## Limits

### Runtime Limits

* This extension can only run in repositories that contain content, which is defined at minimum by the precense of the `modules` directory, an `antora.yml` file and content files distributed in family directories. Building only repositories can not use this extension - this would not make sense anyways.

* To use this extension, a content build should run without errors before, though warnings are ok. This guarantees that files required for the build process are fully available.

### Identification Limits

There are a couple if things that cant be identified properly and are rejected therefore or being rejected by design:

1. References containing attributes like `{path}` can not be resolved
2. References containing an URL like `include::https://.../file.adoc[]` can not be resloved
3. References containing an `@` like `xref:version@component:module:family$path/file.adoc[]` can not be resloved
4. Referneces containing `video` and `audio` are currently not supported. They will get supported when Antora provides a family directory to store files locally.
5. Only macros of the following type are identifyable to query a file/path: `xref`, `include` and `image`. This is because these macros provide the use of [Resource ID Coordinates](https://docs.antora.org/antora/latest/page/resource-id-coordinates/).
6. Refernces that are commented or in a comment block cant be identified as comment, except they start with `//<macro>`. Note the missing blank between the comment identifyer and the macro. Commented refernces can cause orphaned files not being identifyable as they are substracted from the full file list.

Files that show up as orphaned but are valid, like when using attributes to reference them, can be excluded from being reported with one of the methods shown below.

Note that I have currently no experience with [Antora/Collector](https://gitlab.com/antora/antora-collector) and can not guarantee valid results if used.

## Resolvable References

All other references CAN be resolved which includes the following patterns. The macros shown are just examples for the pattern and are valid for all macros:

1. `xref:path/file.adoc[]`
2. `.xref:path/file.adoc[]`
3. `include::path/file.adoc[]`
4. `include::family$path/file.adoc[]`
5. `include::module:family$path/file.adoc[]`
6. `image:` and `image::` using full paths
7. `image:` and `image::` using relative paths like `./sub_path/image.png`

## Pitfalls

This is a list of possible pitfalls which will be extended when neccessary.

* If there are multiple sources defined in `site.yml`, define the filters in `excludecomponents` and `pathfilter` in a way where it only returns results for the current repository (component) to avoid false positives. Foreign repositores are not checked. 

* Missing relative directory:\
Reported: `modules/<module>/pages/path_part_1/path_part_2/_files.adoc`\
ls: `modules/<module>/pages/path_part_1/path_part_2/_files.adoc` --> ok\
grep -rn \_files.adoc --> `include::path_part_2/_files.adoc[leveloffset=+1]`\
Solution: `include::./path_part_2/_files.adoc[leveloffset=+1]` (`./` was missing to make the path relative)

## Configuration

This extension his highly configurable.

### Common Configuration Options

* `printavailable`\
This config enables to show which components will be processed.
* `stopafterfind`\
This config lets the extension stop after it has scanned for orphans. The build process is interrupted and will not complete. Use when the full repo build process would take long but finding is quick.

### Exclude Configuration Options

* `excludeextension`\
Files with file extensions defined in this array will not be considerated in the identification process. It is _highly_ recommended to use the dot notation like `'.png'`. Note that you can also exclude `'.adoc'` to onyl check for non asciidoc files...
* `pathfilter`\
Available files will be reduced by the match of any of the strings of this array in the file path. For example, if you add `attachments`, than any of the files will be removed that contain this string at any location in the path. While `attachments/` will remove results from the available list containing the matched directory only.
* `excludecomponents`\
Exclude components that you have defined additionally in your `site.yml` like to satisfy resolving links when building. These components will return 100% wrong results as the foreign content catalog is not considered. To identify possible components to exclude, enable `printavailable`.
* `falsepositives`\
Use this config to define a file which contents is taken to exclude from the found results. Empty lines a skipped. Lines starting with a `#` are considered as comment and are also skipped.\
Example:
  ```
  # <module name> <version> 

  modules/ROOT/images/my_path/myfile.png
  modules/ROOT/attachments/my_other_path/another_file.txt
  ```


## Setup

1. Save the extension to a location where you store your antora extensions like `./ext-antora/`.
2. Add the extension to your playbook (site.yml):
   ```yml
   antora:
     extensions:
    - require: ./ext-antora/find-orphaned-files.js
      #printavailable: true
      #excludeextension: ['.png', '.gif']
      #falsepositives: ./false-positives.txt
      #pathfilter: ['modules/my_module_2', 'modules/my_module_3']
      #excludecomponents: ['my_included_component']
      stopafterfind: true
      enabled: true
   ```
3. Set `enabled` to `false` to skip the extension if not used.

## Check the Result

To double check the successful integration, run a build and pipe the result into a file for ease of reviewing.
