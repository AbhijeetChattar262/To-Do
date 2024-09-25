export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonStyle?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
  width?: string;
}
