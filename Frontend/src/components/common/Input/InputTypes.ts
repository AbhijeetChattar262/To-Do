export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    type?: string;
    width?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
  }
  