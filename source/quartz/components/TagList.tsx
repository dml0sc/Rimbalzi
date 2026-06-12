import { FullSlug, resolveRelative } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

// Personalizzazione Leandra: i "sentieri" sono una riga discreta sotto la data,
// nello stesso grigio dei metadati — niente chip, niente cancelletto.
const TagList: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const tags = fileData.frontmatter?.tags
  if (tags && tags.length > 0) {
    return (
      <p class={classNames(displayClass, "sentieri")}>
        <span class="sentieri-label">sentieri: </span>
        {tags.map((tag, i) => {
          const linkDest = resolveRelative(fileData.slug!, `tags/${tag}` as FullSlug)
          return (
            <span>
              <a href={linkDest} class="internal tag-link">
                {tag}
              </a>
              {i < tags.length - 1 ? ", " : ""}
            </span>
          )
        })}
      </p>
    )
  } else {
    return null
  }
}

TagList.css = `
.sentieri {
  margin: -0.75rem 0 1rem 0;
  font-family: var(--headerFont);
  font-size: 0.85rem;
}

/* stesso trattamento della data (.content-meta: darkgray a opacità 0.5) */
.sentieri .sentieri-label {
  color: var(--darkgray);
  opacity: 0.5;
}

.sentieri a.internal.tag-link {
  background-color: transparent;
  border-radius: 0;
  padding: 0;
  margin: 0;
  color: var(--secondary);
  font-weight: 400;
}

.sentieri a.internal.tag-link::before {
  content: "";
}

.sentieri a.internal.tag-link:hover {
  color: var(--tertiary);
}

/* Personalizzazione Leandra: nelle pagine-elenco (sentieri, cartelle) niente
   chip per riga — l'elenco resta data + titolo, come la home. */
.section > .tags,
.page-listing ul.tags {
  display: none;
}
`

export default (() => TagList) satisfies QuartzComponentConstructor
