import RoastGithubForm from '../../components/RoastGithubForm';
export default function Home() {
  return (
    <div className="bg-white text-gray-900 min-h-screen flex flex-col items-center justify-center">
      <main className="w-full max-w-2xl p-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Tukang Roasting Github Orang</h1>
        <RoastGithubForm />
      </main>
    </div>
  );
}
