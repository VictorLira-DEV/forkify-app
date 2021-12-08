class SearchView {
    #parentElement = document.querySelector<HTMLFormElement>('.search')!;

    getQuery() {
        return this.#parentElement.querySelector<HTMLInputElement>(
            '.search__field'
        )!.value;
    }
}

export default new SearchView();
