export const ButtonGroup: React.FC<{
  labels: string[];
  selected: string;
  onChange: (selected: string) => void;
}> = ({ labels, onChange, selected }) => {
  // const responsiveStyle = labels.length > 2 ? "flex-wrap" : "";
  const renderItem = (label: string, index: number) => {
    const isFirst = index === 0;
    const isLast = index === labels.length - 1;
    const isSelected = selected === label;
    const stylingForSelected = 'outline-4 !bg-[#ffcb05] bg-slate-100 border-blue-400 ';

    return (
      <button
        onClick={() => onChange(label)}
        key={index}
        className={`text-[#3a4356] transition ease-out hover:!bg-[#ffcb05] rounded-none text-sm bg-white hover:bg-slate-100 border border-slate-200 ${
          isFirst ? 'sm:rounded-l-lg' : ''
        } ${
          isLast ? 'sm:rounded-r-lg' : 'rounded-r-none'
        } font-medium px-4 py-2 inline-flex space-x-1 items-center
        ${isSelected ? stylingForSelected : 'text-slate-800'}
    `}
      >
        {label}
      </button>
    );
  };
  return (
    <div className={'inline-flex items-center flex-wrap gap-1 sm:gap-0'}>
      {labels.map(renderItem)}
    </div>
  );
};
