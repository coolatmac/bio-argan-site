import { useEffect, useState } from 'react';

interface JsonLdData {
  [key: string]: unknown;
}

let scriptCounter = 0;

export function useJsonLd(data: JsonLdData | JsonLdData[], deps: unknown[] = []) {
  const [id] = useState(() => `jsonld-${++scriptCounter}`);

  useEffect(() => {
    let script = document.getElementById(id) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);
    return () => {
      const el = document.getElementById(id);
      if (el) el.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
