import { useState } from 'react';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { TwoFactorModal } from './TwoFactorModal';


const TwoFactorCard = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isTwoFactorDialogOpen, setIsTwoFactorDialogOpen] = useState(false);

  const handleTwoFactorDialogClose = () => {
    setIsTwoFactorDialogOpen(false)
  }

  const handleToggle = () => {
    setIsEnabled((prev) => !prev);
  };

  return (
    <>
    {isTwoFactorDialogOpen &&  <TwoFactorModal
        open={isTwoFactorDialogOpen}
        onOpenChange={handleTwoFactorDialogClose}
      />}
      <Card className="min-w-full">
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
        </CardHeader>

        <CardContent className="pb-3 p-0">
          <Table className="align-middle text-sm text-muted-foreground">
            <TableBody>
              <TableRow>
                <TableCell className="py-3 w-1/6 text-center align-middle">
                  <img
                    src="https://its.unc.edu/wp-content/uploads/sites/337/2024/05/microsoft-authenticator-logo-e1715001276640.png"
                    //   src={toAbsoluteUrl('/media/illustrations/34.svg')}
                    alt="Two Factor Auth"
                    className="h-20 mx-auto"
                  />
                </TableCell>

                <TableCell className="py-3 align-middle w-2/3">
                  {!isEnabled ? (
                    <div className="flex flex-col gap-4">
                      <div>
                        <p className="text-base text-foreground font-medium mb-1">
                          Protect your account with Two-Factor Authentication
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Add an extra layer of security to your account. You’ll
                          be asked to enter a code from your authenticator app
                          whenever you log in.
                        </p>
                      </div>
                      <Button
                        type="button"
                        onClick={() => {
                            handleToggle()
                            setIsTwoFactorDialogOpen(true)
                        }}
                        className="w-fit bg-blue-600 hover:bg-blue-700 self-end"
                      >
                        Enable
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      <div>
                        <p className="text-base font-medium text-green-600">
                          Your authentication is enabled and active.
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Two-Factor Authentication adds an additional layer of
                          protection to your account.
                        </p>
                      </div>
                      <Button
                        type="button"
                        onClick={handleToggle}
                        variant="outline"
                        className="w-fit border-red-500 text-red-500 hover:bg-red-50 self-end"
                      >
                        Disable
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
              <TableRow></TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

export { TwoFactorCard };