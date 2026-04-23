
import { useState } from 'react';
import { Plus, Trash2, Search, SortAsc, RotateCcw, XCircle } from 'lucide-react';

interface Props {
  onInsertHead: (val: number) => void;
  onInsertTail: (val: number) => void;
  onDelete: (val: number) => void;
  onSearch: (val: number) => void;
  onSort: () => void;
  onReverse: () => void;
  onClear: () => void;
  isProcessing: boolean;
}

export function Controls({
  onInsertHead,
  onInsertTail,
  onDelete,
  onSearch,
  onSort,
  onReverse,
  onClear,
  isProcessing
}: Props) {
  const [inputValue, setInputValue] = useState<string>('');

  const getValue = () => {
    const val = parseInt(inputValue);
    if (isNaN(val)) return null;
    return val;
  };

  const handleAction = (action: (v: number) => void) => {
    const v = getValue();
    if (v !== null) {
      action(v);
      setInputValue('');
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <section>
        <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-6 text-editorial-accent">Value Entry</h3>
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="ENTER_VAL"
          className="w-full h-12 px-4 bg-white border-b border-editorial-ink/30 font-serif italic text-xl focus:outline-none focus:border-editorial-accent transition-colors"
          disabled={isProcessing}
        />
      </section>

      <section>
        <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-6 text-editorial-accent">Core Operations</h3>
        <nav className="flex flex-col gap-4">
          <ActionButton 
            onClick={() => handleAction(onInsertHead)} 
            disabled={isProcessing}
            label="Insertion (Head)" 
            tag="ADD_H"
          />
          <ActionButton 
            onClick={() => handleAction(onInsertTail)} 
            disabled={isProcessing}
            label="Insertion (Tail)" 
            tag="ADD_T"
          />
          <ActionButton 
            onClick={() => handleAction(onDelete)} 
            disabled={isProcessing}
            label="Deletion" 
            tag="DEL"
            variant="danger"
          />
          <ActionButton 
            onClick={() => handleAction(onSearch)} 
            disabled={isProcessing}
            label="Search" 
            tag="FIND"
          />
        </nav>
      </section>

      <section>
        <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-6 text-editorial-accent">Algorithms</h3>
        <nav className="flex flex-col gap-4">
          <ActionButton 
            onClick={onSort} 
            disabled={isProcessing}
            label="Bubble Sort" 
            tag="ORD"
          />
          <ActionButton 
            onClick={onReverse} 
            disabled={isProcessing}
            label="Reverse Path" 
            tag="REV"
          />
          <ActionButton 
            onClick={onClear} 
            disabled={isProcessing}
            label="Clear Memory" 
            tag="CLR"
            variant="danger"
          />
        </nav>
      </section>
    </div>
  );
}

function ActionButton({ 
  onClick, 
  label, 
  tag,
  disabled,
  variant = 'default' 
}: { 
  onClick: () => void; 
  label: string; 
  tag: string;
  disabled?: boolean;
  variant?: 'default' | 'danger'
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        flex justify-between items-center group w-full text-left transition-all duration-200
        ${disabled ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}
        ${variant === 'danger' ? 'text-editorial-accent' : 'text-editorial-ink'}
      `}
    >
      <span className={`text-lg font-serif italic ${!disabled && 'group-hover:underline decoration-1 underline-offset-4'}`}>
        {label}
      </span>
      <span className={`
        text-[9px] py-1 px-2 border rounded-full font-bold tracking-widest leading-none
        ${variant === 'danger' ? 'border-editorial-accent/30' : 'border-editorial-ink/20'}
      `}>
        {tag}
      </span>
    </button>
  );
}

