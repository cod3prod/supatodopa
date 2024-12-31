export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">&copy; 2024 ToDoList. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="hover:underline">
            개인정보처리방침
          </a>
          <a href="#" className="hover:underline">
            이용약관
          </a>
        </div>
      </div>
    </footer>
  );
}
