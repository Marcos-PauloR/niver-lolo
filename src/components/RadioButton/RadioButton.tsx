// import { useState } from "react";

// interface RadioButtonProps {
//     opcoes: string
// }

// export const RadioButton: React.FC<RadioButtonProps> = ({
//    opcoes
//   }) => {
//     const [valorSelecionado, setValorSelecionado] = useState('');
//     const opcoes = ['opcao1', 'opcao2', 'opcao3'];

//     const handleChange = (event:any) => {
//       setValorSelecionado(event.target.value);
//     };

//     return (
//       <form>
//         {opcoes.map(opcao => (
//           <label key={opcao}>
//             <input
//               type="radio"
//               value={opcao}
//               checked={valorSelecionado === opcao}
//               onChange={handleChange}
//             />
//             {opcao}
//           </label>
//         ))}
//       </form>
//     );
//   }
