/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useLinkedList } from './hooks/useLinkedList';
import { LinkedListNode } from './components/LinkedListNode';
import { Controls } from './components/Controls';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function App() {
  const {
    nodes,
    steps,
    currentStepIndex,
    isProcessing,
    insertAtHead,
    insertAtTail,
    deleteValue,
    search,
    bubbleSort,
    reverse,
    clear,
  } = useLinkedList();

  const currentStep = steps[currentStepIndex];

  return (
    <div className="flex h-screen bg-editorial-bg text-editorial-ink font-sans overflow-hidden">
      {/* Dynamic Sidebar (Desktop-focused Side Navigation) */}
      <aside className="w-80 border-r border-editorial-ink/10 flex flex-col bg-white shrink-0 shadow-xl z-20">
        <header className="p-8 border-b border-editorial-ink/5 pt-10">
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40 mb-1">Linkly_Visualizer</p>
          <h1 className="text-4xl font-serif italic tracking-tighter leading-none">Linked List</h1>
        </header>
        
        <div className="flex-1 overflow-y-auto p-8 scrollbar-hide space-y-12">
          <Controls 
            onInsertHead={insertAtHead}
            onInsertTail={insertAtTail}
            onDelete={deleteValue}
            onSearch={search}
            onSort={bubbleSort}
            onReverse={reverse}
            onClear={clear}
            isProcessing={isProcessing}
          />

          <section className="pt-8 border-t border-editorial-ink/5">
            <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-4 opacity-50">Memory Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-editorial-bg/50 border border-editorial-ink/5 text-center">
                <span className="block text-[9px] uppercase opacity-40 mb-1">Nodes</span>
                <span className="text-xl font-serif italic">{nodes.length.toString().padStart(2, '0')}</span>
              </div>
              <div className="p-3 bg-editorial-bg/50 border border-editorial-ink/5 text-center">
                <span className="block text-[9px] uppercase opacity-40 mb-1">Address</span>
                <span className="text-sm font-mono opacity-60 font-bold">{nodes.length > 0 ? '0x' + nodes[0].id.slice(0, 2).toUpperCase() : 'N/A'}</span>
              </div>
            </div>
          </section>
        </div>

        <footer className="p-8 border-t border-editorial-ink/5 bg-editorial-bg/20">
          <div className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full ${isProcessing ? 'bg-editorial-accent animate-pulse' : 'bg-green-500'}`}></div>
            <span className="text-[10px] font-mono uppercase tracking-widest font-bold opacity-60">
              {isProcessing ? 'System_Working' : 'Ready_State'}
            </span>
          </div>
        </footer>
      </aside>

      {/* Main Workspace */}
      <main className="flex-1 flex flex-col bg-white/40 overflow-hidden relative">
        {/* Top Floating Context */}
        <div className="absolute top-8 left-8 right-8 flex justify-between items-start pointer-events-none z-10">
          <div className="bg-editorial-ink text-white/90 px-4 py-2 text-[10px] uppercase tracking-[0.2em] font-bold">
            Live Execution Workspace
          </div>
          <div className="bg-white/80 backdrop-blur-sm border border-editorial-ink/10 px-4 py-2 text-[10px] uppercase tracking-[0.2em] font-bold">
            V 1.25 // Stable
          </div>
        </div>

        {/* The Visualization Stage */}
        <div className="flex-1 relative overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing p-24">
          <div className="min-h-full flex items-center justify-center min-w-max px-20">
            <AnimatePresence mode="popLayout">
              {nodes.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center p-20 border-2 border-dashed border-editorial-ink/10 rounded-[3rem]"
                >
                  <span className="text-8xl font-serif italic text-editorial-ink opacity-[0.03] absolute pointer-events-none">EMPTY_SPACE</span>
                  <div className="w-20 h-32 border-2 border-editorial-ink/20 rounded-xl mb-8 flex items-center justify-center">
                    <div className="w-2 h-2 bg-editorial-accent rounded-full animate-ping"></div>
                  </div>
                  <h2 className="text-3xl font-serif italic mb-2">No nodes allocated in memory.</h2>
                  <p className="text-[11px] uppercase tracking-[0.3em] opacity-40 font-bold">Awaiting initial instruction via portal</p>
                </motion.div>
              ) : (
                <div className="flex items-center">
                  {nodes.map((node, index) => (
                    <LinkedListNode
                      key={node.id}
                      node={node}
                      index={index}
                      isHead={index === 0}
                      isLast={index === nodes.length - 1}
                    />
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Narrative Console (Fixed Bottom) */}
        <footer className="h-32 bg-editorial-ink text-white px-10 flex items-center shadow-[0_-20px_50px_rgba(0,0,0,0.1)] relative z-20 overflow-hidden shrink-0">
          {/* Accent decoration */}
          <div className="absolute top-0 right-0 w-48 h-full bg-editorial-accent/5 -skew-x-[20deg] translate-x-24 origin-top"></div>
          
          <div className="max-w-6xl w-full flex gap-10 items-center">
            <div className="shrink-0 flex flex-col items-center">
                <span className="text-[8px] uppercase tracking-[0.4em] mb-1 opacity-40 font-bold">Step</span>
                <div className="text-3xl font-serif italic border-t border-white/20 pt-1 px-1">
                  { (currentStepIndex + 1).toString().padStart(2, '0') }
                </div>
            </div>

            <div className="flex-1">
              <p className="text-[8px] uppercase tracking-[0.4em] font-bold mb-1 text-editorial-accent">Narrative Console</p>
              <div className="h-14 flex items-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentStep?.description || 'idle'}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="text-xl lg:text-2xl font-serif italic leading-tight text-white/90 max-w-3xl truncate"
                    title={currentStep?.description}
                  >
                    "{currentStep?.description || 'System standby...'}"
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            <div className="shrink-0 flex flex-col items-end gap-3">
              <div className="flex gap-0.5 justify-end h-4 items-end">
                {steps.slice(-15).map((_, idx) => (
                  <motion.div 
                    key={idx}
                    animate={{ 
                      height: idx === currentStepIndex ? 16 : 4,
                      opacity: idx === currentStepIndex ? 1 : 0.2
                    }}
                    className={`w-0.5 bg-white rounded-full`}
                  />
                ))}
              </div>
              
              <div className="flex gap-2">
                <button className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-white hover:text-editorial-ink transition-all duration-300 disabled:opacity-10" disabled={currentStepIndex <= 0}>
                  <ChevronLeft size={16} />
                </button>
                <button className={`w-10 h-10 border border-white/20 flex items-center justify-center transition-all duration-300 ${isProcessing ? 'bg-editorial-accent border-editorial-accent text-white' : 'hover:bg-white hover:text-editorial-ink'}`}>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}


