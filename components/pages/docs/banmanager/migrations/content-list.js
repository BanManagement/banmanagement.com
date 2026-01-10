import { pages, formatPath } from 'data/navigation'

export const MigrationContentList = () => {
  // Filter pages that are in the migrations section and have a navTitle
  const migrationPages = pages.filter((page) =>
    page.__resourcePath &&
    page.__resourcePath.includes('banmanager/migrations/') &&
    page.navTitle &&
    !page.__resourcePath.endsWith('migrations/index.mdx')
  )

  return (
    <ul>
      {migrationPages.map((page) => (
        <li key={page.__resourcePath} className="pl-6">
          <a className="hover:text-gray-600" href={formatPath(page.__resourcePath)}>{page.navTitle}</a>
        </li>
      ))}
    </ul>
  )
}
