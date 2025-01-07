# Create an Elastic Search Index

This extension creates an Elastic Search index and makes it usable for searching.

Note, the ES server setup is NOT described here!

For details see\
doc.owncloud.com,\
https://github.com/owncloud/docs-ui and\
https://github.com/owncloud/docs

Note that this implementation works, but can be improved (if time would permit...)

**IMPORTANT**
This extension requires some envvars to be present and configured. If not configured, it will report that no search index can be created.
* `UPDATE_SEARCH_INDEX`
* `ELASTICSEARCH_NODE`
* `ELASTICSEARCH_INDEX`
* `ELASTICSEARCH_WRITE_AUTH`

## Setup

1. Save the extension to a location where you store your antora extensions like `./ext-antora/`.
2. Add the extension to your playbook (site.yml), use any url/name that fits your needs:
   ```yml
   antora:
     extensions:
     ./ext-antora/generate-index.js
   ```
3. Add `"@elastic/elasticsearch": "^7.17.14"` --> `dependencies` --> `package.json`\
Run `npm install` to update your dependencies.\
Note: use the elastic search version that fits your needs.

In the UI

4. Add `"elasticsearch-browser": "^16.7.1",` --> `dependencies` --> `package.json`\
Run `npm install` to update your dependencies.\
Note: use the elastic search version that fits your needs.
5. Add to `./src/partials/footer-scripts.hbs`:
   ```
   {{#if env.ELASTICSEARCH_NODE}}
     <script src="{{uiRootPath}}/js/vendor/elastic.js"></script>
   {{/if}}
   ```

6. Add to `src/partials/header-content.hbs`:
   ```
    <div id="topbar-nav" class="navbar-menu">
      <div class="navbar-end">
        {{> header-nav}}

        {{#if env.ELASTICSEARCH_NODE}}
          <div class="navbar-item search">
            <span class="control">
              <input
                id="search"
                class="search-input"
                type="text"
                placeholder="Search"
                data-host="{{env.ELASTICSEARCH_NODE}}"
                data-index="{{env.ELASTICSEARCH_INDEX}}"
                data-auth="{{env.ELASTICSEARCH_READ_AUTH}}">
              <div class="animation"></div>
            </span>
            <div class="results"></div>
          </div>
        {{/if}}

      </div>
    </div>
   ```

6. Add to `src/css/header.css`:
   ```
   .search .results li a {
     padding: 0.5em 1em;
     display: block;
     color: initial;
   }
   ```

7. Add to `src/css/header.css` in the section for small widths (width <= 799px):
   ```
   .search {
     display: none;
   }
   ```

## Using Search

For details see: [Using Search in Production or Development](https://github.com/owncloud/docs/blob/master/docs/build-the-docs.md#using-search-in-production-or-development)
