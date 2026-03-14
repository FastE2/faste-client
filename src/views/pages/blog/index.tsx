'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';


// Mock blog post data
const BLOG_POSTS = [
  {
    id: 1,
    slug: 'getting-started-with-nextjs',
    title: 'Getting Started with Next.js 15',
    excerpt:
      'Learn how to build modern web applications with Next.js 15 and the App Router. Discover the latest features and best practices.',
    date: '2025-01-15',
    author: 'Sarah Chen',
    tag: 'Next.js',
    image: '/nextjs-dashboard.jpg',
  },
  {
    id: 2,
    slug: 'tailwind-css-tips',
    title: 'Tailwind CSS Tips & Tricks',
    excerpt:
      'Master Tailwind CSS with these advanced techniques. Learn how to create responsive designs efficiently and maintain clean code.',
    date: '2025-01-12',
    author: 'Alex Rodriguez',
    tag: 'CSS',
    image: '/tailwind-design-system.jpg',
  },
  {
    id: 3,
    slug: 'react-hooks-deep-dive',
    title: 'React Hooks Deep Dive',
    excerpt:
      'Understand React Hooks from the ground up. Explore useState, useEffect, useContext, and custom hooks with practical examples.',
    date: '2025-01-10',
    author: 'Jordan Smith',
    tag: 'React',
    image: '/react-hooks-code.jpg',
  },
  {
    id: 4,
    slug: 'typescript-best-practices',
    title: 'TypeScript Best Practices',
    excerpt:
      'Write type-safe code with TypeScript. Learn about generics, interfaces, and advanced types to improve your development workflow.',
    date: '2025-01-08',
    author: 'Emma Wilson',
    tag: 'TypeScript',
    image: '/typescript-code-editor.jpg',
  },
  {
    id: 5,
    slug: 'web-performance-optimization',
    title: 'Web Performance Optimization',
    excerpt:
      'Optimize your web applications for speed. Learn about lazy loading, code splitting, and performance monitoring techniques.',
    date: '2025-01-05',
    author: 'Michael Brown',
    tag: 'Performance',
    image: '/performance-metrics-dashboard.jpg',
  },
  {
    id: 6,
    slug: 'accessible-web-design',
    title: 'Building Accessible Web Experiences',
    excerpt:
      'Create inclusive web applications that work for everyone. Learn WCAG guidelines, ARIA attributes, and accessibility testing.',
    date: '2025-01-02',
    author: 'Lisa Anderson',
    tag: 'Accessibility',
    image: '/accessible-ui-components.jpg',
  },
];

// Extract unique tags from blog posts
const UNIQUE_TAGS = Array.from(
  new Set(BLOG_POSTS.map((post) => post.tag)),
).sort();

export default function BlogPage() {
  const { t, i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Filter posts based on search query and selected tag
  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTag = selectedTag === null || post.tag === selectedTag;

      return matchesSearch && matchesTag;
    });
  }, [searchQuery, selectedTag]);

  // Pagination logic
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(
    startIndex,
    startIndex + postsPerPage,
  );

  // Reset to page 1 when filters change
  const handleFilterChange = (tag: string | null) => {
    setSelectedTag(tag);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {t('blog.title')}
            </h1>
            <p className="mt-4 text-lg opacity-90">
              {t('blog.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Search and Filter Controls */}
          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Search Input */}
            <div className="relative flex-1 sm:max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t('blog.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10"
                aria-label={t('blog.searchPlaceholder')}
              />
            </div>

            {/* Tag Filter Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 bg-transparent">
                  {selectedTag ? `${t('blog.tagPrefix')}${selectedTag}` : t('blog.allTags')}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => handleFilterChange(null)}>
                  {t('blog.allTags')}
                </DropdownMenuItem>
                {UNIQUE_TAGS.map((tag) => (
                  <DropdownMenuItem
                    key={tag}
                    onClick={() => handleFilterChange(tag)}
                  >
                    {tag}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Blog Posts Grid */}
          {paginatedPosts.length > 0 ? (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {paginatedPosts.map((post) => (
                  <article key={post.id}>
                    <Link href={`/blog/${post.slug}`}>
                      <Card className="h-full overflow-hidden transition-all hover:shadow-lg hover:scale-105">
                        {/* Thumbnail Image */}
                        <div className="relative h-48 w-full overflow-hidden bg-muted">
                          <Image
                            src={post.image || '/placeholder.svg'}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-300 hover:scale-110"
                          />
                        </div>

                        <CardHeader className="pb-3">
                          {/* Category Badge */}
                          <Badge variant="secondary" className="w-fit">
                            {post.tag}
                          </Badge>

                          {/* Title */}
                          <h2 className="mt-3 text-xl font-semibold leading-tight text-card-foreground line-clamp-2">
                            {post.title}
                          </h2>
                        </CardHeader>

                        <CardContent className="flex flex-col gap-4">
                          {/* Excerpt */}
                          <p className="text-sm text-muted-foreground line-clamp-3">
                            {post.excerpt}
                          </p>

                          {/* Meta Information */}
                          <div className="flex flex-col gap-2 border-t border-border pt-4 text-xs text-muted-foreground">
                            <div className="flex items-center justify-between">
                              <span>{post.author}</span>
                              <time dateTime={post.date}>
                                {new Date(post.date).toLocaleDateString(
                                  'en-US',
                                  {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                  },
                                )}
                              </time>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </article>
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="mt-12 flex items-center justify-center gap-2">
                    <Button
                    variant="outline"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    {t('blog.previous')}
                  </Button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          className="h-9 w-9 p-0"
                        >
                          {page}
                        </Button>
                      ),
                    )}
                  </div>

                  <Button
                    variant="outline"
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                  >
                    {t('blog.next')}
                  </Button>
                </div>
              )}
            </>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-lg font-medium text-foreground">
                {t('blog.noPosts')}
              </p>
              <p className="mt-2 text-muted-foreground">
                {t('blog.noPostsDesc')}
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  handleFilterChange(null);
                }}
                className="mt-4"
              >
                {t('blog.clearFilters')}
              </Button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
