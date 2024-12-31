export default function TodoApp() {
  return (
    <section className="flex-1 flex flex-col items-center w-full max-w-lg mx-auto py-10 space-y-6">
      <h2 className="text-2xl font-bold text-primary">오늘 할 일</h2>
      <div className="w-full flex">
        <input
          type="text"
          placeholder="할 일을 입력하세요"
          className="flex-grow p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button className="bg-primary text-white px-4 py-3 rounded-r-md hover:bg-primary/90">
          추가
        </button>
      </div>

      <ul className="w-full bg-white shadow-md rounded-md divide-y divide-gray-200">
        <li className="flex items-center justify-between px-4 py-3">
          <span className="text-gray-700">Sample To-Do Item</span>
          <button className="text-red-500 hover:text-red-700">삭제</button>
        </li>
        <li className="flex items-center justify-between px-4 py-3">
          <span className="text-gray-700">다른 할 일 추가</span>
          <button className="text-red-500 hover:text-red-700">삭제</button>
        </li>
      </ul>
    </section>
  );
}
