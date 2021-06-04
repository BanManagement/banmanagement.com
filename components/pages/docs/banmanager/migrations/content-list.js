import { frontMatter as migrationPages } from '../../../../../pages/docs/banmanager/migrations/*.mdx'
import { formatPath } from 'data/navigation'

export const MigrationContentList = () => (
  <ul>
    {migrationPages.filter(({ navTitle }) => !!navTitle).map((page) => (
      <li key={page.__resourcePath} className="pl-6">
        <a className="hover:text-gray-600" href={formatPath(page.__resourcePath)}>{page.navTitle}</a>
      </li>
    ))}
  </ul>
)
