export default function OficinasPage() {
  const oficinasCriancas = [
    { titulo: "Grafite", descricao: "Oficina de arte urbana para expressão criativa." },
    { titulo: "Percussão", descricao: "Exploração musical e ritmo com instrumentos." },
    { titulo: "Contação de Histórias", descricao: "Imersão lúdica em narrativas e fantasia." },
    { titulo: "Histórias Externas", descricao: "Ações itinerantes com contação em espaços diversos." },
  ];

  const oficinasAdultos = [
    { titulo: "Autocuidado", descricao: "Práticas de bem-estar, autoestima e cuidado com o corpo." },
    { titulo: "Estética", descricao: "Oficinas de beleza, cuidado e empoderamento." },
    { titulo: "Palestras Sociais", descricao: "Reflexões sobre cultura, política e sociedade." },
  ];

  return (
    <section className="max-w-5xl mx-auto px-4 space-y-10">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">🎭 Oficinas do CCK</h1>
        <p className="text-gray-600 mt-2">
          Espaços de criação, aprendizado e transformação para todas as idades.
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800 border-b pb-1">Para crianças</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {oficinasCriancas.map((oficina) => (
            <div key={oficina.titulo} className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition">
              <h3 className="text-lg font-bold text-gray-900">{oficina.titulo}</h3>
              <p className="text-gray-600 text-sm mt-1">{oficina.descricao}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800 border-b pb-1">Para adultos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {oficinasAdultos.map((oficina) => (
            <div key={oficina.titulo} className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition">
              <h3 className="text-lg font-bold text-gray-900">{oficina.titulo}</h3>
              <p className="text-gray-600 text-sm mt-1">{oficina.descricao}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
