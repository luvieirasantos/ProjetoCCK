import { CalendarioAtividades } from "@/components/CalendarioAtividades";
import { BookOpen, Paintbrush, HeartHandshake, GraduationCap } from "lucide-react";

export default function Home() {
  return (
    <section className="space-y-20">
      {/* Hero */}
      <div className="text-center mt-10 space-y-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-black tracking-tight leading-tight">
          Um espaço de cuidado, cultura e transformação
        </h1>
        <p className="text-gray-700 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
          O Centro Cultural Kalunguinha acolhe, forma e inspira. Aqui, crianças, educadores e
          famílias encontram cultura, arte e pertencimento.
        </p>
      </div>

      {/* Calendário de Atividades */}
      <div className="max-w-5xl mx-auto">
        <CalendarioAtividades />
      </div>

      {/* Destaques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center px-4">
        <Feature
          icon={<BookOpen className="w-6 h-6 mx-auto mb-2 text-black" />}
          title="Biblioteca"
          description="Mais de 1000 livros para todas as idades. Acesse, explore e leia com a comunidade."
          href="/biblioteca"
        />
        <Feature
          icon={<Paintbrush className="w-6 h-6 mx-auto mb-2 text-black" />}
          title="Oficinas"
          description="Grafite, percussão, autocuidado e muito mais. Para crianças e adultos."
          href="/oficinas"
        />
        <Feature
          icon={<HeartHandshake className="w-6 h-6 mx-auto mb-2 text-black" />}
          title="Juquinha"
          description="Grupo de apoio para responsáveis com rodas de conversa e oficinas especiais."
          href="/juquinha"
        />
        <Feature
          icon={<GraduationCap className="w-6 h-6 mx-auto mb-2 text-black" />}
          title="Formação"
          description="Cursos e encontros para educadores. Aprendizagem transformadora e coletiva."
          href="/formacao"
        />
      </div>

      {/* Apoio */}
      <div className="bg-black text-white rounded-xl px-8 py-12 text-center">
        <h2 className="text-2xl font-semibold">Apoie o Kalunguinha</h2>
        <p className="mt-2 text-gray-300 max-w-xl mx-auto">
          Sua contribuição ajuda a manter um espaço seguro, criativo e cheio de amor para nossa
          comunidade.
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
  icon,
}: {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="border border-gray-300 rounded-lg p-6 hover:shadow-lg hover:scale-[1.01] transition-all bg-white"
    >
      {icon}
      <h3 className="text-lg font-semibold text-black mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </a>
  );
}
