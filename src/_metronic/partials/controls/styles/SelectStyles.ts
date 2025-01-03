export const SelectStyles = {
  container: (base: any) => ({
    ...base,
    flex: 1,
    height: '40px',
    '&is-invalid': {
      control: (base: any) => ({
        ...base,
        borderColor: '#f1416c',
        paddingLeft: 'calc(1.5em + 1.5rem)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left calc(0.375em + 0.375rem) center',
        backgroundSize: 'calc(0.75em + 0.75rem) calc(0.75em + 0.75rem)',
        background: "#023950",
      }),
    },
  }),
  control: (base: any,isFocused:any) => ({
    ...base,
    minHeight: '40px',
    height: '40px',
    borderColor: 'hsl(229deg 26% 92%)',
    borderRadius: '0.475rem',
  }),
  option: (styles:any, { data, isDisabled, isFocused, isSelected }:any) => {
    // const color = chroma(data.color);
   
    return {
      ...styles,
      backgroundColor: isFocused ? "#08e0de" : null,
      color: "#333333"
    };
  }
}
// export const SelectStyles = {
//   control: (base:any, state:any) => ({
//     ...base,
//     background: "#023950",
//     // match with the menu
//     borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
//     // Overwrittes the different states of border
//     borderColor: state.isFocused ? "yellow" : "green",
//     // Removes weird border around container
//     boxShadow: state.isFocused ? null : null,
//     "&:hover": {
//       // Overwrittes the different states of border
//       borderColor: state.isFocused ? "red" : "blue"
//     }
//   }),
//   menu: (base:any) => ({
//     ...base,
//     background: "#023950",
//     // override border radius to match the box
//     borderRadius: 0,
//     // kill the gap
//     marginTop: 0
//   }),
//   menuList: (base:any) => ({
//     ...base,
//     background: "#023950",
//     // kill the white space on first and last option
//     padding: 0
//   })
// };