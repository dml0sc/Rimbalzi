import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import { SimpleSlug } from "./quartz/util/path"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  // Personalizzazione Leandra: il footer segue l'elzeviro nel flusso del testo
  // (afterBody), non resta ancorato in fondo alla finestra.
  afterBody: [
    Component.Footer({
      links: {},
    }),
  ],
  footer: Component.Spacer(),
}

const left = [
  Component.PageTitle(),
  Component.MobileOnly(Component.Spacer()),
  Component.Flex({
    components: [
      {
        Component: Component.Search(),
        grow: true,
      },
      { Component: Component.Darkmode() },
    ],
  }),
  Component.DesktopOnly(
    Component.RecentNotes({
      // Personalizzazione Rimbalzi: non un blog — niente "recenti".
      // Indice completo degli elzeviri, in ordine alfabetico.
      title: "Elzeviri",
      limit: 500,
      showTags: false,
      showDate: false,
      linkToMore: false,
      // la homepage non elenca sé stessa
      filter: (f) => f.slug !== "index",
      sort: (a, b) =>
        (a.frontmatter?.title ?? "").localeCompare(b.frontmatter?.title ?? "", "it"),
    }),
  ),
]

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs({ rootName: "Rimbalzi" }), Component.ContentMeta(), Component.TagList()],
  left,
  right: [
    Component.Graph({
      localGraph: {
        showTags: false,
      },
      globalGraph: {
        showTags: false,
      },
    }),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs({ rootName: "Rimbalzi" }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    // i sentieri: la tassonomia curata, all'imbocco della nota
    Component.TagList(),
  ],
  left,
  right: [],
}
