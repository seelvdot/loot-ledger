import { Text } from '@radix-ui/themes';

export default function Loading() {
  const codeSnippet =
    '01010110_SYSTEM_LOAD_BOOT_SEQUENCE_INITIALIZING_CRYPTO_LEDGER_AUTH_CHECK_SYNC_DATA_';

  return (
    <div className="fixed inset-0 z-9999 bg-neutral-950 flex flex-col items-center justify-center gap-6 overflow-hidden">
      <div className="relative">
        <div className="w-20 h-20 border-2 border-lime-300/20 rounded-full animate-ping absolute inset-0" />
        <div className="w-20 h-20 border-2 border-lime-300 rounded-full animate-pulse flex items-center justify-center shadow-[0_0_20px_rgba(163,230,53,0.4)]">
          <div className="w-2 h-2 bg-lime-300 rounded-full" />
        </div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <Text className="text-lime-300 font-space-grotesk uppercase tracking-[0.3em] text-xs animate-pulse">
          Sincronizando_Ledger
        </Text>
        <div className="flex gap-1">
          <div className="w-12 h-0.5 bg-lime-300/20 overflow-hidden relative">
            <div className="absolute inset-0 bg-lime-300 animate-[loading-bar_1.5s_infinite]" />
          </div>
        </div>
      </div>

      <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none overflow-hidden">
        <div className="text-[8px] font-mono text-lime-300 whitespace-pre leading-none animate-[scrolling-text_30s_linear_infinite]">
          {Array(100).fill(codeSnippet).join('\n')}
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes scrolling-text {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
      `,
        }}
      />
    </div>
  );
}
