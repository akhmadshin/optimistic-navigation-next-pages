import { Link } from '@/components/Link';
import { Container } from '@/components/Container';

export function Header() {
  return (
    <header
    >
      <Container className="mb-16 main-header">
        <div className="relative flex gap-4 pt-6">
          <div className="flex flex-1 gap-16">
            <Link
              href="/"
              aria-label="Home"
            >
              <span className="font-bold">Home</span>
            </Link>
            <Link
              href="/blog/lorem-ipsum/"
              aria-label="Lorem ipsum"
            >
              <span className="font-bold">Lorem ipsum</span>
            </Link>
          </div>
        </div>
      </Container>
    </header>
  )
}