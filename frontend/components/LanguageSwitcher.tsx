"use client";
import { useRouter } from "next/navigation";
import { JSX, useCallback } from "react";

export default function LanguageSwitcher(): JSX.Element {
  const router = useRouter();

  const changeLanguage = useCallback((lang: string) => {
    router.replace(`/${lang}`); // Uses replace to avoid unnecessary history entries
  }, [router]);

  return (
    <div className="p-2 bg-gray-800 text-white flex gap-4">
      <button onClick={() => changeLanguage("en")} aria-label="Switch to English">
        🇬🇧 English
      </button>
      <button onClick={() => changeLanguage("hi")} aria-label="Switch to Hindi">
        🇮🇳 हिंदी
      </button>
      <button onClick={() => changeLanguage("kn")} aria-label="Switch to Kannada">
        🇮🇳 ಕನ್ನಡ
      </button>
    </div>
  );
}
