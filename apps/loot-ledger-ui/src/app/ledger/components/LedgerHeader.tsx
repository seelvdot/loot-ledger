import { Heading, Text } from '@radix-ui/themes';
import { Button } from '@loot-ledger/ui';

interface LedgerHeaderProps {
  userName: string;
  onNewTransaction: () => void;
}

export function LedgerHeader({
  userName,
  onNewTransaction,
}: LedgerHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col gap-1">
        <Text
          size="1"
          className="text-lime-300 font-space-grotesk uppercase tracking-widest"
        >
          OPERATIONAL_SYSTEM // LOOT_LEDGER
        </Text>
        <Heading
          size="8"
          className="font-space-grotesk! uppercase text-neutral-100"
        >
          BEM-VINDO, <span className="text-lime-300">{userName}</span>
        </Heading>
      </div>
      <Button
        size="3"
        className="uppercase! font-space-grotesk! cursor-pointer!"
        onClick={onNewTransaction}
      >
        Nova_Transação
      </Button>
    </div>
  );
}
