interface AuthFormProps {
  children: React.ReactNode;
}

export function AuthForm({ children }: AuthFormProps) {
  return (
    <div className="flex flex-row w-[90%] h-[80%] m-auto rounded-xl shadow-3xl items-center overflow-hidden bg-primary-content">
      <div className="flex flex-col w-[50%] gap-8">
        {children}
      </div>
      <aside className="w-[50%] bg-[#0B1215] h-full flex items-center justify-center">
        <img className="object-cover w-full h-full " src="/example.png" alt="login" />
      </aside>
    </div>
  );
}
