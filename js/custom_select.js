class CustomSelect {
  constructor(container, options = {}) {
    this.container =
      typeof container === "string"
        ? document.querySelector(container)
        : container;
    this.options = {
      label: options.label || "Selecione",
      items: options.items || [],
      searchable: options.searchable !== undefined ? options.searchable : true,
      placeholder: options.placeholder || "Buscar...",
      defaultValue: options.defaultValue || null,
      onChange: options.onChange || (() => {}),
    };

    this.selectedValue = this.options.defaultValue;
    this.isOpen = false;

    this.init();
  }

  init() {
    this.render();
    this.bindEvents();
    this.sortItems();
  }

  sortItems() {
    this.options.items.sort((a, b) => a.label.localeCompare(b.label, "pt-BR"));
  }

  render() {
    const selectedItem = this.options.items.find(
      (item) => item.value === this.selectedValue
    );
    const displayText = selectedItem ? selectedItem.label : this.options.label;

    this.container.innerHTML = `
                    <div class="custom-select">
                        <div class="select-header">
                            <div>
                                ${
                                  !selectedItem
                                    ? `<div class="select-label">${this.options.label}</div>`
                                    : ""
                                }
                                ${
                                  selectedItem
                                    ? `<div class="select-value">${displayText}</div>`
                                    : ""
                                }
                            </div>
                            <svg class="select-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </div>
                        <div class="select-dropdown">
                            ${
                              this.options.searchable
                                ? `
                                <div class="select-search">
                                    <input type="text" placeholder="${this.options.placeholder}">
                                </div>
                            `
                                : ""
                            }
                            <div class="select-options">
                                ${this.options.items
                                  .map(
                                    (item) => `
                                    <div class="select-option ${
                                      item.value === this.selectedValue
                                        ? "selected"
                                        : ""
                                    }" 
                                         data-value="${item.value}">
                                        ${item.label}
                                    </div>
                                `
                                  )
                                  .join("")}
                            </div>
                        </div>
                    </div>
                `;

    this.header = this.container.querySelector(".select-header");
    this.dropdown = this.container.querySelector(".select-dropdown");
    this.chevron = this.container.querySelector(".select-chevron");
    this.optionElements = this.container.querySelectorAll(".select-option");
    this.searchInput = this.container.querySelector(".select-search input");
  }

  bindEvents() {
    // Toggle dropdown
    this.header.addEventListener("click", (e) => {
      e.stopPropagation();
      this.toggle();
    });

    // Select option
    this.optionElements.forEach((option) => {
      option.addEventListener("click", (e) => {
        e.stopPropagation();
        const value = option.dataset.value;
        this.select(value);
      });
    });

    // Search functionality
    if (this.searchInput) {
      this.searchInput.addEventListener("input", (e) => {
        this.filter(e.target.value);
      });

      this.searchInput.addEventListener("click", (e) => {
        e.stopPropagation();
      });
    }

    // Close on outside click
    document.addEventListener("click", (e) => {
      if (!this.container.contains(e.target)) {
        this.close();
      }
    });

    // Close on escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen) {
        this.close();
      }
    });
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this.isOpen = true;
    this.dropdown.classList.add("open");
    this.header.classList.add("active");
    this.chevron.classList.add("rotated");

    if (this.searchInput) {
      setTimeout(() => this.searchInput.focus(), 100);
    }
  }

  close() {
    this.isOpen = false;
    this.dropdown.classList.remove("open");
    this.header.classList.remove("active");
    this.chevron.classList.remove("rotated");

    if (this.searchInput) {
      this.searchInput.value = "";
      this.filter("");
    }
  }

  select(value) {
    this.selectedValue = value;
    const selectedItem = this.options.items.find(
      (item) => item.value === value
    );

    // Update UI
    this.optionElements.forEach((opt) => {
      opt.classList.toggle("selected", opt.dataset.value === value);
    });

    // Update header
    const headerContent = this.header.querySelector("div");
    if (selectedItem) {
      headerContent.innerHTML = `<div class="select-value">${selectedItem.label}</div>`;
    }

    this.close();
    this.options.onChange(value, selectedItem);
  }

  filter(searchTerm) {
    const term = searchTerm.toLowerCase().trim();
    let visibleCount = 0;

    this.optionElements.forEach((option) => {
      const text = option.textContent.toLowerCase();
      const matches = text.includes(term);
      option.classList.toggle("hidden", !matches);
      if (matches) visibleCount++;
    });

    // Show/hide no results message
    let noResults = this.container.querySelector(".no-results");
    if (visibleCount === 0 && !noResults) {
      noResults = document.createElement("div");
      noResults.className = "no-results";
      noResults.textContent = "Nenhum resultado encontrado";
      this.container.querySelector(".select-options").appendChild(noResults);
    } else if (visibleCount > 0 && noResults) {
      noResults.remove();
    }
  }

  getValue() {
    return this.selectedValue;
  }

  setValue(value) {
    this.select(value);
  }
}
