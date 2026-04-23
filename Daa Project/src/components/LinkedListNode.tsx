
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { ListNode } from '../types';

interface Props {
  node: ListNode;
  isLast: boolean;
  isHead: boolean;
  index: number;
}

export function LinkedListNode({ node, isLast, isHead, index }: Props) {
  return (
    <motion.div
      layout
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      className="flex items-center"
      data-id={`node-${index}`}
    >
      <div className="relative flex items-center">
        <motion.div
           animate={{
            backgroundColor: node.highlighted ? '#A34E36' : '#FFFFFF',
            color: node.highlighted ? '#FFFFFF' : '#1A1A1A',
            borderColor: node.highlighted ? '#A34E36' : '#1A1A1A',
            boxShadow: node.highlighted 
              ? '12px 12px 30px rgba(163,78,54,0.3)' 
              : '8px 8px 0px rgba(163,78,54,0.1)',
          }}
          className="w-32 h-44 border flex flex-col transition-all duration-300"
        >
          {isHead && (
            <div className="absolute -top-6 left-0 right-0 flex justify-center">
              <span className="text-[9px] uppercase tracking-[0.2em] font-bold opacity-60">Master Node</span>
            </div>
          )}

          <div className="flex-1 flex flex-col items-center justify-center border-b border-inherit p-4 text-center">
            <span className={`text-[9px] uppercase tracking-wider mb-2 ${node.highlighted ? 'opacity-70' : 'opacity-40'}`}>
              {node.highlighted ? 'Active Search' : 'Node Value'}
            </span>
            <span className="text-4xl font-serif italic leading-none">
              {node.value}
            </span>
            <span className={`text-[8px] font-mono mt-3 ${node.highlighted ? 'opacity-80' : 'opacity-30'}`}>
              PTR: 0x{node.id.slice(0, 4).toUpperCase()}
            </span>
          </div>

          <div className={`h-12 flex flex-col items-center justify-center font-mono text-[9px] uppercase tracking-tighter ${node.highlighted ? 'bg-white/10' : 'bg-[#1A1A1A] text-white'}`}>
            {isLast ? 'Next: NULL' : `Next: 0x${Math.floor(Math.random() * 0xFF).toString(16).toUpperCase()}`}
          </div>
        </motion.div>

        {!isLast && (
          <div className="w-12 flex items-center justify-center relative">
            <motion.div
              animate={{
                backgroundColor: node.pointerHighlighted ? '#A34E36' : '#1A1A1A',
                height: node.pointerHighlighted ? '3px' : '2px',
              }}
              className="w-full relative"
            >
              <div 
                className={`absolute -right-1 -top-1 border-t-4 border-b-4 border-l-8 border-t-transparent border-b-transparent transition-colors duration-300`}
                style={{ borderLeftColor: node.pointerHighlighted ? '#A34E36' : '#1A1A1A' }}
              ></div>
            </motion.div>
          </div>
        )}
      </div>

      {isLast && (
        <div className="w-12 flex items-center justify-center ml-2">
           <div className="w-8 h-8 rounded-full border border-editorial-ink flex items-center justify-center">
             <div className="w-1.5 h-1.5 bg-editorial-ink rounded-full"></div>
           </div>
        </div>
      )}
    </motion.div>
  );
}
