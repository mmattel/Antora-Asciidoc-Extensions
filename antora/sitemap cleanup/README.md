# Sitemap Cleanup

This extension cleans up sitemap files. It removes any component versions that are not defined in the playbook extension configuration.
This is relevant for SEO purposes - indexing and search - as it avoids directing users to an inaccessible version.

**Important:**\
The extension accesses files written by Antora to the output directory after the build has finished. Additional settings from the output directory such as creating compressed files are not considered and files not altered.

## Rationale

The playbook has single and multi-version components and a latest version setting such as the following, `antory.yml` would contain for the name of the master branch `next` and prerelease set:

```yaml
content:
  sources:
  - url: ../docs-abc
    branches:
    - master
  - url: ../docs-def
    branches:
    - master
    - '8.0'
    - '7.3'

urls:
  redirect_facility: static
  latest_version_segment: latest
  latest_version_segment_strategy: replace
```

This would lead to URL's in various sitemap files with segments including content that points to `next`, `latest`, `8.0` and `7.3`.
Technically, only `latest` is necessary, because latest points in docs-def to 8.0, and to next in docs-abc. The latest results should always link correctly, and so searching via Google or other search engines should only return these.

The extension removes any `<url> ... </url>` block that does not meet the criterias for segments configured in the playbook. As an example, if you allow segments `next` and `latest` preferrably keep `latest` if both are present, the extension will remove all other entries for an optimized search result.

```xml
<url>
<loc>http://localhost:8080/def/latest/file.html</loc>
<lastmod>2026-04-21T11:29:53.799Z</lastmod>
</url>
```

## Configuration

This extension his configurable.

### Common Configuration Options

* `validsegments`\
An array of segments to keep in sitemap files such as ['next', 'latest', ...]
* `preferredsegment`\
Optional, a single segment (string, no array) to keep if multiple segments are present. If not used, ALL elements of `validsegments` are taken.
* `printsitemapfound`\
Print the sitemap component name when processing.
* `printcontent`\
Print the contents of the changed sitemap file. This is intended for testing purposes to compare to the original.

## Setup

1. Save the extension to a location where you store your antora extensions like `./ext-antora/`.
2. Add the extension to your playbook (site.yml):
   ```yml
   antora:
     extensions:
    - require: ./ext-antora/sitemap-cleanup.js
      validsegments: ['next', 'latest']
      preferredsegment: latest
      printsitemapfound: true
      printcontent: false
      enabled: true
   ```
3. Set `enabled` to `false` to skip the extension if not used. Sitemapdata will be kept as Antora creates it.8

## Check the Result

To double check the successful integration, run a build and check the outcome of the sitemap files.

## Example Output

This is an example output from a rendering of the ownCloud documentation gathered from the CI. The first part is the output from an other extension named `Print Component Version File Table`, but it shows how things are related.

```
Processing the following components, versions and number of files
┌─────────┬───────────┬─────────┬───────┐
│ (index) │ Name      │ Version │ Files │
├─────────┼───────────┼─────────┼───────┤
│ 0       │ 'ROOT'    │ '~'     │ 15    │
│ 1       │ 'server'  │ '10.15' │ 989   │
│ 2       │ 'server'  │ '10.16' │ 989   │
│ 3       │ 'server'  │ 'next'  │ 989   │
│ 4       │ 'ocis'    │ '7.3'   │ 174   │
│ 5       │ 'ocis'    │ '8.0'   │ 178   │
│ 6       │ 'ocis'    │ 'next'  │ 178   │
│ 7       │ 'webui'   │ 'next'  │ 35    │
│ 8       │ 'desktop' │ '5.3'   │ 102   │
│ 9       │ 'desktop' │ '6.0'   │ 136   │
│ 10      │ 'desktop' │ 'next'  │ 129   │
│ 11      │ 'ios-app' │ '12.5'  │ 86    │
│ 12      │ 'ios-app' │ '12.6'  │ 86    │
│ 13      │ 'ios-app' │ 'next'  │ 86    │
│ 14      │ 'android' │ '4.6'   │ 47    │
│ 15      │ 'android' │ '4.7'   │ 47    │
│ 16      │ 'android' │ 'next'  │ 47    │
│ 17      │           │         │ 4313  │
└─────────┴───────────┴─────────┴───────┘

...

[11:41:22.334] WARN (sitemap-cleanup): Processing component: android
[11:41:22.335] WARN (sitemap-cleanup): New sitemap data successfully written back
[11:41:22.336] WARN (sitemap-cleanup): Processing component: ocis
[11:41:22.338] WARN (sitemap-cleanup): New sitemap data successfully written back
[11:41:22.338] WARN (sitemap-cleanup): Processing component: desktop
[11:41:22.339] WARN (sitemap-cleanup): New sitemap data successfully written back
[11:41:22.339] WARN (sitemap-cleanup): Processing component: ios-app
[11:41:22.340] WARN (sitemap-cleanup): New sitemap data successfully written back
[11:41:22.342] WARN (sitemap-cleanup): Processing component: ROOT
[11:41:22.343] WARN (sitemap-cleanup): The content of the sitemap was not changed
[11:41:22.343] WARN (sitemap-cleanup): Processing component: webui
[11:41:22.344] WARN (sitemap-cleanup): New sitemap data successfully written back
[11:41:22.344] WARN (sitemap-cleanup): Processing component: server
[11:41:22.363] WARN (sitemap-cleanup): New sitemap data successfully written back
```
