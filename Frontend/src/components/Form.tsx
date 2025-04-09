type FormProps = {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    children: React.ReactNode;
    className?:string;
  };
  
  export default function Form({ onSubmit, children,className }: FormProps) {
    return (
      <form onSubmit={onSubmit} className={`${className}`}>
        {children}
      </form>
    );
  }