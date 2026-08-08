/**
 * Renders one or more JSON-LD graphs. Kept in a component so pages declare
 * what they are rather than repeating a script tag and a stringify call.
 *
 * The payload is our own data, never user input, so serialising it into the
 * tag is safe — but `<` is still escaped, since an unescaped `</script>`
 * inside a string would close the tag early.
 */
export function JsonLd({ data }: { data: object | readonly object[] }) {
  const graphs = Array.isArray(data) ? data : [data];

  return (
    <>
      {graphs.map((graph, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
