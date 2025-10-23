import { useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Eye, EyeOff, SquarePen } from 'lucide-react';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

const ChangePassword = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const [passwordInfo, setPasswordInfo] = useState({
    lastChanged: 'Password last changed 2 months ago',
  });

  const handleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const passwordValidationSchema = Yup.object().shape({
    currentPassword: Yup.string()
      .required('Current password is required')
      .min(6, 'Password must be at least 6 characters'),
    newPassword: Yup.string()
      .required('New password is required')
      .min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), ''], 'Passwords must match')
      .required('Confirm password is required'),
  });

  const handlePasswordSubmit = (values: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    console.log('Password updated successfully', values);
    setPasswordInfo({
      lastChanged: 'Password just changed successfully!',
    });
    setIsEditing(false);
  };

  return (
    <Card className="min-w-full">
      <CardHeader className="flex justify-between items-center">
        <CardTitle>Change Password</CardTitle>
        <Button variant="ghost" mode="icon" onClick={handleEdit}>
          <SquarePen size={16} className="text-blue-500" />
        </Button>
      </CardHeader>

      <CardContent className="kt-scrollable-x-auto pb-3 p-0">
        <Table className="align-middle text-sm text-muted-foreground">
          <TableBody>
            <TableRow>
              <TableCell className="py-3 text-secondary-foreground font-normal">
                Current Password
              </TableCell>
              <TableCell className="py-3 text-secondary-foreground text-sm font-normal">
                ********
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="py-3 text-secondary-foreground font-normal">
                Status
              </TableCell>
              <TableCell className="py-3 text-secondary-foreground text-sm font-normal">
                {passwordInfo.lastChanged}
              </TableCell>
            </TableRow>

            {isEditing && (
              <TableRow>
                <TableCell className="py-3 text-secondary-foreground font-normal">
                  Update Password
                </TableCell>
                <TableCell className="py-3 text-secondary-foreground text-sm font-normal">
                  <Formik
                    initialValues={{
                      currentPassword: '',
                      newPassword: '',
                      confirmPassword: '',
                    }}
                    validationSchema={passwordValidationSchema}
                    onSubmit={handlePasswordSubmit}
                    validateOnChange={false}
                    validateOnBlur={true}
                  >
                    {({ isSubmitting }) => (
                      <Form className="flex flex-col gap-4">
                        {/* Current Password */}
                        <div className="flex flex-col">
                          <div className="relative">
                            <Field name="currentPassword">
                              {({ field }: any) => (
                                <Input
                                  {...field}
                                  type={
                                    currentPasswordVisible ? 'text' : 'password'
                                  }
                                  placeholder="Enter current password"
                                  className="w-full pr-10"
                                  onBlur={field.onBlur}
                                />
                              )}
                            </Field>
                            <button
                              type="button"
                              onClick={() =>
                                setCurrentPasswordVisible((v) => !v)
                              }
                              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
                              tabIndex={-1}
                              aria-label={
                                currentPasswordVisible
                                  ? 'Hide password'
                                  : 'Show password'
                              }
                            >
                              {currentPasswordVisible ? (
                                <EyeOff size={16} />
                              ) : (
                                <Eye size={16} />
                              )}
                            </button>
                          </div>
                          <ErrorMessage
                            name="currentPassword"
                            component="div"
                            className="text-sm text-red-500 mt-1 text-left"
                          />
                        </div>

                        {/* New Password */}
                        <div className="flex flex-col">
                          <div className="relative">
                            <Field name="newPassword">
                              {({ field }: any) => (
                                <Input
                                  {...field}
                                  type={
                                    newPasswordVisible ? 'text' : 'password'
                                  }
                                  placeholder="Enter new password"
                                  className="w-full pr-10"
                                  onBlur={field.onBlur}
                                />
                              )}
                            </Field>
                            <button
                              type="button"
                              onClick={() => setNewPasswordVisible((v) => !v)}
                              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
                              tabIndex={-1}
                              aria-label={
                                newPasswordVisible
                                  ? 'Hide password'
                                  : 'Show password'
                              }
                            >
                              {newPasswordVisible ? (
                                <EyeOff size={16} />
                              ) : (
                                <Eye size={16} />
                              )}
                            </button>
                          </div>
                          <ErrorMessage
                            name="newPassword"
                            component="div"
                            className="text-sm text-red-500 mt-1 text-left"
                          />
                        </div>

                        {/* Confirm Password */}
                        <div className="flex flex-col">
                          <div className="relative">
                            <Field name="confirmPassword">
                              {({ field }: any) => (
                                <Input
                                  {...field}
                                  type={
                                    confirmPasswordVisible ? 'text' : 'password'
                                  }
                                  placeholder="Confirm new password"
                                  className="w-full pr-10"
                                  onBlur={field.onBlur}
                                />
                              )}
                            </Field>
                            <button
                              type="button"
                              onClick={() =>
                                setConfirmPasswordVisible((v) => !v)
                              }
                              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
                              tabIndex={-1}
                              aria-label={
                                confirmPasswordVisible
                                  ? 'Hide password'
                                  : 'Show password'
                              }
                            >
                              {confirmPasswordVisible ? (
                                <EyeOff size={16} />
                              ) : (
                                <Eye size={16} />
                              )}
                            </button>
                          </div>
                          <ErrorMessage
                            name="confirmPassword"
                            component="div"
                            className="text-sm text-red-500 mt-1 text-left"
                          />
                        </div>

                        <div className="flex gap-2 mt-2">
                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="grow"
                          >
                            Change Password
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            className="grow"
                            onClick={handleCancel}
                          >
                            Cancel
                          </Button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export { ChangePassword };
