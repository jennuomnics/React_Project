;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';
import { AccountSettingsSidebar } from '@/pages/account/home/settings-sidebar';
import { AdvancedSettingsAddress, AdvancedSettingsAppearance, AdvancedSettingsNotifications, AdvancedSettingsPreferences, AuthEmail, AuthPassword, AuthSingleSingOn, AuthSocialSignIn, AuthTwoFactor, BasicSettings, DeleteAccount, ExternalServicesIntegrations, ExternalServicesManageApi } from '@/pages/account/home/settings-sidebar/components';
import { useIsMobile } from '@/hooks/use-mobile';
import { useViewport } from '@/hooks/use-viewport';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Scrollspy } from '@/components/ui/scrollspy';


;













;













;












interface IModalProfileProps {
  open: boolean;
  onOpenChange: () => void;
}

export function SignModal({
  open,
  onOpenChange,
}: IModalProfileProps) {
  const mobileMode = useIsMobile();
  const navBar = useRef<any | null>(null);
  const parentRef = useRef<any | null>(null);
  const [sidebarHeight, setSidebarHeight] = useState<number>(0);
  const [viewportHeight] = useViewport();
  const offset = 260;

  useEffect(() => {
    setSidebarHeight(viewportHeight - offset);
  }, [viewportHeight]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="mx-auto my-auto grow w-140   flex flex-col px-10 gap-0 overflow-hidden [&>button]:hidden"
       
      >
        <DialogHeader className="p-0 border-0">
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
          <div className="flex items-center justify-between flex-wrap grow gap-5">
            <div className="flex flex-col justify-center gap-2">
              <h1 className="text-xl font-semibold leading-none text-mono">
                Choose An Authentication Method
              </h1>
            </div>
            <Button onClick={onOpenChange} variant="outline">
              Close
            </Button>
          </div>
        </DialogHeader>
     
         
          
              <div className="grid grid-cols-1 gap-6">
              
                <div
                  className="p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-300 cursor-pointer hover:border-blue-500"
                  onClick={() => alert('Authenticator Code selected')}
                >
                  <h2 className="text-xl font-semibold text-gray-700 mb-2">
                    Use Authenticator Code
                  </h2>
                  <p className="text-gray-600">
                    Enter a code from your authentication app to continue.
                  </p>
                </div>

              
                <div
                  className="p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-300 cursor-pointer hover:border-blue-500"
                  onClick={() => alert('Recovery Code selected')}
                >
                  <h2 className="text-xl font-semibold text-gray-700 mb-2">
                    Use Recovery Code
                  </h2>
                  <p className="text-gray-600">
                    Use one of your saved recovery codes if you can’t access
                    your app.
                  </p>
                </div>
           </div>
         
        
        <DialogFooter className="border-t-2">
          <Button>Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}