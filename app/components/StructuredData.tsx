import { useLocale } from 'next-intl';

export default function StructuredData() {
  const locale = useLocale();
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Sébastien Legros",
    "jobTitle": locale === 'en' 
      ? "Full-Stack Developer & Software Engineer"
      : "Développeur Full-Stack & Software Engineer",
    "description": locale === 'en'
      ? "Passionate full-stack developer specialized in React, TypeScript, Go and Node.js with 5+ years of experience"
      : "Développeur full-stack passionné spécialisé en React, TypeScript, Go et Node.js avec 5+ ans d'expérience",
    "url": "https://sebastienlegros.me",
    "image": "https://sebastienlegros.me/sebastien-chatgpt.png",
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
      locale === 'en' ? "Web Development" : "Développement Web",
      locale === 'en' ? "Full-Stack Development" : "Développement Full-Stack"
    ],
    "hasOccupation": {
      "@type": "Occupation",
      "name": locale === 'en' ? "Full-Stack Developer" : "Développeur Full-Stack",
      "description": locale === 'en'
        ? "Development of modern web applications and robust APIs"
        : "Développement d'applications web modernes et d'APIs robustes",
      "skills": ["React", "TypeScript", "Go", "Node.js", "PostgreSQL", "GraphQL", "API REST"]
    },
    "alumniOf": {
      "@type": "Organization",
      "name": locale === 'en' ? "Web Development Training" : "Formation en développement web"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
