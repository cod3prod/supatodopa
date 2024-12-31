export default function DisplayNameForm({
  tempDisplayName,
  handleNameChange,
  handleSaveName,
}: {
  tempDisplayName: string;
  handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSaveName: () => void;
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h3 className="text-xl font-semibold mb-4">이름을 입력하세요</h3>
        <input
          type="text"
          value={tempDisplayName}
          onChange={handleNameChange}
          placeholder="display name"
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
        />
        <div className="flex justify-end">
          <button
            onClick={handleSaveName}
            className="bg-primary text-white px-6 py-2 rounded-md"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
