import { cacheLife } from "next/cache";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import NextLink from "next/link";

function makeAnchor(locale: string) {
  return function A({ href = "", children, ...props }: React.ComponentProps<"a">) {
    // Internal links in content are written locale-less ("/features") and prefixed here.
    if (href.startsWith("/")) {
      return (
        <NextLink href={`/${locale}${href === "/" ? "" : href}`} {...(props as object)}>
          {children}
        </NextLink>
      );
    }
    if (href.startsWith("#")) return <a href={href} {...props}>{children}</a>;
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  };
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose rounded-2xl border border-calm/40 bg-calm-soft px-5 py-4 text-[0.98rem] [&>p+p]:mt-2">
      {children}
    </div>
  );
}

function Table(props: React.ComponentProps<"table">) {
  return <table {...props} />;
}


/** Renders MDX from /content. Cached: the same source always produces the same tree. */
export async function Mdx({ source, locale }: { source: string; locale: string }) {
  "use cache";
  cacheLife("max");
  return (
    <MDXRemote
      source={source}
      components={{ a: makeAnchor(locale), Callout, table: Table }}
      options={{
        mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] },
        blockJS: true,
      }}
    />
  );
}
