import React, { useEffect, useState } from 'react';
import { ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';


export function TwoFactorModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: () => void;
}) {
  const [recoveryCodes, setRecoveryCodes] = useState<string[]>([]);

 
  const generateCodeSegment = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let segment = '';
    for (let i = 0; i < 10; i++) {
      segment += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return segment;
  };

 
  const generateRecoveryCodes = () => {
    const codes = Array.from(
      { length: 8 },
      () => `${generateCodeSegment()}-${generateCodeSegment()}`,
    );
    setRecoveryCodes(codes);
  };

  useEffect(() => {
    if (open) {
      generateRecoveryCodes();
    }
  }, [open]);

  
  const chunkArray = (arr: string[], size: number) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };

  const codePairs = chunkArray(recoveryCodes, 2);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 space-y-0 max-w-[500px]">
        <DialogHeader className="p-4 pb-1">
          <DialogTitle className="text-lg">Secure Your Account</DialogTitle>
          <DialogDescription className="text-sm"></DialogDescription>
        </DialogHeader>
        <div className="border-b border-b-border"></div>

        <div className="px-4 pb-4 space-y-4">
          <div className="flex flex-col items-center text-center space-y-2 p-2">
            <h2 className="font-semibold text-base">
              Set Up Authentication App
            </h2>
            <p className="text-xs text-gray-700 max-w-xs">
              Scan the QR code below with an authenticator app such as{' '}
              <span className="text-blue-600 font-medium">
                Authy, Google Authenticator (Android), Google Authenticator
                (iOS)
              </span>
              .
            </p>
            <div>
              <img
                src="https://play-lh.googleusercontent.com/7ZOGhiRcfGyNYkiqq3YBUeuqCnUkRDNucguJBrV-ri1o-8CJa3eNolAcKBTDotMnqBtM=s300"
                // src="https://media.istockphoto.com/id/1347277582/vector/qr-code-sample-for-smartphone-scanning-on-white-background.jpg?s=612x612&w=0&k=20&c=6e6Xqb1Wne79bJsWpyyNuWfkrUgNhXR4_UYj3i_poc0="
                alt="QR code"
                className="h-36 w-36 rounded-lg"
              />
            </div>
          </div>

          <div className="border-2 border-dashed border-orange-400 bg-orange-50 rounded-lg px-5 py-4 space-y-3">
            <div className="flex items-center gap-2">
              <ShieldAlert className="text-orange-500 w-5 h-5" />
              <h2 className="text-base font-semibold text-orange-700">
                Recovery Codes
              </h2>
            </div>

            <p className="text-center text-xs text-orange-700">
              Store these codes safely. Use them if you lose access to your
              authenticator app.
            </p>

            <div className="grid grid-cols-2 gap-2 justify-items-center text-sm font-mono text-orange-800">
              {codePairs.map((pair, pairIndex) =>
                pair.map((code, idx) => (
                  <div
                    key={pairIndex * 2 + idx}
                    className="break-words text-center"
                  >
                    <span className="font-semibold mr-1">
                      {pairIndex * 2 + idx + 1}.
                    </span>
                    {code}
                  </div>
                )),
              )}
            </div>
          </div>
        </div>

        <div className="border-b border-b-border"></div>

        <DialogFooter className="p-4">
          <Button onClick={onOpenChange} variant="outline">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}