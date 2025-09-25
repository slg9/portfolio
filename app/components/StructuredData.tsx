export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Sébastien Legros",
    "jobTitle": "Développeur Full-Stack & Software Engineer",
    "description": "Développeur full-stack passionné spécialisé en React, TypeScript, Go et Node.js avec 5+ ans d'expérience",
    "url": "https://sebastienlegros.me",
    "image": "https://sebastienlegros.me/sebastien.png",
    "sameAs": [
      "https://www.linkedin.com/in/sébastien-legros-23a85085",
      "https://github.com/slg9"
    ],
    "email": "slegros9@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "FR"
    },
    "knowsAbout": [
      "React",
      "TypeScript", 
      "JavaScript",
      "Go",
      "Node.js",
      "PostgreSQL",
      "MongoDB",
      "GraphQL",
      "API REST",
      "Docker",
      "AWS",
      "Développement Web",
      "Développement Full-Stack"
    ],
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Développeur Full-Stack",
      "description": "Développement d'applications web modernes et d'APIs robustes",
      "skills": ["React", "TypeScript", "Go", "Node.js", "PostgreSQL", "GraphQL", "API REST"]
    },
    "alumniOf": {
      "@type": "Organization",
      "name": "Formation en développement web"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
