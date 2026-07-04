export class OpenLibraryService {
  async search(q: string) {
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(q)}&limit=10`,
    );

    if (!response.ok) {
      throw new Error("Erro ao buscar livros");
    }

    const dados = await response.json();

    return dados.docs.map((livro: any) => {
      const imagem = livro.cover_i
        ? `https://covers.openlibrary.org/b/id/${livro.cover_i}-M.jpg`
        : "";

      return {
        titulo: livro.title ?? "",
        autor: livro.author_name?.[0] ?? "",
        descricao: livro.first_sentence?.[0] ?? "",
        imagem,
      };
    });
  }
}

