/** A Facebook Page with its profile picture, linking to the Page. */
export function FbPage({ page, size = 28, nameHidden }: { page: { id: string; name: string; picture: string | null }; size?: number; nameHidden?: boolean }) {
  return (
    <a className="fbpage" href={`https://www.facebook.com/${page.id}`} target="_blank" rel="noreferrer" title={`Facebook Page: ${page.name}`}>
      {page.picture ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="avatar" src={page.picture} alt="" style={{ width: size, height: size }} />
      ) : (
        <span className="avatar" style={{ width: size, height: size }} />
      )}
      {!nameHidden && <span>{page.name}</span>}
    </a>
  );
}
