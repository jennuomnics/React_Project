import { ShareProfileSettings, ShareProfileUsers, ShareProfileViaEmail, ShareProfileViaLink } from '@/partials/dialogs/share-profile';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';


export function TwoFactorModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: () => void;
}) {
  const scrollableHeight = 300;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 space-y-0 max-w-[500px]">
        <DialogHeader className="p-5 m-0">
          <DialogTitle>Secure Your Account</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-5 px-0 pt-1 pb-5">
          <div className="border-b border-b-border"></div>

          <div className="flex flex-col items-center text-center space-y-4">
            <h2 className="font-semibold text-lg">Set Up Authentication App</h2>
            <p className="max-w-md">
              Scan the QR code below with an authenticator app such as{' '}
              <span className="text-blue-600 font-medium">
                Authy, Google Authenticator (Android), Google Authenticator
                (iOS)
              </span>
              .
            </p>
            <div>
              <img
                src="https://media.istockphoto.com/id/1347277582/vector/qr-code-sample-for-smartphone-scanning-on-white-background.jpg?s=612x612&w=0&k=20&c=6e6Xqb1Wne79bJsWpyyNuWfkrUgNhXR4_UYj3i_poc0="
                alt="QR code for authentication app"
                className="h-48"
              />
            </div>
          </div>
        </div>
        <div className="grid gap-5 px-0 pt-1 pb-5">
          <h2>Recovery Codes</h2>
          <p>Store this Codes in the Safest</p>
        </div>

        <div className="border-b border-b-border"></div>
        <DialogFooter className="p-5 pt-2 m-0">
          <Button onClick={onOpenChange} variant="outline">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}