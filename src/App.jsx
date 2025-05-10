import { Routes, Route, Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/content/articles.json")
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => setArticles(data.articles))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return <div className="max-w-2xl mx-auto py-12 px-4">Loading...</div>;
  if (error)
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 text-red-500">
        Failed to load articles.
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-serif mb-8 text-center">Brundage Family</h1>
      <div className="grid gap-8">
        {articles.map((article) => (
          <Link
            to={`/article/${article.slug}`}
            key={article.slug}
            className="block border-b pb-8 last:border-b-0 hover:bg-gray-50 transition"
          >
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <img
                src={article.image}
                alt={article.title}
                className="w-full md:w-48 h-32 object-cover rounded shadow-sm grayscale"
                loading="lazy"
              />
              <div>
                <h2 className="text-2xl font-serif mb-2">{article.title}</h2>
                <p className="text-gray-600 mb-1">{article.description}</p>
                <span className="text-xs text-gray-400">{article.date}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function Article() {
  const { slug } = useParams();
  const [content, setContent] = useState("");
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch("/content/articles.json")
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => {
        const found = data.articles.find((a) => a.slug === slug);
        if (!found) {
          setNotFound(true);
          return;
        }
        fetch(found.contentPath)
          .then((res) => {
            if (!res.ok) throw new Error("Not found");
            return res.text();
          })
          .then(setContent)
          .catch(() => setNotFound(true));
      })
      .catch(() => setNotFound(true));
  }, [slug]);

  if (notFound) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 text-center">
        <h1 className="text-3xl font-serif mb-4">404 - Article Not Found</h1>
        <Link to="/" className="text-blue-600 underline">
          Back to Home
        </Link>
      </div>
    );
  }
  if (!content)
    return <div className="max-w-2xl mx-auto py-12 px-4">Loading...</div>;

  // Custom renderer for section dividers and captions
  const components = {
    p({ children }) {
      // If the paragraph is just a section divider
      if (
        typeof children[0] === "string" &&
        children[0].includes("---section---")
      ) {
        return <hr className="my-8 border-gray-300" />;
      }
      // If the paragraph is just an image caption (italic)
      if (
        typeof children[0] === "string" &&
        children[0].startsWith("_") &&
        children[0].endsWith("_")
      ) {
        return (
          <div className="text-center text-sm italic text-gray-500 mt-2 mb-6">
            {children}
          </div>
        );
      }
      return (
        <p className="mb-4 text-lg leading-relaxed font-serif">{children}</p>
      );
    },
    img({ src, alt }) {
      return (
        <div className="flex flex-col items-center my-6">
          <img
            src={src}
            alt={alt}
            className="w-full max-w-xl aspect-video object-cover rounded shadow-md grayscale"
            loading="lazy"
          />
        </div>
      );
    },
    h1({ children }) {
      return <h1 className="text-4xl font-serif mb-6 mt-8">{children}</h1>;
    },
    h2({ children }) {
      return <h2 className="text-2xl font-serif mb-4 mt-6">{children}</h2>;
    },
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <Link to="/" className="text-blue-600 underline mb-8 inline-block">
        ← Back to Home
      </Link>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/article/:slug" element={<Article />} />
    </Routes>
  );
}

export default App;
