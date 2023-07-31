export const ButtonGroup: React.FC<{
  labels: string[];
  selected: string;
  onChange: (selected: string) => void;
}> = ({ labels, onChange, selected }) => (
  <div className="inline-flex items-center ">
    {labels.map((label, index) => (
      <button
        onClick={() => onChange(label)}
        key={index}
        className={`rounded-none hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 ${
          index === 0 ? "rounded-l-lg" : ""
        } ${
          index === labels.length - 1 ? "rounded-r-lg" : "rounded-r-none"
        } font-medium px-4 py-2 inline-flex space-x-1 items-center
            ${selected === label ? "outline-4 text-blue-600 bg-slate-100 border-blue-400" : "text-slate-800"}
        `
        
        }
      >
        {label}
      </button>
    ))}
  </div>
);
