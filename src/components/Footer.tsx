// src/components/Footer.tsx
export function Footer() {
  return (
    <footer className="bg-black text-white px-6 py-6 mt-10 text-sm">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <p>Centro Cultural Kalunguinha © {new Date().getFullYear()}</p>
          <p>Todos os direitos reservados.</p>
        </div>

        <div className="text-right">
          <p>
            Desenvolvido por{" "}
            <a
              href="https://www.linkedin.com/in/luvieira"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-300"
            >
              Lu Vieira
            </a>
          </p>
          <p>São Paulo - SP</p>
        </div>
      </div>
    </footer>
  );
}
