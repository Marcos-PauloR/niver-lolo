import styles from './Button.module.css'

interface ButtonProps{
    onClick:React.MouseEventHandler<HTMLButtonElement> | undefined
    label:string
    style: React.CSSProperties | undefined
}

const Button: React.FC<ButtonProps> = ({ onClick, label, style }) =>{
    return ( <button  type='button' onClick={onClick} style={style}  className={styles['ghost-button']}>{label}</button> );
};

export default Button;