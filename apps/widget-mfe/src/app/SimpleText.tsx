// apps/widget-mfe/src/app/SimpleText.tsx
import React from 'react';
import { Btn } from '@core/evokit';

export default function SimpleText() {
  return (
    <>
      <Btn variant="primary">teste</Btn>
      <Btn variant="secondary">teste</Btn>
      <Btn variant="outline">teste</Btn>
      <Btn variant="ghost">teste</Btn>
      <Btn variant="destructive">teste</Btn>
    </>
  );
}
