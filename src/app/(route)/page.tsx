export default function Home() {
  return (
    <section className="flex-1 flex flex-col items-center justify-center container mx-auto px-4 py-16">
      <h2 className="text-3xl font-semibold mb-6 text-center">
        당신의 할 일을 관리하세요
      </h2>
      <p className="text-lg text-center max-w-2xl mb-10">
        ToDoList 앱을 사용해 생산성을 높이고, 목표를 더 효과적으로 달성하세요.
      </p>
      <button className="bg-primary text-white px-6 py-3 rounded-md shadow-md hover:bg-primary/90">
        지금 시작하기
      </button>
    </section>
  );
}
