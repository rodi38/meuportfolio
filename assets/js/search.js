(function () {
  var overlay = document.getElementById("search-overlay");
  var input = document.getElementById("search-input");
  var loading = document.getElementById("search-loading");
  var results = document.getElementById("search-results");
  var indexUrl = document.body.getAttribute("data-search-index");
  var fuse = null;
  var fuseReady = null;
  var debounceTimer = null;
  var DEBOUNCE_MS = 450;

  var TYPE_ORDER = ["CV", "Projetos", "Blog", "Post"];
  var TYPE_LABELS = {
    CV: "Currículo",
    Projetos: "Projetos",
    Blog: "Blog",
    Post: "Posts",
  };

  function loadIndex() {
    if (!fuseReady) {
      fuseReady = fetch(indexUrl)
        .then(function (res) { return res.json(); })
        .then(function (data) {
          fuse = new Fuse(data, {
            keys: ["title", "content", "categories", "tags"],
            threshold: 0.35,
          });
        });
    }
    return fuseReady;
  }

  function groupByType(matches) {
    var groups = {};
    matches.forEach(function (match) {
      var type = match.item.type || "Post";
      if (!groups[type]) groups[type] = [];
      groups[type].push(match);
    });
    return groups;
  }

  function renderResults(matches) {
    results.innerHTML = "";

    if (matches.length === 0) {
      var empty = document.createElement("p");
      empty.className = "search-empty";
      empty.textContent = "Nenhum resultado encontrado";
      results.appendChild(empty);
      return;
    }

    var groups = groupByType(matches);
    var allTypes = TYPE_ORDER.concat(
      Object.keys(groups).filter(function (type) {
        return TYPE_ORDER.indexOf(type) === -1;
      })
    );

    allTypes.forEach(function (type) {
      var items = groups[type];
      if (!items || items.length === 0) return;

      var section = document.createElement("section");
      section.className = "search-group";

      var title = document.createElement("h3");
      title.className = "search-group-title";
      title.textContent = TYPE_LABELS[type] || type;
      section.appendChild(title);

      var list = document.createElement("ul");
      items.forEach(function (result) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.href = result.item.url;
        a.textContent = result.item.title;
        li.appendChild(a);
        list.appendChild(li);
      });
      section.appendChild(list);

      results.appendChild(section);
    });
  }

  function performSearch(query) {
    loadIndex().then(function () {
      if (input.value.trim() !== query) return;
      var matches = fuse.search(query, { limit: 20 });
      loading.hidden = true;
      renderResults(matches);
    });
  }

  function scheduleSearch(query) {
    clearTimeout(debounceTimer);
    results.innerHTML = "";

    if (query.length < 2) {
      loading.hidden = true;
      return;
    }

    loading.hidden = false;
    debounceTimer = setTimeout(function () {
      performSearch(query);
    }, DEBOUNCE_MS);
  }

  window.openSearch = function () {
    overlay.hidden = false;
    loadIndex();
    input.focus();
  };

  window.closeSearch = function () {
    overlay.hidden = true;
    input.value = "";
    results.innerHTML = "";
    loading.hidden = true;
    clearTimeout(debounceTimer);
  };

  window.searchTag = function (tag) {
    openSearch();
    input.value = tag;
    scheduleSearch(tag);
  };

  input.addEventListener("input", function () {
    scheduleSearch(input.value.trim());
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeSearch();
  });
})();
