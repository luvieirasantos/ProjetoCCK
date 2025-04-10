// src/app/page.tsx
export default function Home() {
  return (
    <section className="space-y-20">
      {/* Hero */}
      <div className="text-center mt-10">
        <h1 className="text-3xl sm:text-5xl font-bold text-gray-900">
          Um espaço de cuidado, cultura e transformação
        </h1>
        <p className="mt-4 text-gray-600 text-lg max-w-xl mx-auto">
          O Centro Cultural Kalunguinha acolhe, forma e inspira. Aqui, crianças, educadores e famílias encontram cultura, arte e pertencimento.
        </p>
      </div>

      {/* Destaques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        <Feature
          title="📚 Biblioteca"
          description="Mais de 1000 livros para todas as idades. Acesse, explore e leia com a comunidade."
          href="/biblioteca"
        />
        <Feature
          title="🎨 Oficinas"
          description="Grafite, percussão, autocuidado e muito mais. Para crianças e adultos."
          href="/oficinas"
        />
        <Feature
          title="🫶 Juquinha"
          description="Grupo de apoio para responsáveis com rodas de conversa e oficinas especiais."
          href="/juquinha"
        />
        <Feature
          title="🎓 Formação"
          description="Cursos e encontros para educadores. Aprendizagem transformadora e coletiva."
          href="/formacao"
        />
      </div>

      {/* Apoio */}
      <div className="bg-black text-white rounded-xl px-8 py-12 text-center">
        <h2 className="text-2xl font-semibold">Apoie o Kalunguinha</h2>
        <p className="mt-2 text-gray-300 max-w-xl mx-auto">
          Sua contribuição ajuda a manter um espaço seguro, criativo e cheio de amor para nossa comunidade.
        </p>
        <a
          href="/apoie"
          className="inline-block mt-6 bg-white text-black font-medium px-6 py-3 rounded-md hover:bg-gray-100 transition"
        >
          Saiba como apoiar
        </a>
      </div>
    </section>
  );
}

function Feature({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="border border-gray-200 rounded-lg p-6 hover:shadow-md hover:scale-[1.02] transition-all bg-white"
    >
      <h3 className="text-lg font-semibold text-black mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </a>
  );
}
